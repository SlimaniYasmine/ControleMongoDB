const { Contact } = require("../model/Contact");
const { client, getDatabase } = require("../bd/connect");

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

module.exports = { ajouterContact };
