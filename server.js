// Import dependencies
require('dotenv').config({path: './config.env'});
const Sentry = require("@sentry/node");
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const path = require('path');
const helmet = require('helmet')
const winston = require('winston')
const ecsFormat = require('@elastic/ecs-winston-format')
const geoip = require('geoip-lite');

// Import middleware
const helmetMiddleware = require('./middleware/helmet/helmetMiddleware');
const morganLogger = require('./middleware/morgan/loggerMiddleware');
const connectDB = require('./config/mongodb/config');
const {setupChangeStreams} = require('./middleware/streams/mongoChangeStreams');
const logger = require('./middleware/logger/logger');

// Sentry
// if (process.env.NODE_ENV === "production"){
//     //Sentry.io
//     Sentry.init({
//         dsn: "https://b40e2a4849264d6a932f74656290a534@o4504909803618304.ingest.sentry.io/4504909866467328",
//         environment: "production",
//         tracesSampleRate: 0.1,
//     });

    

//     const transaction = Sentry.startTransaction({
//         op: "status",
//         name: "Health check transaction",
//     });

//     function checkHealth() {
//         let healthStatus;
//         try {
//             // Check the health status here
//             // and set the healthStatus variable accordingly
//             healthStatus = 'OK';
//         } catch (e) {
//             // If an error occurs, capture the exception with Sentry
//             Sentry.captureException(e);
//             // Set the health status to indicate an error occurred
//             healthStatus = 'ERROR';
//         } finally {
//             // Finish the transaction
//             transaction.finish();
//         }
//         return healthStatus;
//     }
    
//     // Call the checkHealth function after a delay of 99 milliseconds
//     setTimeout(() => {
//         const healthStatus = checkHealth();
//         console.log(`Health status: ${healthStatus}`);
//     }, 99);
// }

// SIEM Elastic
// Add this to the VERY top of the first file loaded in your app
// const apm = require('elastic-apm-node').start({
//     serviceName: 'apm',
//     secretToken: 'w5En2oCX7tMe555Jwx',
//     serverUrl: 'https://5f8f147ac1f84a948f05591c3779b717.apm.af-south-1.aws.elastic-cloud.com:443',
//     environment: 'development'
// })

// Create Express app instance
const app = express();
const http = require('http');
const server = http.createServer(app);
//const db = mongoose.connection;

// const io  = require('socket.io')(server, {
//   pingTimeout: 60000,
//   cors: {
//       origin: '*'
//   }
// });

// Add Sentry middleware to Express
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Connect to database
connectDB();

// Middleware to capture geolocation and IP information for all requests
app.use((req, res, next) => {
    const ip = req.ip;
    const geo = geoip.lookup(ip);
  
    req.logMeta = {
      ip,
      geo,
    };
  
    next();
});

// Middleware to log all incoming requests
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, { ...req.logMeta, body: req.body });
  
    next();
});

// Middleware to log all outgoing responses
app.use((req, res, next) => {
    const originalSend = res.send;
  
    res.send = function (body) {
      logger.info(`Outgoing response: ${req.method} ${req.originalUrl}`, { ...req.logMeta, body });
  
      originalSend.call(res, body);
    };
  
    next();
});

// Add Morgan logging middleware
morganLogger(app);

// Add body-parser middleware for parsing JSON requests
app.use(bodyParser.json({ limit: '50mb' }));

// Add cookie-parser middleware for parsing cookies
app.use(cookieParser());

// Add CORS configurations
app.use(cors({
  origin: ["https://v211testapi.bureauhouseapi.co.za","https://login.microsoftonline.com","https://res.cloudinary.com"],
  optionsSuccessStatus: 200
}));

app.use(helmet.contentSecurityPolicy({
    directives: {
      fontSrc: ["'self'", 'data:'],
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
      connectSrc: ["'self'", "https://login.microsoftonline.com"],
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
}));

// // Listening for connections
// io.on('connection', socket => {
//   // connecting user on login form submit (client) and keeping connection open
//   // creating a room for this specific user
//   socket.on('setup', (userData) => {
//     console.log('Socket connection for user:', userData._id);
//     socket.join(userData._id);
//     socket.emit('connected');
//   });

//   // handling CPB regular searches
//   socket.on('cpbsearches', (userData) => {
//     socket.join(userData._id);
//     console.log('User will be conducting regular search:', userData._id);
//   });

//   // set up a single change stream for the cpbsearches collection
//   const changeStream = db.collection('cpbsearches').watch();

//   // when the user makes a search, add them to a search room and filter the change stream by user ID
//   socket.on('newcpbsearch', (userData) => {
//     const searchRoom = `cpbsearches_${userData._id}`;
//     socket.join(searchRoom);
//     console.log('User conducting search:', userData._id);

//     changeStream.on('change', (change) => {
//       if (change.operationType === 'insert' && socket.rooms.has(searchRoom)) {
//         socket.in(searchRoom).emit('cpbsearches', { userId: userData._id, data: change.fullDocument });
//         console.log(JSON.stringify(change.fullDocument))
//       }
//     }).on('error', (error) => {
//       console.error(`Change stream error: ${error}`);
//     });

//     // remove user from search room when they disconnect
//     socket.on('disconnect', () => {
//       socket.leave(searchRoom);
//       console.log('User disconnected from search:', userData._id);
//     });
//   });
// });

// Routes
app.use('/api/v1/auth', require('./routes/auth/auth'));
app.use('/api/v1/provider', require('./routes/providers/cpb'));
app.use('/api/v1/exchange', require('./routes/integrations/exchange365/exchange'))
app.use('/api/v1/projects', require('./routes/projects/project'))
app.use('/api/v1/team', require('./routes/team/teams'))
app.use('/api/v1/client', require('./routes/client/client'))

// Production

//SERVER INSTANCE START
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client','dist','index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send("API Running");
    })
}


const PORT = process.env.PORT || 5000;
server.listen(2000, () => {
    logger.info(`listening at ${PORT}`)
});

process.on("unhandledRejection", (err, promise) => {
    logger.error(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});