const { MongoClient, Db } = require('mongodb');

let client = null;
let db = null; // Déclaration de la variable db à l'extérieur de la fonction connecter

async function connecter(url) {
  if (client == null) {
    client = new MongoClient(url);
    const dbName = 'contact';
    // Utilisez la méthode connect pour vous connecter au serveur
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db("contact"); // Affectez la base de données à la variable db
  }
}

function getDatabase() {
  if (client) {
    return db; // Retournez directement la variable db
  }
  return null;
}

function fermerConnexion() {
  if (client) {
    client.close();
    client = null;
    db = null; // Réinitialisez la variable db lors de la fermeture de la connexion
  }
}

module.exports = { connecter, getDatabase, fermerConnexion };
