import { ApiProperty } from "@nestjs/swagger";
import {    IsNotEmpty, IsNumber, Matches, Min } from "class-validator";

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
    @ApiProperty()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/, {
        message: 'Ngay gio chieu phai o dinh dang dd/mm/yyyy ',
      })
    ngay_gio_chieu:string;

    @IsNotEmpty({message:"Gia ve khong duoc de trong"})
    @IsNumber({},{message:"Gia ve phai la so"})
    @Min(100000,{message:"Gia ve phai lon hon 100000"})
    @ApiProperty()
    gia_ve:number;
}