import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { AIDA_SYSTEM_INSTRUCTION } from './knowledgeBase';

interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
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
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    return res.status(503).json({
      error:
        'The AIDA AI Assistant is currently offline because the server Gemini API key is not configured. Please contact the administrator or reach out via WhatsApp at +92 322 7204898 or email mentorsvalley@gmail.com.',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

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

    const primaryModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    let response;
    try {
      response = await ai.models.generateContent({
        model: primaryModel,
        contents,
        config: {
          systemInstruction: AIDA_SYSTEM_INSTRUCTION,
          temperature: 0.3,
          maxOutputTokens: 1000,
        },
      });
    } catch (modelErr: any) {
      // If primary model fails with 404 or unsupported model error, attempt fallback to gemini-2.0-flash
      const isModelNotFound =
        modelErr?.status === 404 ||
        (modelErr?.message && /not found|unsupported|does not exist/i.test(modelErr.message));

      if (isModelNotFound && primaryModel !== 'gemini-2.0-flash') {
        console.warn(`[AIDA Chat] Primary model ${primaryModel} failed; falling back to gemini-2.0-flash`);
        response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents,
          config: {
            systemInstruction: AIDA_SYSTEM_INSTRUCTION,
            temperature: 0.3,
            maxOutputTokens: 1000,
          },
        });
      } else {
        throw modelErr;
      }
    }

    const replyText = response.text || '';

    return res.json({
      reply: replyText.trim() || 'Welcome to AIDA! How can I assist you with our practical AI courses today?',
      role: 'model',
    });
  } catch (err: any) {
    // Log safely without exposing the API key
    console.error('[AIDA Chat] Error generating response:', err?.message || 'Unknown error');

    return res.status(500).json({
      error:
        'Failed to generate response from the AI assistant. Please try again or reach out directly to Muhammad Ejaz via WhatsApp (+92 322 7204898) or email (mentorsvalley@gmail.com).',
    });
  }
}
