import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('health')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectConnection() private readonly connection: Connection) { }

  @Get('db')
  checkDb() {
    const status = this.connection.readyState;
    return { db: status === 1 ? 'Connected' : 'Not Connected' };
  }
}
