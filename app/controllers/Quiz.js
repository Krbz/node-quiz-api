const QuizModel = require('../models/Quiz.js');

const Quiz = {
  AddQuiz: (req, res) => {
    // Todo: get username from token
    const prepare = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      type: req.body.type,
    };

    QuizModel.findOne({title: req.body.title}).exec()
      .then((quiz) => {
        if (quiz && quiz.length) return res.status(200).json({error: true, Response: 'Quiz already exists, provide unique title'});

        return QuizModel.create(prepare, (err) => {
          if (err) return res.status(500).json({error: err.errors, Response: {message: err.message}});

          return res.status(200).json({error: false, Response: 'Success'});
        });
      })
      .catch(err => res.status(500).json({error: err.errors, Response: {message: err.message}}));
  },
  GetList: (req, res) => {
    QuizModel.find({}).exec()
      .then((list) => {
        if (!list || !list.length) return res.status(200).json({error: true, Response: 'Empty list'});

        return res.status(200).json({error: false, Response: list});
      })
      .catch(err => res.status(500).json({error: err.errors, Response: {message: err.message}}));
  },
};

module.exports = Quiz;
