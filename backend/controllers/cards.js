/* eslint-disable consistent-return */
const Card = require('../models/card');
const {
  ValidationError,
  NotFoundError,
  AuthorizationError,
  RightsError,
} = require('../constants/errors');
const { decodeToken } = require('../middlewares/auth');

const getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (e) {
    next(e);
  }
};
const deleteCard = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthorizationError('Необходима авторизация!!');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const ownerId = decodeToken(token);
    const { cardId } = req.params;
    console.log(ownerId, cardId);
    if (cardId !== ownerId) {
      throw new RightsError('Невозможно удалить карточку другого пользователя');
    }
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new ValidationError('Данные введены неправильно'));
    }
    next(e);
  }
};
const createCard = async (req, res, next) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new ValidationError('Данные введены неправильно'));
    }
    next(e);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!newCard) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send(newCard);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new ValidationError('Данные введены неправильно'));
    }
    next(e);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!newCard) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send(newCard);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new ValidationError('Данные введены неправильно'));
    }
    next(e);
  }
};

module.exports = {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
