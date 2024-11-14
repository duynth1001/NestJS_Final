import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BookTicketDto } from "./dto/book-ticket.dto";
import { Response } from "express";
import { DatVeService } from "./DatVe.service";
import { AuthGuard } from "src/Auth/auth.guard";

@ApiTags("QuanLyDatVe")
@ApiBearerAuth('JWT-auth')
@Controller("QuanLyDatVe")
export class DatVeController{
    constructor(
        private readonly datVeService:DatVeService
    ){}

    //api dat ve
    @UseGuards(AuthGuard)
    @Post("/DatVe")
    async DatVe(
        @Body() bookTicketDto:BookTicketDto,
        @Res() res:Response<BookTicketDto>
    ):Promise<Response<BookTicketDto>>{
            let newBookingTicket = await this.datVeService.DatVe(bookTicketDto);
            return res.status(HttpStatus.CREATED).json(newBookingTicket);
    }

  
}