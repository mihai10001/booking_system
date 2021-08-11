const jwt = require('jsonwebtoken');
const secretKey = require('../config').secretKey;

let verifyJWT = (req, res, next) => {
  // Get the token from headers, and remove Bearer if found
  let token = req.headers['x-access-token'] || req.headers['authorization'] || '';
  token = token.replace(/^Bearer\s+/, '');
  
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    else {
      // At this point, we are authenticated
      req.userId = decoded.id;
      req.userEmail = decoded.email;
      req.userRole = decoded.role;
      next();
    }
  });
}

exports.verifyJWT = verifyJWT;
