import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './jsonBigInt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'https://links.mirum7.dev',
    methods: 'GET,POST,DELETE',
    optionsSuccessStatus: 204,
  });

  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Gracefully shutting down...');
    await app.close();
    process.exit(0);
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
