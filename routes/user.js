const express = require('express');
const router = express.Router();
const fs = require('fs');
const userImageUploadSingle = require('../middleware/userImageUploadSingle')
const awsFileDeletion = require('../helpers/awsFileDeletion');
const User = require('../models/user');

// @route GET /api/user/:id
// @desc Get user data from :id
// @access Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(foundUser => res.json(foundUser))
    .catch(err => console.log(err));
})

// @route POST /api/user/
// @desc Create new user
// @access Public
router.post('/', (req, res) => {
  const { name, email, favouriteNumber, colour } = req.body;
  User.create({ name, email, favouriteNumber, colour })
    .then(createdUser => res.json({
      message: 'User created.',
      user: createdUser
    }))
    .catch(err => console.log(err));
});

// @route PUT /api/user/:id/data
// @desc Update user data
// @access Public
router.put('/:id/data', (req, res) => {
  const userId = req.params.id;
  const { name, email, favouriteNumber, colour } = req.body;
  User.findByIdAndUpdate(userId, { name, email, favouriteNumber, colour }, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => console.log(err));
})

// @route PUT /api/user/:id/avatar
// @desc Update user avatar
// @access Public
router.put('/:id/avatar', userImageUploadSingle, (req, res) => {
  const userId = req.params.id;
  const avatar = req.file.location;
  User.findById(userId)
    .then(foundUser => {
      awsFileDeletion(foundUser.avatar);
      foundUser.avatar = avatar;
      foundUser.save()
        .then(savedUser => res.json(savedUser))
        .catch(err => res.json(err));
    })
    .catch(err => console.log(err));
})


// @route POST /api/user/:id/galleryimage/add
// @desc Create user gallery image
// @access Public
router.post('/:id/galleryimage/add', userImageUploadSingle, (req, res) => {
  const { id } = req.params;
  const image = req.file.location;
  User.findById(id)
    .then(foundUser => {
      foundUser.gallery.push(image);
      foundUser.save()
        .then(savedUser => res.json(savedUser))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})

// @route PUT /api/user/:id/galleryimage/update/:imageIndex
// @desc Update user gallery image
// @access Public
router.put('/:id/galleryimage/update/:imageIndex', userImageUploadSingle, (req, res) => {
  const { id, imageIndex } = req.params;
  const newImage = req.file.location;
  User.findById(id)
    .then(foundUser => {
      awsFileDeletion(foundUser.gallery[+imageIndex]);
      foundUser.gallery[+imageIndex] = newImage;
      foundUser.markModified('gallery');
      foundUser.save()
        .then(savedUser => res.json(savedUser))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})

// @route PUT /api/user/:id/galleryimage/delete/:imageIndex
// @desc Delete user gallery image
// @access Public
router.put('/:id/galleryimage/delete/:imageIndex', (req, res) => {
  const { id, imageIndex } = req.params;
  User.findById(id)
    .then(foundUser => {
      awsFileDeletion(foundUser.gallery[+imageIndex]);
      foundUser.gallery.splice(imageIndex, 1);
      foundUser.save()
        .then(savedUser => res.json(savedUser))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;