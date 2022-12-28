/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const User = require('../models/user');

const {
  ValidationError,
  NotFoundError,
  WrongData,
  AuthorizationError,
} = require('../constants/errors');

const {
  generateToken
} = require('../middlewares/auth');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};
const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError('пользователь не найден');
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new ValidationError('Данные введены неправильно'));
    }
    if (e.name === 'CastError') {
      next(new ValidationError('Данные введены неправильно'));
    }
    next(e);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.find();

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new ValidationError('Данные введены не корректно'));
    }
    if (e.name === 'CastError') {
      next(new ValidationError('Данные введены не корректно'));
    } next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const body = { ...req.body };
    const { email, password } = body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    console.log(user);
    return res.status(200).send({ _id: user._id });
  } catch (e) {
    console.log(e);
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      next(new ValidationError('Данные введены не корректно'));
      return;
    }
    /* ошибку прописал, но при одинаковом email ee не ловит, не могу понять почему */
    if (e.code === 11000) {
      next(new WrongData('Почта или пароль введены не верно'));
      return;
    }
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true, runValidators: true }
    );
    return res.status(200).send(newUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new ValidationError('Данные введены не корректно'));
      return;
    } next(e);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, { new: true, runValidators: true });
    return res.status(200).send(newUser);
  } catch (e) {
    /* const errors = Object.values(e.errors).map((err) => err.message);
    return res.status(400).json({ message: errors.join(", ") }); */
    if (e.name === 'ValidationError') {
      next(new ValidationError('Данные введены не корректно'));
      return;
    } next(e);
  }
};

const login = async (req, res, next) => {
  const body = { ...req.body };
  const { email, password } = body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthorizationError('Неверные логин или пароль');
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const payload = { _id: user._id };
      const token = generateToken(payload);
      return res.status(200).json({ token });
    }
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      next(new ValidationError('Данные введены не корректно'));
      return;
    }
    next(e);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
