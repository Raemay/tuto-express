//manager import
const UserManager = require('../../model/userManager');

//req res
async function deleteUserController(req, res) {
    //définir status message from manager et cette fois on veut l'id du profil a supprimer
    const {status, message} = await UserManager.deleteUser(req.params.id);
    // return du status défini dans le manager + le message
    return res.status(status).json(message)
}

module.exports = deleteUserController;