const mongoose = require('mongoose');

const setupChangeStreams = (io, userEmail) => {
  const db = mongoose.connection;

  const listener = (change) => {
    if (change.operationType === 'insert') {
      console.log(`MongoDB change stream for user ${userEmail}: ${JSON.stringify(change.fullDocument)}`);
    }
  };

  db.once('open', () => {
    const changeStream = db.collection('cpbsearches').watch();
    changeStream.on('cpbsearches', listener);
  });

  return () => {
    db.collection('cpbsearches').watch().off('cpbsearches', listener);
  };
};


module.exports = { setupChangeStreams };

