/*creation de la requete Post pour les likes et dislikes*/

const Sauces = require('../models/Sauces');

exports.createLike = (req, res) => {
  
    const likeObject = JSON.parse(req.body.sauce);
    delete likeObject._id;

    /* status like pour chaque utilisateur
    pour +1(aime) 0(enleve like/dislike) -1(n'aime pas) 
    prendre le user id  pour le like et dislike
    user est ajoute ou retire du tableau appoprié
    user => une seule valeur 
    le nombre total de like et dislike est maj a chaque nouvelle notation*/
    
        
    
    /*like.save()
         .then(()=>{res.status(200).json({message:''})})
         .catch(error => {res.status(400).json({error})});*/
     
 };