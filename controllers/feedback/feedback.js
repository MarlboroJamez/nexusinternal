const FeedbackModel = require('../../models/feedback/Feedback');
const axios = require('axios')

exports.createfeedback = async (req, res, next) => {
    const {uid, email, message} = req.body;

    try {
        const feedback = await FeedbackModel.create({
            uid: uid,
            email: email,
            message: message,
        })

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

              
        const mail = await axios.post('http://localhost:5000/api/v1/exchange/support/send',{
          email: email,
          from: `${email}`,
          subject: `Feedback - ${email}`,
          message: message
        },config);

        
        res.status(201).json({
            success: true,
            data: feedback,
        });
        console.log(mail)
    } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          // The request was made and the server responded with a status code
          return res.status(500).send({
            success: false,
            message: err.response.data
          });
        } else if (err.request) {
          // The request was made but no response was received
          return res.status(500).send({
            success: false,
            message: 'No response received from server'
          });
        } else {
          // Something else happened in making the request that triggered the error
          return res.status(500).send({
            success: false,
            message: err
          });
        }
      }
}