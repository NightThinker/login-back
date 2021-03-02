const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.postSignup = (req, res, next) => {
  console.log('postSignup')
  console.log('req.body', req.body)
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log('userDoc')
        return res.send("User not exist");;
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then((result) => {
          return res.status(200).send(result);
        })
    })
    .catch(err => {
      console.log(err);
    });
};
