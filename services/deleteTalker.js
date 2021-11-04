const fs = require('fs').promises;

async function deleteTalker(talkersDelete) {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(talkersDelete));
  } catch (err) {
    console.log('Erro ao deletar talker');
  }
}

module.exports = deleteTalker;
