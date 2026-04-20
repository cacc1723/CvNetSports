CVNetSports SaaS 🏆
Plataforma SaaS para la gestión administrativa y táctica de academias deportivas.
🚀 Inicio Rápido (Setup para Desarrolladores)
Este proyecto utiliza Docker para unificar el entorno de desarrollo. Sigue estos pasos para levantar el sistema:

1. Prerrequisitos
   Docker Desktop instalado y corriendo.
   Node.js v20+ instalado.
2. Clonar y preparar
   code
   Bash
   git clone https://github.com/cacc1723/CvNetSports.git
   cd CvNetSports

# Crear archivos de entorno (ejemplos)

3. Levantar la infraestructura
   code
   Bash
   docker-compose up --build -d

4. Sincronizar Base de Datos
   Cada vez que se añadan modelos nuevos al esquema de Prisma, corre esto desde la carpeta backend:
   code
   Bash
   cd backend
   npx prisma db push

🛠️ Stack Tecnológico
Backend: NestJS (TypeScript) + Prisma ORM + PostgreSQL.
Frontend: React (Vite) + Tailwind CSS + Fabric.js.
Infraestructura: Docker & Docker Compose.

🏗️ Flujo de Trabajo (GitFlow)
Nunca hagas commit a main.
Crea una rama para tu tarea: git checkout -b feature/nombre-de-la-tarea.
Al terminar, sube tu rama: git push origin feature/nombre-de-la-tarea.
Abre un Pull Request en GitHub y asigna al otro miembro del equipo para revisión.
Una vez aprobado y testeado, se hace merge a main.

📁 Estructura del Proyecto
/backend: API REST en NestJS.
/frontend: SPA en React.
docker-compose.yml: Orquestación de servicios.

💡 ¿Necesitas ayuda?
Si el backend no conecta a la BD, revisa el DATABASE_URL en tu .env.
Si el frontend no carga estilos, asegúrate de haber ejecutado npm install en la carpeta frontend.
