import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CronJob } from 'cron';
import { ShortLinkService } from './short-link-module/services/short-link.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const shortLinkService = app.get(ShortLinkService)
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000', '*'],
    credentials: true,
  });
  new CronJob('0 0 * * * *', async () => {
    await shortLinkService.deleteLink();
  }).start();
  await app.listen(3002);
}
bootstrap();
