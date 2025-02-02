import { resolve as r } from 'path';
import express from 'express';
import { ParseServer } from 'parse-server';

const {
  DATABASE_URI,
  MONGODB_URI,
  APP_ID,
  CLIENT_KEY,
  MASTER_KEY,
  FACEBOOK_APP_ID,
  SERVER_URL,
  PORT,
} = process.env;

const api = new ParseServer({
  cloud: r(__dirname, './cloud/main.js'),
  databaseURI: DATABASE_URI || MONGODB_URI,
  appId: APP_ID,
  clientKey: CLIENT_KEY,
  masterKey: MASTER_KEY,
  facebookAppIds: [FACEBOOK_APP_ID],
  serverURL: SERVER_URL,
  push: {
    ios: [
      {
        pfx: r(__dirname, './MateoSossahDev.p12'),
        bundleId: 'com.coolappsinc.batgame',
        production: false,
      },
      {
        pfx: r(__dirname, './MateoSossahProd.p12'),
        bundleId: 'com.coolappsinc.batgame',
        production: true,
      },
    ],
    android: {
      senderId: '420615048738',
      apiKey: 'AIzaSyCUNWx3FgyKX6HgCvhVvVIvYeDv9m89Dew',
    },
  },
});

const app = express();

app.use('/parse', api);

const server = require('http').createServer(app);
server.listen(PORT, () => {
  console.log(`Parse server running on port ${PORT}`);
});

ParseServer.createLiveQueryServer(server);
