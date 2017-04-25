const QuestionModel = require('../models/Question.js');
const uuid = require('../services/uuid');

const Questions = {
  Get: (req, res) => {
    QuestionModel.find({level: req.body.level}).sort({date: -1}).exec()
      .then((list) => {
        if (!list || !list.length) return res.status(200).json({error: true, Response: 'Empty list'});

        return res.status(200).json({error: false, Response: list});
      })
      .catch(err => res.status(500).json({error: err.errors, Response: {message: err.message}}));
  },
  Add: (req, res) => {
    // Todo: get username from token
    const prepare = {
      title: req.body.title,
      type: req.body.type,
      author: req.body.author,
      time: req.body.time,
      score: req.body.score,
      answers: Object.assign(
        {},
        req.body.answers,
        req.body.answers.map((answer, index) => Object.assign({}, answer, {id: uuid.CreateId(index)}))),
      level: req.body.level,
    };

    return QuestionModel.create(prepare, (err) => {
      if (err) return res.status(500).json({error: err.errors, Response: {message: err.message}});

      return res.status(200).json({error: false, Response: 'Success'});
    });
  },
};

module.exports = Questions;
