import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInDto{
    @IsNotEmpty({message:"Email khong duoc de trong"})
    @ApiProperty()
    email:string;

    @IsNotEmpty({message:"Mat khau khong duoc de trong"})
    @ApiProperty()
    mat_khau:string;
}