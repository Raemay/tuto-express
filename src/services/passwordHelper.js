// npm i argon2
const argon2 = require("argon2");

//hasher le password avec argon2.hash en fournissant le password non hashé
async function passwordHasher(password) {
  console.log(password);
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.log(err);
  }
}

// vérifier que le hashed password et le password sont bien les mêmes
// /!\ l'ordre est important dans le return le hashed en premier
async function passwordVerification(password, hashedPassword) {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    // internal failure
  }
}

// password forgotten, on génère un token qui expire au bout de 24h
function forgottenPasswordTokenGenerator() {
  const token =
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2);
  const dateOfExpiration = new Date();
  dateOfExpiration.setDate(dateOfExpiration.getDate() + 1);

  return { token, dateOfExpiration };
}

module.exports = {
  passwordHasher,
  passwordVerification,
  forgottenPasswordTokenGenerator,
};
