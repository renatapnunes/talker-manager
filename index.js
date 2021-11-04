const express = require('express');
const bodyParser = require('body-parser');
const getAllTalkers = require('./services/getAllTalkers');
const getToken = require('./services/getToken');
const { authEmail, authPassword } = require('./middlewares/authLogin');
const authToken = require('./middlewares/authToken');
const { authName, authAge, authTalk, authTalkKeys } = require('./middlewares/authTalkerData');
const createTalker = require('./services/createTalker');
const editTalker = require('./services/editTalker');
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

app.post('/talker', authToken, authName, authAge, authTalk, authTalkKeys, async (req, res) => {
  const talkers = await getAllTalkers();
  const newTalker = { ...req.body, id: (talkers.length + 1) };
  const talker = [...talkers, newTalker];
  await createTalker(talker);
  
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', authToken, authName, authAge, authTalk, authTalkKeys, async (req, res) => {
  const talkers = await getAllTalkers();
  const { id: idEdit } = req.params;
  const talkersFiltered = talkers.filter((talker) => +talker.id !== +idEdit);
  const talker = { ...req.body, id: +idEdit };
  const talkersEdited = [...talkersFiltered, talker];
  await editTalker(talkersEdited);
  
  return res.status(200).json(talker);
});

// app.get('/teste', async (_req, res) => {
//   const token = getToken();

//   return res.status(200).json(token);
// });

// -----------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log('Online');
});
