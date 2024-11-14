import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { plainToClass } from "class-transformer";
import { SignInDto } from "./dto/singin.dto";
import { JwtService } from "@nestjs/jwt";
import { KeyService } from "src/key/key.service";
@Injectable()
export class AuthService{
    prisma =new PrismaClient();
    constructor(
        private jwtService:JwtService,
        private keyService:KeyService
    ){
    }
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
            const {email,mat_khau}=signInDto;
            const checkUser = await this.prisma.nguoiDung.findFirst({
                where:{email}
            })
            if (!checkUser) {
                throw new BadRequestException("Email is wrong");
            }
            const checkPass = await bcrypt.compareSync(mat_khau,checkUser.mat_khau);
            if (!checkPass) {
                throw new BadRequestException("Password is wrong");
            }
            const token = this.jwtService.sign(
                {data:{tai_khoan:checkUser.tai_khoan}},
                {
                    expiresIn:"30m",
                    privateKey:this.keyService.getPrivateKey(),
                    algorithm:"RS256"
                }
            )
            return token;
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