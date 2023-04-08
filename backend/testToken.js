const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkY2U0N2IzMDJhNTZlNmU0NjRkN2IiLCJpYXQiOjE2ODA5NTY2MjgsImV4cCI6MTY4MTU2MTQyOH0.Ocr63laaCMB_IHcxhRz8qzjBBR-GUhFxgev_wCtz7UU'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'super-strong-secret'; // вставьте сюда секретный ключ для разработки из кода
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
