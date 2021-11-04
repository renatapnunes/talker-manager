const fs = require('fs').promises;

async function createTalker(newTalker) {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(newTalker));
  } catch (err) {
    console.log(`Erro ao escrever no arquivo: ${err.path}`);
  }
}

module.exports = createTalker;
