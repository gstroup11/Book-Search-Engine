const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req, connection }, res, next) {
    let token;

    if (connection) {
      // For subscriptions over WebSocket
      token = connection.context.authorization;
    } else {
      // For HTTP requests
      const authHeader = req.headers.authorization || '';
      token = authHeader.split(' ')[1] || '';
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log('Invalid token');
      return res.status(400).json({ message: 'Invalid token!' });
    }

    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};