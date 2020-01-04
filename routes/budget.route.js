const router = require('express').Router();

const { MAuth } = require('./private');

// this would be the user's budget list
router.get('/', MAuth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
