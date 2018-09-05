const mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({
      answer: {
          type: String,
          minlength: 1,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now
      },
      createdBy: {
          type:String,
          default: null,
          minlength: 1
      },
      isHelped: {
          type: Boolean,
          default: false
      }
});

const Answer = mongoose.model('Answer', answersSchema);

module.exports = Answer;