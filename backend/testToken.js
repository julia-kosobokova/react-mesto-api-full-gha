const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkY2U0N2IzMDJhNTZlNmU0NjRkN2IiLCJpYXQiOjE2ODA5NTkyMTUsImV4cCI6MTY4MTU2NDAxNX0.P43sE23FPiHPW7MWlG7z6VYmSFS6FA8B5jFvWjH5Csc'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'super-strong-secret'; // вставьте сюда секретный ключ для разработки из кода
// const SECRET_KEY_DEV = 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b'; // вставьте сюда секретный ключ для разработки из кода
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
  Надо исправить. В продакшне используется тот же
  секретный ключ, что и в режиме разработки.
  `);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются'
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
