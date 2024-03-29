/*creation du TOKEN*/

const tokenCtl = require('jsonwebtoken');

require('dotenv').config();

module.exports= (req, res,next)=>{

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = tokenCtl.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    }
    catch(error){
        res.status(401).json({message: "identifiant ou mot de passe invalide"});
    }


}