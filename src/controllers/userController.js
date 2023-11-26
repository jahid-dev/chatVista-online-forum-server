// userController.js
const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
      const result = await User.find();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

async function createUser(req, res) {
  const userData = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: userData.email });
   

    if (existingUser) {
      return res.send({ message: 'User already exists', insertedId: null });
    }

    // Create a new user
    const newUser = new User(userData);
    const result = await newUser.save();

    res.send(result);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

module.exports = {
  createUser,getUsers
};

