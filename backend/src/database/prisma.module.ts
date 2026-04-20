import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Lo hacemos global para no tener que importarlo en cada módulo de la app
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Lo exportamos para que iam.module.ts pueda usarlo
})
export class PrismaModule {}