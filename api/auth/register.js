export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Método no permitido' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Completa todos los campos' });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: 'Contraseña muy corta' });
  }

  // MOCK: siempre registra bien
  return res.status(201).json({
    msg: 'Usuario registrado (mock)'
  });
}
