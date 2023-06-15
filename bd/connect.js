const { MongoClient, Db } = require('mongodb');

let client = null;

function connecter(url, callback) {
  if (client == null) {
    client = new MongoClient(url);
    client.connect((error) => {
      if (error) {
        client = null;
        callback(error);
      } else {
        callback();
      }
    });
  } else {
    callback();
  }
}

function getDatabase() {
  if (client) {
    return client.db("contact");
  }
  return null;
}

function fermerConnexion() {
  if (client) {
    client.close();
    client = null;
  }
}

module.exports = { connecter, getDatabase, fermerConnexion };
