const tockenCtl = require('jsonwebtoken');

module.exports= (req, res, next)=>{

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedTocken = tockenCtl.verify(token, 'RANDOM_TOKEN_KEY')
        const userId = decodedTocken.userId;
        req.auth = {
            userId: userId
        };
        next();
    }
    catch(error){
        res.satus(401).json({error})
    }


}