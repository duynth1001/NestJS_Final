import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from"@nestjs/jwt";
import { KeyModule } from "src/key/key.module";
import { JwtStrategy } from "src/strategy/jwt.strategy";

@Module({
    imports:[JwtModule.register({}),KeyModule],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy]
})
export class AuthModule{}