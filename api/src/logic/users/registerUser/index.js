const { User } = require("../../../models");
const { DuplicityError, SystemError } = require("errors");
const { validateText, validateEmail, validatePassword } = require("validators");

function registerUser(name, surname, email, password) {
  validateText(name, "name");
  validateText(surname, "surname");
  validateEmail(email);
  validatePassword(password);

  return User.create({ name, surname, email, password })
    .then((user) => {})
    .catch((error) => {
      if (error.code === 11000) throw new DuplicityError("user already exists");

      throw new SystemError(error.message);
    });
}

module.exports = registerUser;
