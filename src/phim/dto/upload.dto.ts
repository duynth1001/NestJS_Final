import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UploadDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ten_phim: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    trailer: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mo_ta: string

    @ApiProperty({ description: "mm/dd/yyyy" })
    @IsString()
    @IsNotEmpty()
    ngay_khoi_chieu: string

    @ApiProperty()
    @IsNotEmpty()
    danh_gia: number

    @ApiProperty()
    hot: boolean

    @ApiProperty()
    dang_chieu: boolean

    @ApiProperty()
    sap_chieu: boolean

    @ApiProperty({
        type: "string", format: "binary"
    })
    hinh_anh: any
}





export class FileUploadDto {
    @ApiProperty({type: 'string', format: 'binary'})
    hinhAnh: any;
  }
  
  // define Dto up nhiều hình
  
  export class FilesUploadDto {
    @ApiProperty({type: 'array', items: { type: 'string', format: 'binary'}})
    hinhAnh: any[];
  }