const fs = require('fs').promises;

const talkers = './talker.json';

async function getAllTalkers() {
  try {
    const result = await fs.readFile(talkers, 'utf-8');
    const data = JSON.parse(result);
    return data;
  } catch (err) {
    console.log(`Erro ao ler o arquivo: ${err.path}`);
  }
}

module.exports = getAllTalkers;
