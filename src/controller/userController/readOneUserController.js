const UserManager = require('../../model/userManager');

// Tout pareil que le delete

async function readOneUserController(req, res) {
    const {status, message} = await UserManager.fetchOneUser(req.params.id);
    
    return res.status(status).json(message)
}

module.exports = readOneUserController;