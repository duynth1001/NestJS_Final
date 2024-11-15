import { Module } from '@nestjs/common';
import { RapService } from './rap.service';
import { RapController } from './rap.controller';
import { KeyModule } from 'src/key/key.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    KeyModule,
   
  ],
  controllers: [RapController],
  providers: [RapService],
})
export class RapModule {}
