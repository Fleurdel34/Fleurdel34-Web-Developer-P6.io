const tokenCtl = require('jsonwebtoken');

module.exports= (req, res, next)=>{

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = tokenCtl.verify(token, 'RANDOM_TOKEN_KEY')
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };

    }
    catch(error){
        res.satus(401).json({error});
    }


}