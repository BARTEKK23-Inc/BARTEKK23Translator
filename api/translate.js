import translate from 'translate';

translate.engine = 'google'; // built-in free engine
translate.key = ''; // No key needed for free usage

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { text, target } = req.body;

  if (!text || !target) {
    return res.status(400).json({ error: 'Missing text or target' });
  }

  try {
    const translatedText = await translate(text, { to: target });
    res.status(200).json({ translatedText });
  } catch (err) {
    console.error('Translation error:', err);
    res.status(500).json({ error: 'Translation failed' });
  }
}
