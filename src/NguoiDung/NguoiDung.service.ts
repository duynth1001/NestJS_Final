import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { plainToClass } from "class-transformer";
import { danhSachLoaiNguoiDungDto } from "./dto/danhSachLoaiNguoiDung.dto";
import { DanhSachNguoiDungDto } from "./dto/danhSachNguoiDung.dto";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class NguoiDungService{
    constructor(
        private jwtService:JwtService
    ){}
    prisma = new PrismaClient();
    async LayDanhSachLoaiNguoiDung():Promise<danhSachLoaiNguoiDungDto[]>{
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

    async LayDanhSachNguoiDung():Promise<DanhSachNguoiDungDto[]>
    {
        try {
            let records = await this.prisma.nguoiDung.findMany();
            return records.map(record=>plainToClass(DanhSachNguoiDungDto,record));
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong',
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async LayDanhSachNguoiDungPhanTrang(page:number,size:number):Promise<DanhSachNguoiDungDto[]>
    {
        try {
            let records = await this.prisma.nguoiDung.findMany({
                skip:(page-1)*size,
                take:size
            })
            return records.map(record=>plainToClass(DanhSachNguoiDungDto,record));
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong',
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async TimKiemNguoiDung(email:string):Promise<DanhSachNguoiDungDto>
    {
        try {
            let record = await this.prisma.nguoiDung.findFirst({
                where:{email}
            })
            if (!record) {
                throw new NotFoundException(`Khong tim thay nguoi dung voi email ${email}`);
            }
            return plainToClass(DanhSachNguoiDungDto,record);
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

    async TimKiemNguoiDungPhanTrang(page:number,size:number,email:string):Promise<DanhSachNguoiDungDto[]>{
        try {
            if (email) {
                let record = await this.prisma.nguoiDung.findMany({
                    where:{email}
                })
                if (!record) {
                    throw new NotFoundException(`Khong tim thay nguoi dung voi email ${email}`);
                }
                return record.map(record=>plainToClass(DanhSachNguoiDungDto,record));
            }
            else{
                let records = await this.prisma.nguoiDung.findMany({
                    skip:(page-1)*size,
                    take:size
                })
                return records.map(record=>plainToClass(DanhSachNguoiDungDto,record));
            }
           
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
    async ThongTinTaiKhoan(token:string):Promise<DanhSachNguoiDungDto>{
        try {
      
            const decode = await this.jwtService.decode(token);
            if (!decode) {
                throw new BadRequestException("Unauthorized");
            }
            let {tai_khoan}=decode.data;
            let record = this.prisma.nguoiDung.findFirst({
                where:{
                    tai_khoan:Number(tai_khoan)
                }
            })    
            return plainToClass(DanhSachNguoiDungDto,record);
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

    async LayThongTinNguoiDung(tai_khoan:number):Promise<DanhSachNguoiDungDto>{
        try {
            let record =await this.prisma.nguoiDung.findFirst({
                where:{tai_khoan:Number(tai_khoan)}
            })
            if (!record) {
                throw new NotFoundException("Khong tim thay nguoi dung")
            }
            return plainToClass(DanhSachNguoiDungDto,record);
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
   
}