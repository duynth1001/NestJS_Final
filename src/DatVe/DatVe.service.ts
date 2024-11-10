import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { BookTicketDto } from "./dto/book-ticket.dto";
import { PrismaClient } from "@prisma/client";
import { plainToClass } from "class-transformer";

@Injectable()
export class DatVeService{
    prisma = new PrismaClient();
async DatVe(bookTicketDto:BookTicketDto){
    try {
        //check if exist in NguoiDung
        let taikhoan = await this.prisma.nguoiDung.findFirst({
            where:{
                tai_khoan:Number(bookTicketDto.tai_khoan)
            }
        })
        if (!taikhoan) {
            throw new NotFoundException(`Không tìm thấy người dùng với tài khoản:${bookTicketDto.tai_khoan}`)
        }
        
        //check if exist in LichChieu
        let malichchieu = await this.prisma.lichChieu.findFirst({
            where:{
                ma_lich_chieu:Number(bookTicketDto.ma_lich_chieu)
            }
        })
        if (!malichchieu) {
            throw new NotFoundException(`Không tìm thấy lịch chiếu với mã lịch chiếu:${bookTicketDto.ma_lich_chieu}`)
        }
        let newTicketBooking = await this.prisma.datVe.create({
            data:bookTicketDto
        })
        return plainToClass(BookTicketDto,newTicketBooking);
    } catch (error) {
        // Re-throw the error if it's already an HttpException
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