const UserManager = require('../../model/userManager');

// req res
async function updateUserController(req, res) {
    // cette fois on veut update donc id + le body avec les datas
    const {status, message} = await UserManager.updateUser(req.params.id, req.body);
    
    return res.status(status).json(message)
}

module.exports = updateUserController;