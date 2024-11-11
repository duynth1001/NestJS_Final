import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
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
            let newLichChieuRecord = await this.prisma.lichChieu.create({
                data:taoLichChieuDto
            })
            return plainToClass(TaoLichChieuDto,newLichChieuRecord);
            
        } catch (error) {
            console.log(error);
            
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong',
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}