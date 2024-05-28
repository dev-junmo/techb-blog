const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    console.log("userRouter", req.user);
    if(req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
        }],
      });
      res.status(200).json(fullUserWithoutPassword);
    }else{
      res.status(200).json(null)
    }
  } catch {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.error(err);
      return next(err);
    }

    if(info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if(loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      // return res.json(user);

      // console.log(req.user);

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'nickname', 'email'],
        include: [{
          model: Post,
        }],
      });

      return res.json(fullUserWithoutPassword);
    });
  }) (req, res, next)
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });

    if(exUser) {
      return res.status(403).send('이미 등록이 된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    const user = await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.status(200).send(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: `Server Error ${error}` });
    next(error);
  }
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    res.redirect('/');
  });
  // req.session.destroy();
  // res.send('ok');
});

module.exports = router;
