// frontend/src/features/tactical-board/types/board.types.ts

// Definimos las herramientas disponibles
export type ToolType = 'select' | 'player_home' | 'player_away' | 'ball' | 'arrow' | 'eraser';

// Dimensiones de la pizarra
export interface BoardDimensions {
  width: number;
  height: number;
}

// Colores por defecto para los equipos y dibujos
export const COLORS = {
  HOME_TEAM: '#EF4444', // Rojo
  AWAY_TEAM: '#3B82F6', // Azul
  BALL: '#FFFFFF',      // Blanco
  ARROW: '#FBBF24',     // Amarillo
};