const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController')
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');


router.post('/jwt', async (req, res) => {
  const user = req.body;
  console.log(user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.send({ token });
});
router.get('/users', verifyToken, verifyAdmin, userController.getUsers);
router.get('/users/admin/:email', verifyToken, adminController.getAdminStatus);
router.post('/users', userController.createUser);
router.patch('/users/admin/:id', verifyToken, verifyAdmin, adminController.makeUserAdmin);
router.delete('/users/:id', verifyToken, verifyAdmin, adminController.deleteUser);


module.exports = router;
