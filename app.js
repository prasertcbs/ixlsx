const express = require('express');
const app = express();
require('dotenv').config();
const { ToWords } = require('to-words');

const port = process.env.PORT;

const toWords = new ToWords({
  localeCode: 'en-US',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!'); // plain text
});

app.get('/en/:number', (req, res) => {
  // console.log(req.query);
  // console.log(JSON.parse(req.query.currency.toLowerCase()));
  let currency = true;
  if (req.query.currency) {
    currency = JSON.parse(req.query.currency.toLowerCase());
  }
  res.send(toWords.convert(req.params.number, { currency }));
});

app.get('/square/:num', (req, res) => {
  let n = +req.params.num;
  res.send((n**2).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
