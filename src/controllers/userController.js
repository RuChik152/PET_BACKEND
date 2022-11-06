import asyncHandler from 'express-async-handler';
import {
  createAccessToken,
  createRefreshToken,
} from '../utils/generateToken.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { PRODUCTION } from '../config/constants.js';
import { getEnv } from '../config/env.js';

const createLoginCookie = (res, refreshToken) => {
  res.cookie('token', refreshToken, {
    httpOnly: true,
    secure: getEnv('NODE_ENV') === PRODUCTION ? true : false,
    path: '/api',
    expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    createLoginCookie(res, refreshToken);

    res.json({
      userInfo: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        hbDate: user.hbDate,
      },
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error('Неправильный email или пароль');
  }
});

// @desc    Get Access Token
// @route   GET /api/users/login/access-token
// @access  Private
const getAccessToken = asyncHandler(async (req, res) => {
  try {
    const rfToken = req.cookies.token;
    if (!rfToken) {
      res.status(400);
      throw new Error('Пожалуйста, войдите в систему!');
    }

    const result = jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET);
    if (!result) {
      res.status(400);
      throw new Error('Неверный токен или закончился.');
    }

    const user = await User.findById(result.id);
    if (!user) {
      res.status(400);
      throw new Error('Пользователь не найден.');
    }

    const accessToken = createAccessToken(user._id);

    res.json({
      userInfo: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        hbDate: user.hbDate,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Logout user & remove token
// @route   GET /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      path: '/api',
      expires: new Date(0),
    })
    .send();
});

// @desc    Create new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, hbDate, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Такой пользователь уже существует');
  }

  const user = await User.create({
    firstName,
    lastName,
    phone,
    hbDate,
    email,
    password,
  });

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  createLoginCookie(res, refreshToken);

  res.status(201).json({
    userInfo: {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      hbDate: user.hbDate,
    },
    accessToken,
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Пользователь не найден');
  }
});

export { authUser, getAccessToken, logoutUser, registerUser, getUserProfile };
