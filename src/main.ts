import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './jsonBigInt';
import { FormattedValidationPipe } from './shared/pipes/FormattedValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new FormattedValidationPipe());

  app.enableCors({
    origin: '*',
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
