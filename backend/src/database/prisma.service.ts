import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TenantContextManager } from '../common/context/tenant-context';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Método Factory para obtener un cliente "seguro" con Scope de Tenant
  getTenantClient() {
    return this.$extends({
      query: {
        $allModels: {
          async findMany({ args, query }) {
            const tenantId = TenantContextManager.getTenantId();
            if (tenantId) {
              // Inyectamos el filtro automáticamente
              args.where = { ...args.where, tenantId };
            }
            return query(args);
          },
          async findFirst({ args, query }) {
            const tenantId = TenantContextManager.getTenantId();
            if (tenantId) {
              args.where = { ...args.where, tenantId };
            }
            return query(args);
          },
          async create({ args, query }) {
            const tenantId = TenantContextManager.getTenantId();
            if (tenantId) {
              // Asignamos el tenant automáticamente al crear
              (args.data as any).tenantId = tenantId;
            }
            return query(args);
          },
          // NOTA: Implementar también para update, delete, count, etc.
        },
      },
    });
  }
}