const express = require('express');
const bodyParser = require('body-parser');
const getAllTalkers = require('./services/getAllTalkers');
const getToken = require('./services/getToken');
const authEmail = require('./middlewares/authEmail');
const authPassword = require('./middlewares/authPassword');
// const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// const talkers = './talker.json';

// -----------------------------------------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// -----------------------------------------------------------------------------------------

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  
  if (talkers) {
    return res.status(200).json(talkers);
  }

  return res.status(200).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getAllTalkers();

  const [talkerInfos] = talkers.filter((talker) => +talker.id === +id); 

  if (talkerInfos) {
    return res.status(200).json(talkerInfos);
  }
  
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', authEmail, authPassword, async (_req, res) => {  
  const token = getToken();

  return res.status(200).json({ token });
});

// app.get('/teste', async (_req, res) => {
//   const token = getToken();

//   return res.status(200).json(token);
// });

// -----------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log('Online');
});
