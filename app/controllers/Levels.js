const LevelModel = require('../models/Level.js');

const Levels = {
  Get: (req, res) => {
    LevelModel.find({quiz: req.body.quiz}).sort({date: -1}).exec()
      .then((list) => {
        if (!list || !list.length) return res.status(200).json({error: true, Response: 'Empty list'});

        return res.status(200).json({error: false, Response: list});
      })
      .catch(err => res.status(500).json({error: err.errors, Response: {message: err.message}}));
  },
  Add: (req, res) => {
    // Todo: get username from token
    const prepare = {
      coverage: req.body.coverage,
      quiz: req.body.quiz,
      unlocked: false,
      author: req.body.author,
    };

    return LevelModel.create(prepare, (err) => {
      if (err) return res.status(500).json({error: err.errors, Response: {message: err.message}});

      return res.status(200).json({error: false, Response: 'Success'});
    });
  },
};

module.exports = Levels;
