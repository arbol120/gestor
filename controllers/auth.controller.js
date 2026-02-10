const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: 'Datos incompletos' });

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ msg: 'Usuario ya existe' });

  const user = new User({ username, password });
  await user.save();

  res.status(201).json({ msg: 'Usuario registrado' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: 'Usuario no existe' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: 'Password incorrecto' });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
