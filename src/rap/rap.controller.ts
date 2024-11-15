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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('QuanLyRap')
@ApiBearerAuth('JWT-auth')
@Controller('QuanLyRap')
export class RapController {
  constructor(private readonly rapService: RapService) {}

  @Get('LayThongTinHeThongRap')
  @ApiQuery({ name: 'maHeThongRap', required: false, type: Number })
  async LayThongTinHeThongRap(
    @Query('maHeThongRap') maHeThongRap: number,
    @Res() res: Response,
  ): Promise<Response<[danhSachRapDto]>> {
    let thongTinHeThongRap =
      await this.rapService.LayThongTinHeThongRap(maHeThongRap);
    return res.status(HttpStatus.OK).json(thongTinHeThongRap);
  }

  @Get('LayThongTinCumRapTheoHeThong')
  @ApiQuery({ name: 'maHeThongRap', required: false, type: Number })
  async LayThongTinCumRapTheoHeThong(
    @Query() query: { maHeThongRap: number },
    @Res() res: Response,
  ): Promise<Response<[danhSachRapDto]>> {
    let thongTinCumHeThongRap =
      await this.rapService.LayThongTinCumRapTheoHeThong(query);
    return res.status(HttpStatus.OK).json(thongTinCumHeThongRap);
  }

  @Get('LayThongTinLichChieuHeThongRap')
  @ApiQuery({ name: 'maHeThongRap', required: false, type: Number })
  async layThongTinLichChieuHeThongRap(
    @Query() query: { maHeThongRap: number },
    @Res() res: Response,
  ): Promise<Response<[danhSachRapDto]>> {
    let thongTinLichChieuHeThongRap =
      await this.rapService.LayThongTinLichChieuHeThongRap(query);
    return res.status(HttpStatus.OK).json(thongTinLichChieuHeThongRap);
  }

  @Get('LayThongTinLichChieuPhim')
  @ApiQuery({ name: 'maPhim' })
  async layThongTinLichChieuPhim(
    @Query() query: { maPhim: number },
    @Res() res: Response,
  ): Promise<Response<[danhSachRapDto]>> {
    let thongTinLichChieuPhim =
      await this.rapService.LayThongTinLichChieuPhim(query);
    return res.status(HttpStatus.OK).json(thongTinLichChieuPhim);;
  }
}
