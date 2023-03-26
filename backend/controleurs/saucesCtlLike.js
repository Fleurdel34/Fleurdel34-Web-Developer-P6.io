/*creation de la requete Post pour les likes et dislikes*/

const Sauces = require('../models/Sauces');

exports.like = (req, res) => {
    
    Sauces.findOne({id: req.params.id})
        .then((objet)=>{
            if(!objet.usersLiked.includes(req.body.userId) && req.body.like === 1){
                Sauces.updateOne(
                    {id: req.params.id},
                    {
                        $inc:{likes: 1},
                        $push:{usersLiked: req.body.userId}
                    }

                )
                    .then(() => res.status(201).json({message:'Avis enregistré'}))
                    .catch(error => res.status(400).json({ error }));
            };
            if(objet.usersLiked.includes(req.body.userId) && req.body.like === 0){
                Sauces.updateOne(
                    {id: req.params.id},
                    {
                        $inc:{likes: -1},
                        $pull:{usersLiked: req.body.userId}
                    }

                )
                    .then(() => res.status(201).json({message:'Avis supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            };
            if(!objet.usersDisliked.includes(req.body.userId) && req.body.like === -1){
                Sauces.updateOne(
                    {id: req.params.id},
                    {
                        $inc:{dislikes: 1},
                        $push:{usersDisliked: req.body.userId}
                    }

                )
                    .then(() => res.status(201).json({message:'Avis enregistré'}))
                    .catch(error => res.status(400).json({ error }));
            };
            if(objet.usersDisliked.includes(req.body.userId) && req.body.like === 0){
                Sauces.updateOne(
                    {id: req.params.id},
                    {
                        $inc:{dislikes: -1},
                        $pull:{usersDisliked: req.body.userId}
                    }

                )
                    .then(() => res.status(201).json({message:'Avis enregistré'}))
                    .catch(error => res.status(400).json({ error }));
            };
        })
        .catch(error => res.status(404).json({ error })); 
}

