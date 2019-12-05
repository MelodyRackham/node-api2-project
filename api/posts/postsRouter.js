const express = require('express');
const Posts = require('./postsModel');
const router = express.Router();

// POST Request #1

router.post('/', (req, res) => {
  const data = req.body;
  if (!data.title || !data.contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  } else {
    Posts.insert(data)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database',
        });
      });
  }
});

// POST Request #2

router.post('/:id/comments', (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  if (text) {
    Posts.findById(id)
      .then(post => {
        if (post.length) {
          Posts.insertComment({ text: text, post_id: id })
            .then(() => {
              res.status(201).json({ message: req.body });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: 'There was an error while saving the comment to the database.',
              });
            });
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.',
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: 'There was an error while saving the comment to the database.',
        });
      });
  } else {
    res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
  }
});

// GET Request #1

router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The posts information could not be retrieved.',
      });
    });
});

// GET Request #2

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'The post information could not be retrieved.',
      });
    });
});
// GET Request #3

router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
  Posts.findPostComments(id)
    .then(comment => {
      if (comment.length !== 0) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'The comments information could not be retrieved.',
      });
    });
});

// PUT Request

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updated = req.body;
  Posts.findById(id)
    .then(newUpdates => {
      if (newUpdates) {
        res.status(201).json(newUpdates);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
      if (!updated.text) {
        Posts.update(id, updated)
          .then(user => {
            res.status(201).json(user);
          })
          .catch(err => {
            res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
          });
      } else if (!user.id) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'There was an error while saving the comment to the database' });
    });
});

// DELETE Request

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      count > 0
        ? res.status(200).json({ message: 'post successfully deleted' })
        : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

module.exports = router; // <<<<<<<<<<<<<<<< export the router
