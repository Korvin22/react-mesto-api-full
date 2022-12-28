const router = require('express').Router();
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getUser, createUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUser);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2),
  }),
}), createUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2),
  }),
}), updateUser);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2),
  }),
}), updateAvatar);

router.use(errors()); // обработчик ошибок celebrate
module.exports = router;
