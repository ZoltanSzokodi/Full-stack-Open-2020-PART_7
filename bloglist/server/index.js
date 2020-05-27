const app = require('./app');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// ENVIRONMENT VARS
let NODE_ENV = process.env.NODE_ENV;
let PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `Server is running on ${NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
