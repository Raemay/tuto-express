//importer le manager
const UserManager = require("../../model/userManager");

//toujours req res
async function createUserController(req, res) {
    // définir status et message à partir du manager et de la fonction,
    //ne pas oublier qu'on veut le BODY
  const { status, message } = await UserManager.insertUser(req.body);
// on renvoit le status défini dans le manager (201 ou 500) et le message format JSON
  return res.status(status).json(message);
}

module.exports = createUserController;
