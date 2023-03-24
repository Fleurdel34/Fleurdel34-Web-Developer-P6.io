/*Création de l'ensemble des requetes pour les sauces*/

const Sauces = require('../models/Sauces');
const fs = require('fs');

exports.createSauces = (req, res) => {
  
   const saucesObject = JSON.parse(req.body.sauce);
   delete saucesObject._id;
   delete saucesObject.userId
   const sauces = new Sauces({
        ...saucesObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

   });
    sauces.save()
        .then(()=>{res.status(201).json({message:'Objet enregistré'})})
        .catch(error => {res.status(400).json({error})});
    
};

exports.modifySauces =  (req, res) => {
    const saucesObject = req.file ?{
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }:{...req.body};
    delete saucesObject._userId;
    Sauces.findOne({_id: req.params.id})
        .then((sauces) => {

            if(sauces.userId != req.auth.userId){
                res.status(403).json({message: 'Non authorisé!'});
            }else{
                Sauces.updateOne({_id: req.params.id}, {...saucesObject, _id: req.params.id })
                    .then(()=>{res.status(200).json({message:'Objet modifié'})})
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauces =  (req, res) => {
    Sauces.findOne({_id: req.params.id})
        .then((sauce) => {
            if(sauce.userId != req.auth.userId){
                res.status(403).json({message: 'Non authorisé!'});
            }else{
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () =>{
                    Sauces.deleteOne({_id: req.params.id})
                        .then(()=>{res.status(200).json({message:'Objet supprimé'})})
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res) => {

    Sauces.find()
        .then( sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
    
};

exports.getOneSauces = (req, res) => {

    Sauces.findOne({_id: req.params.id})
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
};