const jwt = require('jsonwebtoken');
const secret = 'ys0$-@d';
function createToken(user){
    const validTimeSec = 20*60; // == token expire after 20 minutes
    const expirationDate = Date.now() / 1000 + validTimeSec ;
    const token = jwt.sign({email : user.email , exp : expirationDate}, secret );
    return token;
}


 
module.exports = {
    createToken: createToken , 
    secret : secret
  };

