// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { DashboardLayout } from './layouts/DashboardLayout';
import { TacticalBoard } from './features/tactical-board/components/TacticalBoard';
import { StudentsPage } from './pages/students/StudentsPage';

// Un componente "Mock" temporal para el Portal de Resultados
const PublicPortal = () => (
  <div className="min-h-screen bg-white text-center p-20">
    <h1 className="text-5xl font-extrabold text-blue-900 mb-6">Resultados CVNetSports</h1>
    <p className="text-xl text-slate-600 mb-10">NBA • Champions League • LigaPro Ecuador</p>
    <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700">
      Acceso para Academias
    </a>
  </div>
);

// Un componente temporal para la vista general del Dashboard
const DashboardHome = () => (
  <div>
    <h1 className="text-3xl font-bold text-slate-800 mb-6">Panel de Control</h1>
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-slate-500 font-medium">Estudiantes Activos</h3>
        <p className="text-4xl font-bold text-blue-600 mt-2">124</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-slate-500 font-medium">Entrenadores</h3>
        <p className="text-4xl font-bold text-emerald-600 mt-2">5</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<PublicPortal />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Protegidas (SaaS B2B) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Al entrar a /dashboard carga DashboardHome */}
          <Route index element={<DashboardHome />} />
          
          {/* Al entrar a /dashboard/tactical carga nuestra Pizarra */}
          <Route path="tactical" element={<TacticalBoard />} />
          
          {/* Futuras rutas: students, billing, etc */}
          <Route path="students" element={<StudentsPage />} />
        </Route>

        {/* Si escriben una URL que no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;