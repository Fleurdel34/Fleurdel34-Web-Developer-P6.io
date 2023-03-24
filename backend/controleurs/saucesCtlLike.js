/*creation de la requete Post pour les likes et dislikes*/

const Sauces = require('../models/Sauces');

exports.like = (req, res) => {
    
    Sauces.findOne({id: req.params.id})
        .then((objet)=>{
            if(!objet.usersLiked.includes(req.body.userId) && req.body.like === 1){
                
            }
            res.status(200).json({message:'Avis enregistré'})})
        .catch(error => res.status(400).json({ error })); 
}

