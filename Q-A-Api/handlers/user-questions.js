const Question = require('../models/questions'),
    User = require('../models/user'),
    { ObjectID } = require('mongodb');

exports.createQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const createdQuestion = await Question.create(req.body);
        const user = await User.findOne({ _id: id });
        user.questions.push(createdQuestion.id);
        await user.save();
        return res.status(200).json({ createdQuestion });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.userCreatedQuestions = async (req, res) => {
    try {
        const foundUserWithQuestions = await User.findOne({ _id: req.params.id }).populate('questions');
        return res.status(200).json({ userQuestions: foundUserWithQuestions.questions });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    };
}

exports.fetchQuestions = async (req, res) => {
    try {
        const questions = await Question.find({});
        return res.status(200).json({ questions });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.getQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectID.isValid(id)) {
            return res.status(404).json({ error: 'Invalid Question ID' });
        }
        const question = await Question.findById(id).populate('answers');
        if (question) {
            return res.status(200).json({ question });
        } else {
            return res.status(404).json({ error: 'No questions and answers found the given ID' });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};