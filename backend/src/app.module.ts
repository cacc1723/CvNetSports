import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { IamModule } from './modules/iam/iam.module';
import { PrismaModule } from './database/prisma.module';
import { TenantContextInterceptor } from './common/interceptors/tenant-context.interceptor';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'; // Crear un Guard simple que extienda AuthGuard('jwt')
import { RolesGuard } from './common/guards/roles.guard';
import { StudentsModule } from './modules/students/students.module'; // Importa el nuevo módulo

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    IamModule,
    StudentsModule,
    // TacticalModule, UsersModule, etc.
  ],
  providers: [
    // 1. Validar Token JWT globalmente
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Nota: Necesitarás un decorador @Public() para login/registro
    },
    // 2. Validar Roles
    {
        provide: APP_GUARD,
        useClass: RolesGuard,
    },
    // 3. Inyectar Tenant Context para Prisma
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantContextInterceptor,
    },
  ],
})
export class AppModule {}