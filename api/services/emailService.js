const nodemailer = require('nodemailer');
const emailUser = require('../config').emailUser;
const emailPassword = require('../config').emailPassword;

let connectedEmail;

module.exports = {
  connectToEmail: () => {
      connectedEmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPassword
        }
      });
    },
    getConnectedEmail: () => {
      return connectedEmail;
    }
};