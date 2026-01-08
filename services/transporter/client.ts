/**
 * Client-side transporter
 * Now proxies requests to a server-side endpoint at `/api/analyze`.
 */

export const transporter = {
  async post(model: string, input: any, opts?: any) {
    if (!model || typeof model !== 'string') {
      console.error('[transporter.post] invalid model:', model);
      throw new Error('model is required and must be a string');
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, input, opts }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('[transporter.post] server error:', res.status, text);
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error('[transporter.post] request error:', err);
      throw err;
    }
  },
};
