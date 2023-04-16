const SupportModel = require('../../models/support/Support');
const axios = require('axios')

exports.createsupportticket = async (req, res, next) => {
    const {uid, priority, email, message} = req.body;

    try {
        const ticket = await SupportModel.create({
            uid: uid,
            email: email,
            message: message,
            priority: priority
        })

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

              
        const mail = await axios.post('http://localhost:5000/api/v1/exchange/support/send',{
          email: 'jwilliams@nexfor.co.za',
          from: `${email}`,
          subject: `${priority} - ${email} (${priority})`,
          message: message
        },config);

        
        res.status(201).json({
            success: true,
            data: ticket,
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