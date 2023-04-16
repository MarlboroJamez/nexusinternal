require('cross-fetch/polyfill');
const msal = require("@azure/msal-node");
const { Client } = require("@microsoft/microsoft-graph-client");
const { emailnotification } = require("../../../utils/templates/notification");

exports.sendexchangeemail = async (req, res, next) => {
  const { from, email, subject, message, encodedPDF } = req.body;

  const pca = new msal.PublicClientApplication({
    auth: {
      clientId: "d4748929-d4e2-4c03-93e6-7e0ee180ca47",
      authority:
        "https://login.microsoftonline.com/45a16466-2e3b-42e6-b0a7-01cc0cc04e57",
      redirectUri: "/",
      clientSecret: "PXP8Q~W2yGvmtsaNYFWs2gTJQmFlNvpvXn5mtc-a",
    },
  });

  // You can prompt the user to sign in interactively or use a cached token
  const loginResult = await pca.acquireTokenByUsernamePassword({
    username: "nexusintel@nexfor.co.za",
    password: "NexIn@6405",
    scopes: ["https://graph.microsoft.com/.default"],
  });

  const client = Client.init({
    authProvider: async (done) => {
      done(null, loginResult.accessToken);
    },
  });

  const subjectContent = `${from} - ${subject}`;
  const messageContent = emailnotification(subjectContent, message);
  
  const pdfAttachment = {
    "@odata.type": "#microsoft.graph.fileAttachment",
    name: "attachment.pdf",
    contentBytes: encodedPDF // The encoded PDF string
  };
  
  const emailmessage = {
    subject: subjectContent,
    toRecipients: [
      {
        emailAddress: {
          address: email,
        },
      },
    ],
    body: {
      content: messageContent,
      contentType: "HTML",
    },
    from: {
      emailAddress: {
        address: "nexusintel@nexfor.co.za",
      },
    },
    attachments: [pdfAttachment] // Add the PDF attachment to the email message
  };

  const options = {
    requestOptions: {
      headers: {
        Prefer: 'outlook.allow-external-senders="true"',
      },
    },
  };

  client
    .api(`/users/nexusintel@nexfor.co.za/sendMail`)
    .post({ message:emailmessage }, options)
    .then((result) => {
      res.status(200).json({
        message: 'Email has been sent successfully.'
      })
    })
    .catch((error) => {
      if (error.status === 404) {
        console.log(error.message)
        res.status(404).json({
          message: error
        })
      } else {
        console.log(error.message)
        res.status(404).json({
          message: error
        })
      }
    });
};

exports.sendexchangeemailsupport = async (req, res, next) => {
  const { from, email, subject, message } = req.body;

  const pca = new msal.PublicClientApplication({
    auth: {
      clientId: "d4748929-d4e2-4c03-93e6-7e0ee180ca47",
      authority:
        "https://login.microsoftonline.com/45a16466-2e3b-42e6-b0a7-01cc0cc04e57",
      redirectUri: "/",
      clientSecret: "PXP8Q~W2yGvmtsaNYFWs2gTJQmFlNvpvXn5mtc-a",
    },
  });

  // You can prompt the user to sign in interactively or use a cached token
  const loginResult = await pca.acquireTokenByUsernamePassword({
    username: "nexusintel@nexfor.co.za",
    password: "NexIn@6405",
    scopes: ["https://graph.microsoft.com/.default"],
  });

  const client = Client.init({
    authProvider: async (done) => {
      done(null, loginResult.accessToken);
    },
  });

  const subjectContent = `${from} - ${subject}`;
  const messageContent = emailnotification(subjectContent, message);
  
  const emailmessage = {
    subject: subjectContent,
    toRecipients: [
      {
        emailAddress: {
          address: 'jwilliams@nexfor.co.za',
        },
      },
    ],
    body: {
      content: messageContent,
      contentType: "HTML",
    },
    from: {
      emailAddress: {
        address: "nexusintel@nexfor.co.za",
      },
    },
  };

  const options = {
    requestOptions: {
      headers: {
        Prefer: 'outlook.allow-external-senders="true"',
      },
    },
  };

  client
    .api(`/users/nexusintel@nexfor.co.za/sendMail`)
    .post({ message:emailmessage }, options)
    .then((result) => {
      res.status(200).json({
        message: 'Email has been sent successfully.'
      })
    })
    .catch((error) => {
      if (error.status === 404) {
        console.log(error.message)
        res.status(404).json({
          message: error
        })
      } else {
        console.log(error.message)
        res.status(404).json({
          message: error
        })
      }
    });
};

