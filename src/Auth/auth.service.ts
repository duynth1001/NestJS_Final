import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { plainToClass } from "class-transformer";
import { SignInDto } from "./dto/singin.dto";
@Injectable()
export class AuthService{
    prisma =new PrismaClient();
    async DangKy(authDto:AuthDto)
    {
        try {
            let record = await this.prisma.nguoiDung.findFirst({
                where:{
                    email:authDto.email
                }
            })
            if (record) {
                throw new HttpException('Email is already existed',HttpStatus.FORBIDDEN);
            }
            const hashPassword = await bcrypt.hash(authDto.mat_khau,10);
            const newRecord = await this.prisma.nguoiDung.create({
                data:{
                    ho_ten:authDto.ho_ten,
                    email:authDto.email,
                    so_dt:authDto.so_dt,
                    mat_khau:hashPassword,
                    loai_nguoi_dung:authDto.loai_nguoi_dung
                }
            })
            return plainToClass(AuthDto,newRecord);
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

    async DangNhap(signInDto:SignInDto){
        try {
            
        } catch (error) {
            
        }
    }
}