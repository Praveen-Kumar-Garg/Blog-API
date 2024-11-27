const express = require('express');
const Post = require('../model/Post');
const router = express.Router();

//create a new post
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const newPost = new Post({ title, content, author });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);

    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//read all blog post 
// router.get('/', async (req, res) => {
//     try {
//       const posts = await Post.find(); // Fetch all blog posts from the database
//       res.json(posts);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  router.get('/', async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      next(err); // Forward error to error-handling middleware
    }
  });
  
  
//update a post
router.post('/:id', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, author },
            { new: true }

        );
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});

//delete a blog post
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: "err.message" });

    }

});

module.exports = router;

