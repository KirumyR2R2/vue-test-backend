import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as Express from 'express';

const server = Express();
server.get('/', (req, res) => res.send('ok'));
server.get('/liveness_check', (req, res) => res.send('ok'));
server.get('/_ah/start', (req, res) => res.send('ok'));
server.get('/_ah/stop', (req, res) => res.send('ok'));
server.get('/_ah/health', (req, res) => res.send('ok'));
server.get('/readiness_check', (req, res) => res.send('ok'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  const PORT = Number(process.env.PORT) || 7000;
  await app.listen(PORT);
}
bootstrap();
