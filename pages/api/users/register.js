const bcrypt = require('bcryptjs');
const User = require('../../../models/User');

export default (req, res) => {
  if (req.method === 'POST') {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          // Throw a 400 error if the email address already exists
          return res.status(400).json({ email: "A user has already registered with this address" })
        } else {
          // Otherwise create a new user
          const newUser = new User({
            accountType: req.body.accountType,
            email: req.body.email,
            password: req.body.password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => {
                  console.log(err)
                  res.json({error: err});
                });
            })
          })
        }
      });
    return;
  }

  res.json({
    awww: 'yeahhh',
  })
}
