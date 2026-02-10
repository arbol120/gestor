export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Método no permitido' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Datos incompletos' });
  }

  // TOKEN MOCK
  const fakeToken = 'mock-token-123';

  return res.json({
    token: fakeToken
  });
}
