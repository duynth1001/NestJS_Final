import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UploadDTO } from "./upload.dto";

export class UpdatePhimDto extends UploadDTO {
    @ApiProperty()
    @IsNotEmpty()
    ma_phim: number
}