import { AsyncLocalStorage } from 'async_hooks';

// Almacén estático para el contexto de la solicitud actual
export const tenantContext = new AsyncLocalStorage<{ tenantId: string }>();

export class TenantContextManager {
  // Obtener el Tenant ID actual
  static getTenantId(): string | undefined {
    const store = tenantContext.getStore();
    return store?.tenantId;
  }

  // Ejecutar código dentro del contexto del tenant
  static run<T>(tenantId: string, callback: () => T): T {
    return tenantContext.run({ tenantId }, callback);
  }
}