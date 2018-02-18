const express = require('express');

const router = express.Router();

const controller = require('../controllers');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Strive Quiz App' });
});

// get all questions
router.get('/question', controller.Question.getAllQuestions);

// create a question
router.post('/question', controller.Question.createQuestion);

// submit an answer
router.post('/question/:questionID/answer', controller.Answer.submitAnswer);

module.exports = router;
