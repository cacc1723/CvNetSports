// backend/src/modules/tactical/tactical.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePlayDto } from './dto/create-play.dto';

@Injectable()
export class TacticalService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreatePlayDto) {
    return this.prisma.getTenantClient().tacticalPlay.create({
      data: {
        title: dto.title,
        canvasData: dto.canvasData,
        creatorId: userId,
      },
    });
  }

  async findAll() {
    return this.prisma.getTenantClient().tacticalPlay.findMany();
  }
}