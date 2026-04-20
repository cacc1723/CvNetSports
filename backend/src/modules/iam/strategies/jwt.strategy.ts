import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Interfaz del Payload decodificado
export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  tenantId?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'super-secret-key-change-me',
    });
  }

  async validate(payload: JwtPayload) {
    // Lo que retornemos aquí se inyectará en `req.user`
    return { 
      id: payload.sub, 
      email: payload.email, 
      role: payload.role,
      tenantId: payload.tenantId 
    };
  }
}