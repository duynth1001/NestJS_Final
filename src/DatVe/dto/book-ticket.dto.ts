import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class BookTicketDto{
    @IsNotEmpty({message:"Tai khoan khong duoc de trong"})
    @IsNumber({},{message:"Tai khoan phai la so"})
    @ApiProperty()
    tai_khoan:number;
    
    @IsNotEmpty({message:"Ma lich chieu khong duoc de trong"})
    @IsNumber({},{message:"Ma lich chieu phai la so"})
    @IsNumber()
    @ApiProperty()
    ma_lich_chieu:number;
    
    @IsNotEmpty({message:"Ma ghe khong duoc de trong"})
    @IsNumber({},{message:"Ma ghe phai la so"})
    @IsNumber()
    @ApiProperty()
    ma_ghe:number;
}