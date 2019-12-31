
const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res) => {
  book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newBook = new Book({
    username,
    description,
    duration,
    date,
  });

  newBook.save()
    .then(() => {
        return res.json('Book added!');
    })
    .catch(err => {
        return res.status(400).json('Error: ' + err);
    });
});

module.exports = router;