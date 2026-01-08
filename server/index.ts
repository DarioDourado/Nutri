import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const apiKey = process.env.GENAI_API_KEY || '';
if (!apiKey) {
  console.warn('[server] GENAI_API_KEY not set. Requests will fail until provided.');
}

const aiClient = new GoogleGenAI({ apiKey });

app.post('/api/analyze', async (req, res) => {
  const { model, input, opts } = req.body || {};
  if (!model || typeof model !== 'string') {
    return res.status(400).json({ error: 'model is required and must be a string' });
  }

  try {
    const response = await aiClient.models.generateContent({
      model,
      contents: input,
      config: opts,
    });
    return res.json(response);
  } catch (err: any) {
    console.error('[server] generateContent error:', err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`[server] running on http://localhost:${port}`));
