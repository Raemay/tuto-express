const UserManager = require('../../model/userManager');

// req res

async function readUserController(req, res) {
    // on veut tous les users donc on appelle le manager et sa fonction pour tous les users
    const {status, message} = await UserManager.fetchUser();
    // même chose que pour les autres fichiers
    return res.status(status).json(message)
}

module.exports = readUserController;