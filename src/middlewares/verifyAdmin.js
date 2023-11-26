// middlewares/verifyAdmin.js
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user || user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden access' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = verifyAdmin;
