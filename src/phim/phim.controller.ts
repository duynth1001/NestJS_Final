import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PhimService } from './phim.service';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { danhSachBannerDto } from './dto/danhSachBanner.dto';
import { danhSachPhimDto } from './dto/danhSachPhim.dto';

@ApiTags('QuanLyPhim')
@Controller('QuanLyPhim')
export class PhimController {
  constructor(private readonly phimService: PhimService) {}

  @Get('LayDanhSachBanner')
  async LayDanhSachBanner(
    @Res() res: Response,
  ): Promise<Response<[danhSachBannerDto]>> {
    let danhSachBanner = await this.phimService.LayDanhSachBanner();
    return res.status(HttpStatus.OK).json(danhSachBanner);
  }
  @Get('LayDanhSachPhim')
  @ApiQuery({ name: 'maNhom', required: false, type: String, default: 'GP01' })
  @ApiQuery({ name: 'tenPhim', required: false, type: String })
  async LayDanhSachPhim(
    // @Query('maNhom') maNhom: string = 'GP01',
    @Query('tenPhim') tenPhim: string,
    @Res() res: Response,
  ): Promise<Response<[danhSachPhimDto]>> {
    let danhSachPhim = await this.phimService.LayDanhSachPhim(tenPhim);
    return res.status(HttpStatus.OK).json(danhSachPhim);
  }
  @Get('LayDanhSachPhimPhanTrang')
  @ApiQuery({ name: 'maNhom', required: false, type: String, default: 'GP01' })
  @ApiQuery({ name: 'tenPhim', required: false, type: String })
  @ApiQuery({ name: 'soTrang', required: false, type: Number })
  @ApiQuery({ name: 'soPhanTuTrenTrang', required: false, type: Number })
  async LayDanhSachPhimPhanTrang(
    // @Query('maNhom') maNhom: string = 'GP01',
    @Query('tenPhim') tenPhim: string,
    @Query('soTrang') soTrang: number = 1,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number = 10,
    @Res() res: Response,
  ): Promise<Response<[danhSachPhimDto]>> {
    let danhSachPhim = await this.phimService.LayDanhSachPhimPhanTrang(
      tenPhim,
      soTrang,
      soPhanTuTrenTrang,
    );
    return res.status(HttpStatus.OK).json(danhSachPhim);
  }
  @Get('LayDanhSachPhimTheoNgay')
  @ApiQuery({ name: 'maNhom', required: false, type: String, default: 'GP01' })
  @ApiQuery({ name: 'tenPhim', required: false, type: String })
  @ApiQuery({ name: 'soTrang', required: false, type: Number })
  @ApiQuery({ name: 'soPhanTuTrenTrang', required: false, type: Number })
  @ApiQuery({ name: 'tuNgay', required: false, type: String })
  @ApiQuery({ name: 'denNgay', required: false, type: String })
  async LayDanhSachPhimTheoNgay(
    // @Query('maNhom') maNhom: string = 'GP01',
    @Query('tenPhim') tenPhim: string,
    @Query('soTrang') soTrang: number = 1,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number = 10,
    @Query('tuNgay') tuNgay: string,
    @Query('denNgay') denNgay: string,
    @Res() res: Response,
  ): Promise<Response<[danhSachPhimDto]>> {
    let danhSachPhim = await this.phimService.LayDanhSachPhimTheoNgay(
      tenPhim,
      soTrang,
      soPhanTuTrenTrang,
      tuNgay,
      denNgay,
    );
    return res.status(HttpStatus.OK).json(danhSachPhim);
  }
  @Get('LayThongTinPhim')
  @ApiQuery({ name: 'maPhim', required: false, type:Number })
  async LayThongTinPhim(
    // @Query('maNhom') maNhom: string = 'GP01',
    @Query('maPhim') maPhim: number,

    @Res() res: Response,
  ): Promise<Response<[danhSachPhimDto]>> {
    let danhSachPhim = await this.phimService.LayThongTinPhim(maPhim);
    return res.status(HttpStatus.OK).json(danhSachPhim);
  }
  
}
