const authName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const authAge = (req, res, next) => {
  const { age } = req.body;
  const msg = 'A idade inserida deve ser um número válido e inteiro';

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if ((typeof age !== 'number') || (age % 1 !== 0)) {
    return res.status(400).json({ message: msg });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const authTalk = (req, res, next) => {
  const { talk } = req.body;
  const msg = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!talk) {
    return res.status(400).json({ message: msg });
  }

  const { watchedAt } = talk;
  // lógica para verificar se rate está contido em talk desenvolvida com a ajuda do colega de turma Bruno Augusto
  if (!watchedAt || !('rate' in talk)) {
    return res.status(400).json({ message: msg });
  }

  next();
};

const authTalkKeys = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;

  // Regex retirada de https://qastack.com.br/programming/15491894/regex-to-validate-date-format-dd-mm-yyyy
  const regex = (/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i);

  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if ((+rate % 1 !== 0) || (+rate < 1 || +rate > 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = { authName, authAge, authTalk, authTalkKeys };
