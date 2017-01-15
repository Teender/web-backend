module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({message: 'o hai'});
  });

  app.post('/sendEmail', (req, res) => {
    let emailValidator = require('email-validator');
    let email = req.query.email;
    let school = req.query.school;
    let message = req.query.message;

    console.log('email = ' + email);

    if (!emailValidator.validate(email)) {
      res.status(400).send({error: 'invalid email'});
    } else {
      let fs = require('fs');
      fs.readFile('emailFile.html', (err, file) => {
        if (!err) {
          let send = require('gmail-send')({
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
            to: email,
            subject: 'An Anonymous Admirer Invites You to Join Teender',
            // text: 'Hey there, beautiful! An anonymous friend from ' + school + ' on Facebook wants you to join Teender, ' +
            // 'a social app for teens around the world. ' + message + '\n Download the app for iOS: ' +
            // 'google.com/foobar \n Download the app for Android: google.com/foobar',
            html: file
          });

          // Override any default option and send email
          send({}, function (err, response) {
            if (!err) {
              res.status(200).send({response: response});
            } else {
              res.status(400).send({error: err});
            }
          });
        } else {
          console.error('o faq');
          res.status(500).send();
        }
      });
    }
  });
};