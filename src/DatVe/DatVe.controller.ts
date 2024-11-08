import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BookTicketDto } from "./dto/book-ticket.dto";
import { Response } from "express";
import { DatVeService } from "./DatVe.service";

@ApiTags("QuanLyDatVe")
@Controller("QuanLyDatVe")
export class DatVeController{
    constructor(
        private readonly datVeService:DatVeService
    ){}
    @Post("/DatVe")
    async DatVe(
        @Body() bookTicketDto:BookTicketDto,
        @Res() res:Response<BookTicketDto>
    ){
        let newBookingTicket = await this.datVeService.DatVe(bookTicketDto);
        return res.status(HttpStatus.CREATED).json(newBookingTicket);
    }

    @Get("/DatVe")
    async getTest(
        @Res() res:Response
    ){
        return res.status(HttpStatus.OK).json("Hello");
    }
}