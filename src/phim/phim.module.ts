import { Module } from '@nestjs/common';
import { PhimService } from './phim.service';
import { PhimController } from './phim.controller';

@Module({
  controllers: [PhimController],
  providers: [PhimService],
})
export class PhimModule {}
