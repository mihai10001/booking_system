const roles = require('../utils/roles.json');

const verifyAdminRole = (req, res, next) => {
    if (req.userRole && req.userRole == roles.admin) {
        next();
    } else {
        return res.status(500).send({ message: 'You don\'t have the right permissions.' });
    }
}


exports.verifyAdminRole = verifyAdminRole;