const bcrypt = require('bcrypt');
const saltRounds = 10;

const _generatePassword = async (myPlaintextPassword) => {
  let hashedPsswd = await bcrypt.hash(myPlaintextPassword, saltRounds)
  return hashedPsswd;
}

const verifyPassword = async (myPlaintextPassword, hash) => {
  let hashedPsswd = await bcrypt.compare(myPlaintextPassword, hash)
  return hashedPsswd;
}
const makeRandomPassword = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


module.exports = {_generatePassword, verifyPassword, makeRandomPassword}
