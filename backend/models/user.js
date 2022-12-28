const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /https?[www.]?[a-z[\]@!$&'()*+,;=-]*/.test(v);
      },
    },
  },
  email: {
    type: String,
    validate: [isEmail, 'invalid email'],
  },
  password: {
    type: String,
    select: false,
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
