const { Contact } = require("../model/Contact");
const {client} = require ("../bd/connect")

const ajouterContact = async(req,res)=>{
  try {
    let contact= new Contact(req.body.Nom,req.body.Prénom,req.body.Email,req.body.age);
   let result = await  client.bd().collection("listecontacts").insertOne(contact);
   res.status(200).json(result);
  } catch (error) {
    log.console(error);
    res.status(500).json();
  }
}
module.exports = { ajouterContact};