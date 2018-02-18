const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// schema

const QuestionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      default: '',
      trim: true
    },
    timeLimitInSec: {
      type: Number,
      default: 180
    }
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    }
  }
);

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
