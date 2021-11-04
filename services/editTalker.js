const fs = require('fs').promises;

async function editTalker(talkersEdited) {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(talkersEdited));
  } catch (err) {
    console.log('Erro ao editar arquivo');
  }
}

module.exports = editTalker;
