const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
      text: {
          type: String,
          minlength: 1,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now
      },
      createdBy: {
          type: String,
          default: null,
          minlength: 1
      },
      answers: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Answer'
      }]
});

const Question = mongoose.model('Question', questionsSchema);

module.exports = Question;