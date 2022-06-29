const jwt = require("jsonwebtoken");
const JWT_SECRET = "Thisisajwtsecrettokenforthejwttokens";
const fetchUser = (req,res,next) =>{

    // Get the user from jwt token and add id to the request object
    const token = req.header('auth-token');
    const token2 = req.header('auth-token-pg');

    if(!token){
        return res.status(401).send({error : 'Please authenticate using a valid token'});
    }

    if(!token2){

        return res.status(401).send({error : 'Please authenticate using a valid token'});

    }

    try {

        const data = jwt.verify(token,JWT_SECRET);
        const data2 = jwt.verify(token2,JWT_SECRET);
        console.log("This is what is the data ",data2);
        req.user = data.user ;
        req.userPostgres = data2.userPostgres;


    
        next();
        
    } catch (error) {

        return res.status(401).send({error : 'Please authenticate using a valid token'});
        
    }

   
}
module.exports = fetchUser ;