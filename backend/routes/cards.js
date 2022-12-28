const router = require('express').Router();
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).max(30),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), dislikeCard);

router.use(errors()); // обработчик ошибок celebrate
module.exports = router;
