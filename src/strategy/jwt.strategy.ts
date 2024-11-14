import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KeyService } from 'src/key/key.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        config: ConfigService,
        keyService: KeyService
    ) {
        const publicKey = keyService.getPublicKey();
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: publicKey,
            algorithms: ['RS256']
        });
    }

}