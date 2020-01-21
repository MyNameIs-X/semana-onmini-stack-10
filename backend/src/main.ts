import "reflect-metadata";
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { controllers } from './controllers';
import { setupWebsocket } from './socket';
import mongoose from 'mongoose';

import http from 'http';

import * as dotenv from 'dotenv-flow';
dotenv.config();

// Dabase Connect
try{
  mongoose.connect(process.env.MONGO_CONNECT || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useCreateIndex', true);

  console.info('[+] Successfully Connected!');
} catch (error){
  console.error('[+] Error to connect mongo: ', error.message);
}

// Set Container
useContainer(Container);

// Create Server
const app = createExpressServer({
  controllers: [...controllers],
  cors: true
});

console.log('[+] Application is running at port 4000');
const server = new http.Server(app);
setupWebsocket(server);
server.listen(4000);
