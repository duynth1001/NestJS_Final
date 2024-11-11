import { ApiProperty } from "@nestjs/swagger";
import {  Type } from "class-transformer";
import {  IsDate,  IsNotEmpty, IsNumber, Matches } from "class-validator";

export class TaoLichChieuDto{
    
    @IsNotEmpty({message:"Ma rap khong duoc de trong"})
    @IsNumber({},{message:"Ma rap phai la so"})
    @ApiProperty()
    ma_rap:number;

    @IsNotEmpty({message:"Ma phim khong duoc de trong"})
    @IsNumber({},{message:"Ma phim phai la so"})
    @ApiProperty()
    ma_phim:number;

    @IsNotEmpty({ message: "Ngay gio chieu khong duoc de trong" })
    ngay_gio_chieu:string;

    @IsNotEmpty({message:"Gia ve khong duoc de trong"})
    @IsNumber({},{message:"Gia ve phai la so"})
    @ApiProperty()
    gia_ve:number;
}