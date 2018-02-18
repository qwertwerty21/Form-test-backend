const Models = require('../models');
const validator = require('validator');
const helpers = require('../helpers');

const mongoose = require('mongoose');

exports.submitAnswer = async (req, res) => {
  try {
    const requiredFields = ['userID', 'questionID'];
    const missingFields = helpers.checkForMissingFields(
      req.body,
      requiredFields
    );
    if (missingFields.missingField.length) {
      return res.status(400).json(missingFields);
    }
    const { userID, questionID } = req.body;

    const answerText = req.body.answerText
      ? validator.escape(req.body.answerText)
      : '';

    const errorObj = {
      invalidField: {}
    };

    if (!mongoose.Types.ObjectId.isValid(questionID)) {
      errorObj.invalidField.questionID = 'questionID is invalid';
    }

    if (Object.keys(errorObj.invalidField).length) {
      return res.status(400).json(errorObj);
    }

    const answer = {
      answerText,
      userID,
      questionID
    };

    const result = await Models.Answer.create(answer);

    return res.status(200).json(result);
  } catch (e) {
    const errResults = helpers.mongooseError(e);
    return res.status(400).json(errResults);
  }
};
