const UserModal = require('../../models/users/Users');
const crypto = require('crypto');

// Login password route
exports.login = async (req, res, next) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    // Send response with error message
    return res.status(404).send({
      success: false,
      message: 'No email has been provided, try again.'
    });
  }

  try {
    const user = await UserModal.findOne({ email });

    // Check if user exists
    if (!user) {
        // Send response with error message
        return res.status(401).send({
          success: false,
          message: 'Invalid credentials'
        });
    }

    if (user.accessibility === true) {
      sendToken(user, 200, res);
    } else if (user.accessibility === false) {
      // Send response with error message
      return res.status(404).send({
        success: false,
        message: 'Access has been restricted, contact support at office@nexfor.co.za'
      });
    }
  } catch (err) {
    // Handle error
      return res.status(500).send({
        success: false,
        message: err.message
      });
  }
}

// Register route
exports.register = async (req, res, next) => {
    // Get user information from request body
    const { name, surname, email, password, role } = req.body;
  
    try {
      // Create a new user with the provided information
      const user = await UserModal.create({
        name,
        surname,
        email,
        password,
        role,
      });
  
      // Send token with user information in response
      sendToken(user, 201, res);
    } catch (err) {
      // If there's an error creating the user, send an error response
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
};  

// Forgot password route
exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body;

    try {
        // Find user by email
        const user = await UserModal.findOne({email});

        // If user not found, return error
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email could not be sent."
            });
        }

        // Generate reset password token
        const resetToken = user.getResetPasswordToken();

        // Save token to user document
        await user.save();

        // Construct reset URL
        const resetURL = `http://${process.env.HOST}/resetpassword/${resetToken}`;

        // Generate forgot password email message
        const message = forgotPasswordTemplate(resetURL);

        try {
            // Send forgot password email
            // Add code to send email here
            res.status(200).json({
                success:true,
                text: "Reset email has been sent.",
            });
        } catch(err) {
            // If email sending fails, clear reset token and return error
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).send({
                success: false,
                message: "Reset email could not be sent."
            });
        }
    } catch(err){
        // Return server error if anything else goes wrong
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

// Reset password route
exports.resetpassword = async (req, res, next) => {
    // Get the reset password token from the request parameters and hash it
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
  
    try {
      // Find the user with the matching reset password token and a valid expiry time
      const user = await UserModal.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
      });
  
      if(!user){
        // If no user is found, return an error response
        return res.status(400).send({
          success: false,
          message: "Invalid reset token"
        });
      }
  
      // Set the new password for the user and clear the reset password fields
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      // Return a success response with a new token
      res.status(201).json({
        success: true,
        data: "Password updated successfully",
        token: user.getSignedToken(),
      });
    } catch(err) {
      // Handle any errors that occur during the password reset process
      return res.status(500).send({
        success: false,
        message: err.message
      });
    }
}


// Methods
const sendToken = async (user, status, res) => {
    const token = user.getSignedToken();
    const refreshToken = user.getRefreshToken();
        
    res.cookie('suid', token, {
        maxAge: 365.24 * 24 * 60 * 60 * 1000,
        httpOnly: true
    });
    res.cookie('refreshToken', refreshToken, {
        maxAge: 365.24 * 24 * 60 * 60 * 1000,
        httpOnly: true
    });

    const responseObj = {
        success: true,
        role: user.role,
        user: user,
        token,
        refreshToken,
    };

    res.status(status).json(responseObj);
};

