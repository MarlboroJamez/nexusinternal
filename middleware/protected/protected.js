const jwt = require('jsonwebtoken');
const UserModal = require('../../models/users/Users');

async function protect(req, res, next) {
  try {
    const user = req.session.user;

    if (!user) {
      // Redirect to login page
      return res.redirect('/');
    }

    const decoded = jwt.verify(user.token, process.env.JWT_SECRET);
    const currentUser = await UserModal.findById(decoded.id);

    if (!currentUser) {
      // Send response with error message
      return res.status(404).send({
        success: false,
        message: 'No user found.'
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    // Send response with error message
    return res.status(401).send({
      success: false,
      message: 'Invalid token'
    });
  }
}

module.exports = {
  protect
};
