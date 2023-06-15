const { Contact } = require("../model/Contact");
const { client, getDatabase } = require("../bd/connect");
const { ObjectId } = require('mongodb');

const ajouterContact = async (req, res) => {
  try {
    let contact = new Contact(req.body.nom, req.body.prenom, req.body.email, req.body.age);
    console.log("Contact object:", contact); // Logging the contact object
    let db = getDatabase();
    if (db) {
      let result = await db.collection("listecontacts").insertOne(contact);
      console.log("Insert result:", result); // Logging the insert result
      res.status(200).json(result);
    } else {
      throw new Error("Database connection is not available.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
async function afficherListeContacts() {
  let db = getDatabase();
  const collection = db.collection('listecontacts');
  const contacts = await collection.find().toArray();
  console.log('Liste des contacts :', contacts);
}

/*async function afficherContactParId(req, res) {
  try {
    const id = req.params.id;
    let db = getDatabase(); // Assurez-vous d'adapter cette fonction à votre configuration de base de données
    const collection = db.collection('listecontacts');
    const contact = await collection.findOne({ _id: ObjectId(id) });
    res.json(contact);
  } catch (error) {
    console.error('Erreur lors de la recherche du contact :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche du contact' });
  }
}*/
async function afficherContactsAgeSup18() {
  try {
    let db = getDatabase();
    const collection = db.collection('listecontacts');
    const contacts = await collection.find({ age: { $gt: "18" } }).toArray();
    console.log('Contacts avec un âge > 18 ans :', contacts);
  } catch (error) {
    console.error('Erreur lors de la recherche des contacts :', error);
  }
}
async function afficherContactsAgeSup18AvecNomAh() {
  try {
    let db = getDatabase();
    const collection = db.collection('listecontacts');
    const contacts = await collection.find({ age: { $gt: 18 }, nom: { $regex: 'ah', $options: 'i' } }).toArray();
    console.log('Contacts avec un âge > 18 ans et un nom contenant "ah" :', contacts);
  } catch (error) {
    console.error('Erreur lors de la recherche des contacts :', error);
  }
}
async function supprimerContactsMoinsDe5Ans() {
  try {
    let db = getDatabase();
    const collection = db.collection('listecontacts');
    const result = await collection.deleteMany({ age: { $lt: 5 } });
    console.log('Nombre de contacts supprimés :', result.deletedCount);
  } catch (error) {
    console.error('Erreur lors de la suppression des contacts :', error);
  }
}

async function changerPrenomContact() {
  try {
    let db = getDatabase();
    const collection = db.collection('listecontacts');
    const result = await collection.updateOne({ prenom: 'Seif' }, { $set: { prenom: 'Anis' } });
    console.log('Nombre de contacts modifiés :', result.modifiedCount);
  } catch (error) {
    console.error('Erreur lors du changement de prénom du contact :', error);
  }
}


module.exports = { ajouterContact, afficherListeContacts,afficherContactsAgeSup18,afficherContactsAgeSup18AvecNomAh,supprimerContactsMoinsDe5Ans,changerPrenomContact};
