/*création des requetes Signup et Login*/

const Auth = require('../models/Auth');

const bcrypt = require('bcrypt');

const tokenCtl = require('jsonwebtoken');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new Auth ({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(()=> res.status(201).json({message:'Utilisateur créé'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    
};


exports.login = (req, res) => {
    Auth.findOne({email: req.body.email})
    .then(user => {
        if(user === null){
            res.status(401).json({message:'Identifiant ou mot de passe incorrect'})
        }else{
            
            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
    
                    if(!valid){
                        res.status(401).json({message:'Identifiant ou mot de passe incorrect'});
                    }else{
                        res.status(200).json({
                            userId: user._id,
                            token: tokenCtl.sign(
                                { userId: user._id },
                                'RANDOM_TOKEN_KEY',
                                { expiresIn: '24h' }
                            )
                            
                        })
                        
                    }

                })
                .catch(error => res.status(500).json({error}));
        }
    })
    .catch(error => res.status(500).json({error}));
};