const express = require('express');
const cors = require('cors');  // Импортируем cors
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const open = require('open');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID; 
const CLIENT_SECRET = process.env.CLIENT_SECRET; 
const REDIRECT_URI = 'http://localhost:5000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Создаем сервер
const app = express();

// Используем CORS для разрешения запросов с другого порта
app.use(cors());  // Разрешаем все домены (или можете настроить ограничения)

// Включаем парсинг JSON тела запросов
app.use(express.json());

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send']
});

// Роут для главной страницы
app.get('/', (req, res) => {
  res.send(`<h1>Авторизуйтесь через Google</h1><a href="${authUrl}">Перейти к авторизации</a>`);
});

// Роут для обработки редиректа Google с кодом авторизации
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Ошибка авторизации.');
  }

  try {
    // Получаем токен из кода авторизации
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Сохраняем токены в файл
    const TOKEN_PATH = path.join(__dirname, 'token.json');
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));

    res.send('Авторизация прошла успешно! Теперь вы можете использовать ваше приложение.');
    console.log('Токены сохранены в token.json');
  } catch (error) {
    res.status(500).send('Ошибка получения токенов.');
    console.error('Ошибка при получении токенов:', error);
  }
});

app.post('/send-email', async (req, res) => {
  const { name, address, recipientEmail, totalPrice, cart } = req.body;

  if (!name || !address || !recipientEmail || !totalPrice || !cart) {
    return res.status(400).send('Отсутствуют обязательные данные');
  }

  try {
    // Загружаем токены для аутентификации с Gmail API
    const tokens = JSON.parse(fs.readFileSync('token.json'));
    oauth2Client.setCredentials(tokens);

    // Создаем объект для работы с Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const cartItems = cart.map(item => `
      Товар: ${item.name}
      Количество: ${item.count}
      Цена за единицу: ${item.price} BYN
  `).join('');
  
    // Сформируем письмо
    const emailLines = [
      'Content-Type: text/plain; charset="UTF-8"',
      'MIME-Version: 1.0',
      `From: "vii.rnko@gmail.com"`,  // Указываете свой email
      `To: ${recipientEmail}`,         // Получатель из данных формы
      `Subject: =?UTF-8?B?${Buffer.from('Заказ оформлен').toString('base64')}?=`, // Тема письма с кодировкой
      '',
      `Имя: ${name}`,
      `Адрес: ${address}`,
      `Товары: ${cartItems}`,
      `Общая стоимость: ${totalPrice.toFixed(2)} BYN`,
    ];

    const email = emailLines.join('\n');
    const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

    // Отправляем письмо через Gmail API
    await gmail.users.messages.send({
      userId: 'me',  // 'me' отправляет письмо от имени авторизованного пользователя
      requestBody: {
        raw: encodedEmail,
      },
    });

    res.send('Письмо отправлено');
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    res.status(500).send('Ошибка при отправке письма');
  }
});

app.listen(5000, () => {
  console.log('Сервер работает на http://localhost:5000');
  open(authUrl); // Автоматически откроется браузер с URL авторизации
});