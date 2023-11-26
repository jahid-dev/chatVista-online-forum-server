const express = require("express");
const applyMiddleware = require("./middlewares/applyMiddleware");
const globalErrorHandler = require("./utils/globalErrorHandler");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Uncomment the following lines if you have route handlers
// const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
// const adminRoutes = require('./routes/adminRoutes');

applyMiddleware(app);

// Define a simple route for the root
app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

// Uncomment the following lines if you have route handlers
// app.use('/auth', authRoutes);
// app.use('/post', postRoutes);
app.use( userRoutes );
// app.use('/admin', adminRoutes);

// Handling all unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use(globalErrorHandler);

const main = async () => {
  await connectDB()
  app.listen(port, () => {
    console.log(`ChatVista Server is running on port ${port}`);
  });
}

main();
