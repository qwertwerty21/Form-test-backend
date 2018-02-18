const Models = require('../models');
const helpers = require('../helpers/');
const validator = require('validator');

// const mongoose = require('mongoose');

exports.getAllQuestions = async (req, res) => {
  try {
    const results = await Models.Question.find({});

    if (results.length === 0) {
      return res.status(500).json({ message: 'no questions found' });
    }
    return res.status(200).json(results);
  } catch (e) {
    const errResults = helpers.mongooseError(e);
    return res.status(400).json(errResults);
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { timeLimitInSec } = req.body;

    const questionText = req.body.questionText
      ? validator.escape(req.body.questionText)
      : '';

    const question = {
      questionText,
      timeLimitInSec
    };

    const result = await Models.Question.create(question);

    return res.status(200).json(result);
  } catch (e) {
    // const returnData = helper.mongoose_error(e);
    const errResults = helpers.mongooseError(e);
    return res.status(400).json(errResults);
  }
};
