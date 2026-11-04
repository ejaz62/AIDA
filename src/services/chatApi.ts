/**
 * Chat API Client for AIDA AI Assistant
 * Provides resilient communication with /api/chat and Netlify Functions.
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
  isError?: boolean;
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const payload = {
    message,
    history: history.map((item) => ({
      role: item.role === 'assistant' ? ('model' as const) : ('user' as const),
      text: item.text,
    })),
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  let res: Response;
  let url = '/api/chat';

  try {
    res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
  } catch (err: any) {
    throw new Error(
      'Unable to connect to the server. Please check your internet connection and try again.'
    );
  }

  let contentType = res.headers.get('content-type') || '';

  // Netlify SPA fallback recovery: if returned HTML, retry directly via /.netlify/functions/api/chat
  if (contentType.includes('text/html') && url.startsWith('/api/')) {
    const netlifyUrl = '/.netlify/functions/api/chat';
    try {
      const netlifyRes = await fetch(netlifyUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      const netlifyContentType = netlifyRes.headers.get('content-type') || '';
      if (netlifyContentType.includes('application/json')) {
        res = netlifyRes;
        contentType = netlifyContentType;
      }
    } catch {
      // Fall through to parse original response
    }
  }

  const rawText = await res.text();
  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch {
    if (rawText.trim().startsWith('<!DOCTYPE') || contentType.includes('text/html')) {
      throw new Error(
        'The server returned an HTML page. Ensure Netlify Functions are active and GEMINI_API_KEY is configured in Netlify environment variables.'
      );
    }
    throw new Error('Failed to parse response from server as JSON.');
  }

  if (!res.ok) {
    throw new Error(
      data?.error ||
        `Chat request failed with status ${res.status}. Please contact us via WhatsApp +92 322 7204898.`
    );
  }

  return data.reply;
}
