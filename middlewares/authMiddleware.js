const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó token" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = { generateToken, verifyToken };