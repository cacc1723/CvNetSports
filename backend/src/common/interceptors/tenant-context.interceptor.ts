import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantContextManager } from '../context/tenant-context';

@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Inyectado por JwtAuthGuard -> JwtStrategy

    // Si no hay usuario autenticado o no tiene tenantId (ej: SuperAdmin global o ruta pública)
    // continuamos sin establecer contexto.
    if (!user || !user.tenantId) {
      return next.handle();
    }

    // Si hay tenantId, envolvemos la ejecución del controlador en el contexto
    return TenantContextManager.run(user.tenantId, () => {
      return next.handle();
    });
  }
}