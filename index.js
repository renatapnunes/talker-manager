const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkers = './talker.json';

// -----------------------------------------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// -----------------------------------------------------------------------------------------

async function getTalkers() {
  try {
    const result = await fs.readFile(talkers, 'utf-8');
    const data = JSON.parse(result);
    return data;
  } catch (err) {
    console.log(`Erro ao ler o arquivo: ${err.path}`);
  }
}

app.get('/talker', async (_req, res) => {
  const data = await getTalkers();
  
  if (data) {
    return res.status(200).json(data);
  }

  return res.status(200).json([]);
});

// -----------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log('Online');
});
