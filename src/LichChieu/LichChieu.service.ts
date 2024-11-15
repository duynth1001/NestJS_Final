import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { plainToClass } from "class-transformer";
import { LichChieuDto } from "./dto/LichChieu.dto";
import { TaoLichChieuDto } from "./dto/TaoLichChieu.dto";

@Injectable()
export class LichChieuService{
    prisma = new PrismaClient();
    async LayDanhSachPhongVe(maLichChieu:number)
    {
        try {
            
            let lich_chieu_record=await this.prisma.lichChieu.findFirst({
                where:{
                    ma_lich_chieu:Number(maLichChieu)
                }
            })
            
            if (!lich_chieu_record) {
                throw new NotFoundException(`Khong tim thay ma lich chieu ${maLichChieu}`)
            }
            return plainToClass(LichChieuDto,lich_chieu_record);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong',
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async TaoLichChieu(taoLichChieuDto:TaoLichChieuDto)
    {
        try {
            let checkMaPhim = await this.prisma.phim.findFirst({
                where:{ma_phim:Number(taoLichChieuDto.ma_phim)}
            })
            if (!checkMaPhim) {
                throw new BadRequestException(`Ma phim ${taoLichChieuDto.ma_phim} khong ton tai trong he thong`);
            }
            let checkMaRap = await this.prisma.rapPhim.findFirst({
                where:{ma_rap:Number(taoLichChieuDto.ma_rap)}
            })
            if (!checkMaRap) {
                throw new BadRequestException(`Ma rap ${taoLichChieuDto.ma_rap} khong ton tai trong he thong`);
            }
            let newLichChieuRecord = await this.prisma.lichChieu.create({
                data:taoLichChieuDto
            })
            return plainToClass(TaoLichChieuDto,newLichChieuRecord);
            
        } catch (error) {
              // Re-throw the error if it's already an HttpException
        if (error instanceof HttpException) {
            throw error;
        }
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong',
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}