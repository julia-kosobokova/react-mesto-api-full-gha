const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkY2U0N2IzMDJhNTZlNmU0NjRkN2IiLCJpYXQiOjE2ODA5Njg2MTgsImV4cCI6MTY4MTU3MzQxOH0.J3Mc-RvuNzJC8itFUzLlLmo4fRQzrkj-0o5zh4OUBBI'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'super-strong-secret'; // вставьте сюда секретный ключ для разработки из кода
try {
  jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
  Надо исправить. В продакшне используется тот же
  секретный ключ, что и в режиме разработки.
  `);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
