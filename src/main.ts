import { NestFactory } from '@nestjs/core';
import { AppNotificationModule } from 'my-services/notification-service/src/app.module';
import { AppUserModule } from 'my-services/user-service/src/app.module';

async function bootstrap() {
  const app_user = await NestFactory.create(AppUserModule);
  const app_noti = await NestFactory.create(AppNotificationModule);
  await app_user.listen(4002);
  await app_noti.listen(4001);
}
bootstrap();
