import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContextManager, tenantContext } from '../context/tenant-context';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // ESTRATEGIA: Leer Header (Desarrollo/Prueba)
    // En Producción: Esto se extrae del Request.user después del AuthGuard
    const tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
       // Rutas públicas o SuperAdmin podrían no tener tenant, 
       // pero por defecto protegemos.
       // next(); return; // Descomentar si hay rutas públicas sin tenant
       throw new UnauthorizedException('Tenant ID header (x-tenant-id) is missing');
    }

    // "Envolvemos" el resto de la ejecución en el contexto del Tenant
    tenantContext.run({ tenantId }, () => {
      next();
    });
  }
}