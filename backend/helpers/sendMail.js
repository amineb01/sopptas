const nodeMailer = require("nodemailer");
const dotenv = require('dotenv');
var { _generatePassword, makeRandomPassword } = require('./bycryptPasswordHandling')
var User = require('../models/User');
var Q = require('q');



dotenv.config();

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  // by defaukt gmail don't allow us to use authentification like this
  // we should activate less security
  // https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Nm9uol8RrvM9Rb7vDU0hbPfMlgxnOipC3rwWmfqQfiEg5ADF_mPdsjhQxGcP9mNk0ZAlTU_tWQENeAyg95QR-CIJ6Glg
  auth: {
    user: "sopptas.sousse@gmail.com",
    pass: "sopptasazerty"
  }
});

var mailOptions = {
  from: '"Sopptas" <sopptas.sousse@gmail.com>', // sender address
  to: "", // list of receivers
  subject: "Réinitialiser le mot de passe ✔", // Subject line
  text: "Réinitialiser le mot de passe", // plain text body
  html: "", // html body
};


const sendMail = (emails) => {
  deferred = Q.defer();
  mailOptions['to'] = emails
  var myPlaintextPassword = makeRandomPassword(6)
  _generatePassword(myPlaintextPassword).then(cryptedPwd => {
    User.findOneAndUpdate({ email: emails }, { password: cryptedPwd }).then((data) => {
      mailOptions["html"] = "<h1>Bonjour " + emails + "</h1><b><h2>suite a votre demande de mot de passe oublié votre nouveau mot de passe est <span style='color: green'>" + myPlaintextPassword + "</span></h2></b>"
      transporter.sendMail(mailOptions, function (error, info) {
        console.log(info);
        if (error) {
          console.log(error);
        }
      });
      deferred.resolve({ message: "email sent succefully" });

    })
      .catch((error) => {
        deferred.reject(error.message);
      });

  })
  return deferred.promise;


}
module.exports = sendMail
