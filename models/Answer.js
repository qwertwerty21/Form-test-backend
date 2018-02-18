const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// schema

const AnswerSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: 'userID is required',
      index: true
    },
    questionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: 'questionID is required',
      index: true
    },
    answerText: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    }
  }
);

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
