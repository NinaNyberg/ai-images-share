import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// get all posts
router.get('/', (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error });
    });
});

// create a post
router.post('/', (req, res) => {
  const { name, prompt, photo } = req.body.form;
  const photoUrl = cloudinary.uploader.upload(photo);
  console.log(name);
  photoUrl
    .then((data) => {
      const photo = data.url;
      Post.create({
        name,
        prompt,
        photo
      });
    })
    .then((post) => {
      console.log(post);
      res.status(201).json({ post });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error });
    });
});

// delete a post
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(id);
  Post.findByIdAndDelete(id)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

export default router;
