const jwt = require('jsonwebtoken');

function MAuth(req, res, next) {
  const token = req.header('authorization');

  if (!token) res.status(403).json({ error: 'Forbidden' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  return next();
}

module.exports.MAuth = MAuth;
