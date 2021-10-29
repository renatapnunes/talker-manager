// Lógica para obter token baseada em uma dica do colega de turma Adryan e com base no seguinte link:
// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js

const crypto = require('crypto');

const getToken = () => crypto.randomBytes(8).toString('hex');

module.exports = getToken;
