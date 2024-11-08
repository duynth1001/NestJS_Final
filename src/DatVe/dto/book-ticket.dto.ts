import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class BookTicketDto{
    @IsNotEmpty({message:"Tai khoan khong duoc de trong"})
    @IsNumber()
    @ApiProperty()
    tai_khoan:number;
    
    @IsNotEmpty({message:"Ma lich chieu khong duoc de trong"})
    @IsNumber()
    @ApiProperty()
    ma_lich_chieu:number;
    
    @IsNotEmpty({message:"Ma ghe khong duoc de trong"})
    @IsNumber()
    @ApiProperty()
    ma_ghe:number;
}