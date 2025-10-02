import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }

  const { text, target } = req.body;

  if (!text || !target) {
    res.status(400).json({ error: 'Missing text or target' });
    return;
  }

  try {
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

    const data = await response.json();
    res.status(200).json({ translatedText: data.translatedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
}
