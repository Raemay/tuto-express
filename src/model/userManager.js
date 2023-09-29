const connection = require("../../database");
const filterHelper = require("../services/FilterHelper");
const { passwordHasher } = require("../services/passwordHelper");

async function insertUser(data) {
  // SQL request of INSERT il faut changer les données en fonction de ce qu'on a besoin dans la bdd
  const sql =
    "INSERT INTO user (email, password, name, city, hobby, travelers, description) VALUES (?, ?, ?, ?, ?, ?, ?)";

  //password hashing
  data.password = await passwordHasher(data.password);

  // COPY OF DATA
  let bodyResponse = { ...data };
  console.log(bodyResponse);

  //connexion bdd
  return (
    connection
      .promise()
      //Query avec la request et les data à insérer
      .query(sql, Object.values(data))
      // insérer l'id
      .then(async ([rows]) => {
        console.log(rows);
        bodyResponse.id = rows.insertId;
        //@TODO remove password from body

        //return le status created avec la copie de data
        return { status: 201, message: bodyResponse };
      })
      .catch((error) => {
        //return status interal error, + message error
        return { status: 500, message: error };
      })
  );
}

// ne pas oublier de fournir l'id, les data, et si le password est reset ou pas
async function updateUser(id, data, isPasswordReset) {
  //reset password
  if (isPasswordReset) {
    data.password = await passwordHasher(data.password);
    data.password_token = "";
  }
  //request sql of UPDATE
  let sqlQuery = "UPDATE user SET ";
  // boucle pour le nom de ? pour l'insersion des data
  for (let key in (itemValue = Object.keys(data))) {
    sqlQuery += `${itemValue[key]} = ?, `;
  }
  //formatage de la request
  sqlQuery = sqlQuery.slice(0, sqlQuery.length - 2);

  // ajout de l'id dans la request
  sqlQuery += ` WHERE iduser = ${id}`;
  // copie de data
  let bodyResponse = { ...data };
  //connexion bdd
  return (
    connection
      .promise()
      // request sql + insertion des data
      .query(sqlQuery, Object.values(data))
      .then(async ([rows]) => {
        // return status created avec la copie de data
        return { status: 201, message: bodyResponse };
      })
      .catch((error) => {
        // status internal error et message error
        return { status: 500, message: error };
      })
  );
}

// ne pas oublier de fournir id à la fonction
async function deleteUser(id) {
  //request sql
  let sqlQuery = `DELETE FROM user where iduser = ${id}`;

  //connexion bdd
  return (
    connection
      .promise()
      //request sql
      .query(sqlQuery)
      .then(async ([rows]) => {
        //return status ok, message vide vu que c'est un delete
        return { status: 200, message: {} };
      })
      .catch((error) => {
        //meme chose qu'avant
        return { status: 500, message: error };
      })
  );
}

async function fetchUser() {
  //request sql encore et toujours
  const sql = "SELECT * FROM user";

  // connexion bdd
  return (
    connection
      .promise()
      //request sql
      .query(sql)
      .then(async ([rows]) => {
        // status ok et message avec la response
        return { status: 200, message: rows };
      })
      .catch((error) => {
        // toujours interal error
        return { status: 500, message: error };
      })
  );
}

// ne pas oublier le userId
async function fetchOneUser(userId) {
  // connexion à la bdd + request sql, + userId
  try {
    const [rows] = await connection.query(
      "SELECT * FROM user WHERE iduser = ?",
      [userId]
    );

    if (rows.length === 0) {
      // Aucun utilisateur trouvé avec cet ID
      return { status: 404, message: "Utilisateur non trouvé" };
    }
    //return status ok avec le premier résultat
    return { status: 200, message: rows[0] };
  } catch (error) {
    console.error("Erreur lors de la requête à la base de données :", error);
    throw error; // Vous pouvez également renvoyer un message d'erreur personnalisé si nécessaire
  }
}

//ne pas oublier res et filter
async function fetchUserBy(res, filter) {
  // sql et les valeurs, qui passent dans le checkKindOfFilter pour etre filtré
  let { sql, values } = filterHelper.checkKindOfFilter(filter);
  if (filter.token && filter.token === "") {
    return res.status(400).json("Something went wrong");
  }

  //connexion bdd
  return (
    connection
      .promise()
      //request sql avec les data
      .query(sql, values)
      .then(async ([rows]) => {
        if (rows.length === 0) {
          // si y a pas de résultat :
          return res.status(400).json("Something went wrong");
        }
        // sinon status ok
        return { status: 200, message: rows };
      })
      .catch((error) => {
        // internal error
        return res.status(500).message(error);
      })
  );
}

module.exports = {
  fetchOneUser,
  fetchUser,
  deleteUser,
  insertUser,
  updateUser,
  fetchUserBy,
};
