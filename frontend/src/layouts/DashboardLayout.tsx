// frontend/src/layouts/DashboardLayout.tsx
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LayoutDashboard, Users, Presentation, LogOut } from 'lucide-react';

export const DashboardLayout = () => {
  const { token, user, logout } = useAuthStore();

  // Protección de Ruta: Si no hay token, lo pateamos al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 bg-slate-950 font-bold text-xl tracking-wider">
          CVNetSports
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} /> Resumen
          </Link>
          <Link to="/dashboard/students" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
            <Users size={20} /> Estudiantes
          </Link>
          <Link to="/dashboard/tactical" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
            <Presentation size={20} /> Pizarra Táctica
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="text-sm font-medium mb-4 text-slate-400">
            Usuario: {user?.fullName || 'Admin'}
            <br/>
            Rol: <span className="text-blue-400 text-xs">{user?.role}</span>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors w-full"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Aquí se renderizarán las sub-páginas (Resumen, Pizarra, etc) */}
        <Outlet />
      </main>
    </div>
  );
};