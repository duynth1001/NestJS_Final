import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { plainToClass } from "class-transformer";
import { danhSachLoaiNguoiDungDto } from "./dto/danhSachLoaiNguoiDung.dto";

@Injectable()
export class NguoiDungService{
    prisma = new PrismaClient();
    async LayDanhSachLoaiNguoiDung(){
        try {
            let records= await this.prisma.nguoiDung.findMany({
                distinct:['loai_nguoi_dung'],
                select:{
                    loai_nguoi_dung:true
                }
            })
            return records.map(record=>plainToClass(danhSachLoaiNguoiDungDto,record));
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong',
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}