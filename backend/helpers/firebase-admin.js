var admin = require("firebase-admin");

var serviceAccount = require("../sopptas-firebase-adminsdk-wspbh-29cd1ed613.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
