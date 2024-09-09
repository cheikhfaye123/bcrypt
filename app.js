const express = require('express');
const session = require('express-session');
const { hashedSecret } = require('./crypto/config');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: hashedSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambiar a true si se usa HTTPS
}));

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});