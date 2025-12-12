import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealthCheck(): string {
    return 'All good here man >';
  }

  @Get('/users')
  getUsers(): Array<Object> {
    return this.appService.getUsers();
  }
}
