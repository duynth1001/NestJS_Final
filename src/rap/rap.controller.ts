import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RapService } from './rap.service';
import { danhSachRapDto } from './dto/danhSachRap.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('QuanLyRap')
@Controller('QuanLyRap')
export class RapController {
  constructor(private readonly rapService: RapService) {}
  @Get('LayThongTinHeThongRap')
  async LayThongTinHeThongRap(
    @Query('maHeThongRap') maHeThongRap: number,
    @Res() res: Response,
  ): Promise<Response<[danhSachRapDto]>> {
    let thongTinHeThongRap =
      await this.rapService.LayThongTinHeThongRap(maHeThongRap);
    return res.status(HttpStatus.OK).json(thongTinHeThongRap);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.rapService.findOne(+id);
  // }
}
