import { Controller, Get, Query } from '@nestjs/common';
import { AppService, ConstruedPage } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(
      @Query('limit') limitParam?: string,
      @Query('after') afterCursor?: string,
      @Query('before') beforeCursor?: string,
  ): Promise<ConstruedPage> {
    const limit = Number(limitParam) || 10;
    return this.appService.getHello(limit, afterCursor, beforeCursor);
  }
}
