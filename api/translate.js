import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }

  try {
    // Parse JSON safely
    const body = req.body;
    const text = body.text;
    const target = body.target;

    if (!text || !target) {
      res.status(400).json({ error: 'Missing text or target' });
      return;
    }

    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: target,
        format: 'text'
      })
    });

    // Make sure we get valid JSON
    const data = await response.json();

    res.status(200).json({ translatedText: data.translatedText });
  } catch (err) {
    console.error('Translation error:', err);
    res.status(500).json({ error: 'Translation failed' });
  }
}
