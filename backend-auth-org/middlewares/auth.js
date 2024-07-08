const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      try {
        const foundUser = await User.findOne({ where: { userId: user.userId } });
        if (!foundUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        req.user = foundUser;
        next();
      } catch (error) {
        console.error('Error authenticating token:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  }
};
