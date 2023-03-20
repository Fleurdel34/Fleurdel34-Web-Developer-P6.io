const Auth = require('../models/auth');

const bcrypt = require('bcrypt');

const tockenCtl = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const auth = new Auth ({
                email: req.body.email,
                password: hash
            });
            auth.save()
                .then(()=> res.status(201).json({message:'Utilisateur créé'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};


exports.login = (req, res, next) => {
    Auth.findOne({email: req.body.email})
    .then(auth => {
        if(auth === null){
            res.satus(401).json({message:'Identifiant ou mot de passe incorrect'})
        }else{
            bcrypt.compare(req.body.password, auth.password)
                .then(valid =>{
                    if(!valid){
                        res.satus(401).json({message:'Identifiant ou mot de passe incorrect'});
                    }else{
                        res.satus(200).json({
                            userId: auth._Id,
                            token: tockenCtl.sign(
                                 {userId: auth._id },
                                'RANDOM_TOKEN_KEY',
                                 {expiresIn: '24h' }
                            )
                        })
                    }

                })
                .catch(error => res.status(500).json({error}));
        }
    })
    .catch(error => res.status(500).json({error}));
};