import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { AIDA_SYSTEM_INSTRUCTION } from './knowledgeBase';

interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

/**
 * Extracts and sanitizes error details for serverless logs without exposing secrets.
 */
function extractErrorDiagnostics(err: any, modelAttempted: string) {
  const status =
    err?.status ??
    err?.statusCode ??
    err?.error?.code ??
    (err?.response && err.response.status) ??
    'N/A';

  const name = err?.name || (err?.constructor && err.constructor.name) || 'Error';

  let rawMessage = err?.message || (typeof err === 'string' ? err : '');
  let cleanMessage = '';

  // If error message is a serialized JSON object from Google API, parse and extract the core message
  if (typeof rawMessage === 'string' && rawMessage.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(rawMessage);
      if (parsed?.error?.message) {
        cleanMessage = parsed.error.message;
      } else if (parsed?.message) {
        cleanMessage = parsed.message;
      }
    } catch {
      // Use raw message if parsing fails
    }
  }

  const finalMessage = cleanMessage || rawMessage || (err ? String(err) : 'Unknown error');

  // Redact any Google API key patterns (e.g. AIzaSy...) to guarantee secret safety in logs
  const sanitizedMessage = finalMessage.replace(/AIza[0-9A-Za-z_-]{35}/g, '[REDACTED_API_KEY]');

  return {
    status,
    name,
    model: modelAttempted,
    message: sanitizedMessage,
  };
}

export async function chatHandler(req: Request, res: Response) {
  // Input validation
  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      error: 'A valid message string is required.',
    });
  }

  if (message.length > 2000) {
    return res.status(400).json({
      error: 'Message is too long. Please keep questions under 2000 characters.',
    });
  }

  // Read API key exclusively from process.env.GEMINI_API_KEY
  const rawApiKey = process.env.GEMINI_API_KEY;
  if (!rawApiKey || rawApiKey.trim() === '' || rawApiKey.trim() === 'MY_GEMINI_API_KEY') {
    console.error('[AIDA Chat] GEMINI_API_KEY is not configured or is a placeholder in process.env');
    return res.status(503).json({
      error:
        'The AIDA AI Assistant is currently offline because the server Gemini API key is not configured. Please contact the administrator or reach out via WhatsApp at +92 322 7204898 or email mentorsvalley@gmail.com.',
    });
  }

  // Clean the API key: trim whitespace and remove accidental enclosing quotes from Netlify env input
  const apiKey = rawApiKey.trim().replace(/^["']+|["']+$/g, '').trim();

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Build contents array with sanitized conversation history (max 20 turns)
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-20)) {
        if (
          item &&
          (item.role === 'user' || item.role === 'model') &&
          typeof item.text === 'string' &&
          item.text.trim().length > 0
        ) {
          contents.push({
            role: item.role,
            parts: [{ text: item.text.trim() }],
          });
        }
      }
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    // Model candidates:
    // 1. Explicit environment variable override if specified (GEMINI_MODEL)
    // 2. gemini-3.8-flash (official supported Gemini 3 Flash model)
    // 3. gemini-flash-latest (dynamic alias)
    // 4. gemini-2.5-flash (legacy fallback)
    const candidateModels = Array.from(
      new Set(
        [
          process.env.GEMINI_MODEL?.trim(),
          'gemini-3.8-flash',
          'gemini-flash-latest',
          'gemini-2.5-flash',
        ].filter(Boolean) as string[]
      )
    );

    let response: any = null;
    let successfulModel = '';

    for (let i = 0; i < candidateModels.length; i++) {
      const model = candidateModels[i];
      try {
        response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: AIDA_SYSTEM_INSTRUCTION,
            temperature: 0.3,
            maxOutputTokens: 1000,
          },
        });
        successfulModel = model;
        break; // Successfully generated content
      } catch (err: any) {
        const diag = extractErrorDiagnostics(err, model);

        // Check if the error indicates model availability or retirement (404 or 400 unsupported model)
        const isModelUnsupported =
          diag.status === 404 ||
          (typeof diag.message === 'string' &&
            /not found|unsupported|does not exist|not supported|is shut down/i.test(diag.message));

        if (isModelUnsupported && i < candidateModels.length - 1) {
          console.warn(
            `[AIDA Chat] Model '${model}' unsupported (Status ${diag.status}: ${diag.message}). Trying fallback '${candidateModels[i + 1]}'...`
          );
          continue;
        }

        // Re-throw if non-model error (e.g. invalid key 400, quota 429, permission 403) or no more candidates
        throw err;
      }
    }

    const replyText = response?.text || '';

    return res.json({
      reply: replyText.trim() || 'Welcome to AIDA! How can I assist you with our practical AI courses today?',
      role: 'model',
      modelUsed: successfulModel,
    });
  } catch (err: any) {
    const diag = extractErrorDiagnostics(err, process.env.GEMINI_MODEL || 'gemini-3.8-flash');

    // Single-line and structured log to ensure Netlify Functions dashboard captures full diagnostic info
    console.error(
      `[AIDA Chat] Error generating response: Status ${diag.status} (${diag.name}) on model '${diag.model}' — ${diag.message}`
    );
    console.error('[AIDA Chat] Diagnostic payload:', JSON.stringify(diag));

    return res.status(500).json({
      error:
        'Failed to generate response from the AI assistant. Please try again or reach out directly to Muhammad Ejaz via WhatsApp (+92 322 7204898) or email (mentorsvalley@gmail.com).',
    });
  }
}
