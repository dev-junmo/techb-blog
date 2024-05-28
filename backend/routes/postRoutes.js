const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const { Post, Comment, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const path = require('path');

const dotenv = require('dotenv');
const comment = require('../models/comment');

dotenv.config();

try {
  fs.accessSync('backend/uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('backend/uploads');
}

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ message: `Server Error ${error}` });
    next(error);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      category: req.body.category,
      title: req.body.title,
      subTitle: req.body.subTitle,
      content: req.body.content,
      UserId: req.user.id,
      // user: req.body.user,
    });

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: `Server Error ${error}` });
    next(error);
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'backend/uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    }
  }),

  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', isLoggedIn, upload.single('image'), (req, res, next) => {
  console.log('전달받은 파일', req.file);
  console.log('저장된 파일의 이름', req.file.filename);

  const IMG_URL = `${process.env.BACK_URL}/${req.file.filename}`;
  console.log(IMG_URL);
  res.json({ url: IMG_URL });
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      UserId: req.user.id,
      PostId: parseInt(req.params.postId)
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: `Server Error ${error}` });
    next(error);
  }
});

router.patch('/:postId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
  try {
    await Post.update({
      category: req.body.category,
      title: req.body.title,
      subTitle: req.body.subTitle,
      content: req.body.content,
      UserId: req.user.id,
    }, {
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });

    res.status(200).json({ 
      PostId: parseInt(req.params.postId, 10),
      category: req.body.category,
      title: req.body.title,
      subTitle: req.body.subTitle,
      content: req.body.content,
      UserId: req.user.id, 
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
      },
    });

    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: `Server Error ${error}` });
    next(error);
  }
});

router.delete('/:postId/:commentId', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ 
      where: { 
        PostId: req.params.postId,
        UserId: req.user.id,
        id: req.params.commentId,
      } 
    });
    await Comment.destroy({
      where: {
        id: comment.id,
      },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });

    res.status(200).json({ CommentId: comment.id, PostId: parseInt(req.params.postId, 10), UserId: req.user.id });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: `Server Error ${error}` });
    next(error);
  }
});

router.patch('/:postId/:commentId', isLoggedIn, async (req, res, next) => { // PATCH /post/10
  try {
    await Comment.update({
      content: req.body.content,
      UserId: req.user.id,
    }, {
      where: {
        id: req.params.commentId,
        PostId: req.params.postId,
        UserId: req.user.id,
      },
    });

    res.status(200).json({ 
      PostId: parseInt(req.params.postId, 10),
      CommentId: parseInt(req.params.commentId, 10),
      content: req.body.content,
      UserId: req.user.id, 
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
