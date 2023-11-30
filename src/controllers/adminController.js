// controllers/userController.js
const Comments = require('../models/Comment');
const Posts = require('../models/Post');
const User = require('../models/User');
;



const getAdminStatus = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isAdmin = user.role === 'admin';
    res.send({ admin: isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


const makeUserAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndUpdate(id, { $set: { role: 'admin' } });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};




module.exports = {  getAdminStatus, makeUserAdmin, deleteUser };
