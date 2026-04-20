import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.getTenantClient().student.findMany();
  }

  async create(data: { firstName: string; lastName: string; birthDate: Date }) {
    // Cast a 'any' para ignorar la validación de TS sobre el tenantId obligatorio,
    // ya que sabemos que nuestro prisma.getTenantClient() lo inyecta.
    return this.prisma.getTenantClient().student.create({
      data: {
        ...data,
        isActive: true,
      } as any, // <--- ESTE ES EL TRUCO PARA EL MVP
    });
  }
}