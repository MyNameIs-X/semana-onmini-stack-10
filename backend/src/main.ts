import "reflect-metadata";
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { controllers } from './controllers';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv-flow'
dotenv.config();

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

useContainer(Container);
createExpressServer({
  controllers: [...controllers]
}).listen(4000);