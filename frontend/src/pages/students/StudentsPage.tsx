import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

export const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // Fetch desde el backend
    axios.get('http://localhost:3000/students', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStudents(res.data));
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mis Estudiantes</h2>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((s: any) => (
              <tr key={s.id}>
                <td className="px-6 py-4 whitespace-nowrap">{s.firstName} {s.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${s.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {s.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};