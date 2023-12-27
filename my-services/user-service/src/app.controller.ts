import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @MessagePattern({ cmd: 'get_hello_from_user' })
  getHelloFromUserService(): string {
    return this.appService.getHello();
  }
}
