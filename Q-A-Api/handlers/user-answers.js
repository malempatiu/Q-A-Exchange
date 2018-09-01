const Answer = require('../models/answers'),
    Question = require('../models/questions'),
    { ObjectID } = require('mongodb');

exports.createAnswer = async (req, res) => {
    try {
        const { question_id } = req.params;
        if (!ObjectID.isValid(question_id)) {
            return res.status(404).json({ error: "Invalid ID" });
        }
        const foundedQuestion = await Question.findById(question_id);
        if (foundedQuestion) {
            const answer = await Answer.create(req.body);
            foundedQuestion.answers.push(answer);
            await foundedQuestion.save();
            return res.status(200).json({ answer });
        } else {
            return res.status(404).json({ error: "No question found for the given ID" });
        };
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};