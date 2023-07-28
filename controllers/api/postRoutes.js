const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment for a post
router.post('/:id/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [{ model: User, attributes: ['name'] }],
    });

    const comments = commentsData.map((comment) => comment.get({ plain: true }));

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment
router.put('/comments/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedComment[0]) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete('/comments/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Handle POST request to update a post
router.post('/update-post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body['post-title'],
        content: req.body['post-content'],
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
