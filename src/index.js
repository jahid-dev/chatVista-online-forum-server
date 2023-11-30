require('dotenv').config
const http = require('http');
const app = require('./src/app');
const connectToDB = require('./src/config/database');
const server = http.createServer(app);
const port = process.env.PORT || 5000;

const main = async() => {
    await connectToDB();
    server.listen(port, () => {
        console.log(`FriendFusion server is running on: ${port}`);
    })
};

main()