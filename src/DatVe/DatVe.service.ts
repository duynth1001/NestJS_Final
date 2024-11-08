import { Injectable } from "@nestjs/common";
import { BookTicketDto } from "./dto/book-ticket.dto";
import { PrismaClient } from "@prisma/client";
import { plainToClass } from "class-transformer";

@Injectable()
export class DatVeService{
    prisma = new PrismaClient();
async DatVe(bookTicketDto:BookTicketDto){
    try {
        let newTicketBooking = await this.prisma.datVe.create({
            data:bookTicketDto
        })
        return plainToClass(BookTicketDto,newTicketBooking);
    } catch (error) {
        throw new Error(error)
    }
}
}