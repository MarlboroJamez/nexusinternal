const axios = require('axios');

exports.authenticate = async (req, res, next) => {
  const info = {
    AccountNumber: process.env.CPB_USER_ACCOUNT_NUMBER,
    UserCode: process.env.CPB_USER_CODE,
    BureauName: process.env.CPB_BUREAU,
    Password: process.env.CPB_USER_PASSWORD,
    CallingModule: 'Integration',
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post(
      `${process.env.CPB_USER_TEST_URL}/token/token?verify=${process.env.CPB_TEST_VERIFY}`,
      info,
      config
    );
    if (!data.Results || !data.Results.length) {
      console.log('Failed to authenticate user.');
    }
    // Save the token in the request object for later use.
    req.authToken = data.Results[0];
    next();
  } catch (err) {
    console.log(err)
  }
};
