import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service'; // Usar el servicio base aquí
import { HashingService } from '../../common/services/hashing.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto'; // Asumiremos que tienes este DTO básico

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // 1. Buscar usuario (sin filtro de tenant, el email es único globalmente)
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    // 2. Validar contraseña
    const isValidPassword = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) throw new UnauthorizedException('Credenciales inválidas');

    // 3. Generar Payload del Token
    // CRÍTICO: Aquí incrustamos el tenantId y el rol
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      tenantId: user.tenantId // Si es SuperAdmin, esto será null
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName
      }
    };
  }

  // Registro simplificado para Admin de Academia
  async registerAcademyAdmin(dto: RegisterDto) {
    // Verificar duplicados
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email }});
    if (existing) throw new BadRequestException('Email ya registrado');

    const hashedPassword = await this.hashingService.hash(dto.password);

    // Crear Tenant y Usuario en una transacción
    // Nota: Esto debería ir en un caso de uso más complejo, pero para MVP:
    return this.prisma.$transaction(async (tx) => {
        const tenant = await tx.tenant.create({
            data: {
                name: dto.academyName,
                slug: dto.academySlug,
            }
        });

        const user = await tx.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                fullName: dto.fullName,
                role: 'ACADEMY_ADMIN',
                tenantId: tenant.id
            }
        });

        return { user, tenant };
    });
  }
}