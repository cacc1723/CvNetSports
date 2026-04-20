import { useEffect, useRef, useState, useCallback } from 'react';
import * as fabric from 'fabric';
import type { ToolType } from '../types/board.types';
import { COLORS } from '../types/board.types';
import futbol from '../../../assets/futbol.jpg'

interface UseFabricBoardProps {
  initialDataJson?: string;
  onSave?: (json: string) => void;
}

export const useFabricBoard = ({ initialDataJson }: UseFabricBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  
  // Estado de la herramienta actual
  const [activeTool, setActiveTool] = useState<ToolType>('select');

  // Referencias mutables para el dibujo en tiempo real
  const isDrawing = useRef(false);
  const currentLine = useRef<fabric.Line | null>(null);
  const currentArrowhead = useRef<fabric.Triangle | null>(null);

  // 1. Inicialización
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = 800;
    canvasRef.current.height = 500;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      selection: true,
    });

    fabricRef.current = canvas;
        // FORZAMOS dimensiones AQUÍ, esto sobreescribe cualquier 1200x750
    canvas.setDimensions({ width: 800, height: 500 });
    //canvas.backgroundColor = '#22c55e'; // Verde de prueba

    // Reemplaza desde la línea 40 hasta la 47 por esto:
    fabric.Image.fromURL(futbol).then((img) => {
      // 1. Calculamos matemáticamente la escala exacta
    const scaleX = 800 / (img.width || 1);
    const scaleY = 500 / (img.height || 1);

    // 2. Aplicamos la escala y el origen al objeto imagen
    img.set({
        scaleX: scaleX,
        scaleY: scaleY,
        originX: 'left',
        originY: 'top'
    });

    // 3. La asignamos como fondo
    canvas.backgroundImage = img;
    canvas.requestRenderAll();
}).catch((err) => {
    console.error("Error al cargar la imagen:", err);
    });

    if (initialDataJson) {
      canvas.loadFromJSON(initialDataJson, () => canvas.renderAll());
    }

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []);

  // 2. Lógica de Cambio de Herramienta
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Si la herramienta NO es 'select', desactivamos la selección de objetos
    // para que al intentar dibujar no movamos a un jugador por error.
    const isSelectMode = activeTool === 'select';
    canvas.selection = isSelectMode;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = isSelectMode;
      obj.evented = isSelectMode;
    });

  }, [activeTool]);

  // 3. Eventos de Ratón (Dibujo de Flechas)
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const handleMouseDown = (o: fabric.IEvent) => {
      if (activeTool !== 'arrow') return;
      isDrawing.current = true;
      const pointer = canvas.getPointer(o.e);
      const points = [pointer.x, pointer.y, pointer.x, pointer.y];

      // Creamos la línea
      currentLine.current = new fabric.Line(points, {
        strokeWidth: 3,
        fill: COLORS.ARROW,
        stroke: COLORS.ARROW,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });

      // Creamos la punta de la flecha (Triángulo)
      currentArrowhead.current = new fabric.Triangle({
        width: 15,
        height: 15,
        fill: COLORS.ARROW,
        left: pointer.x,
        top: pointer.y,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });

      canvas.add(currentLine.current, currentArrowhead.current);
    };

    const handleMouseMove = (o: fabric.IEvent) => {
      if (!isDrawing.current || !currentLine.current || !currentArrowhead.current) return;
      
      const pointer = canvas.getPointer(o.e);
      
      // Actualizamos el final de la línea
      currentLine.current.set({ x2: pointer.x, y2: pointer.y });
      
      // Actualizamos la posición de la punta
      currentArrowhead.current.set({ left: pointer.x, top: pointer.y });

      // MATEMÁTICAS: Calcular el ángulo de rotación de la punta
      const dx = pointer.x - (currentLine.current.x1 || 0);
      const dy = pointer.y - (currentLine.current.y1 || 0);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Sumamos 90 porque el triángulo de Fabric apunta hacia arriba por defecto
      currentArrowhead.current.set({ angle: angle + 90 });

      canvas.renderAll();
    };

    const handleMouseUp = () => {
      if (activeTool !== 'arrow') return;
      isDrawing.current = false;

      // Opcional: Agrupar la línea y el triángulo para que se comporten como un solo objeto
      if (currentLine.current && currentArrowhead.current) {
        // En una app más avanzada, aquí crearías un fabric.Group. 
        // Para este MVP, los dejamos separados pero los marcamos como 'arrow_part'
        (currentLine.current as any).type = 'arrow_line';
        (currentArrowhead.current as any).type = 'arrow_head';
      }

      // Limpiamos referencias
      currentLine.current = null;
      currentArrowhead.current = null;
      
      // Auto-volvemos a la herramienta de selección tras dibujar una flecha (Mejor UX)
      setActiveTool('select');
    };

    // Adjuntar eventos
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    // Cleanup de eventos al cambiar de herramienta o desmontar
    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [activeTool]);

  // ... (Mantenemos addPlayer, addBall, deleteSelected, clearBoard, getJsonData igual que antes)
  
  const addPlayer = useCallback((type: 'home' | 'away') => { /* ... código anterior ... */ }, []);
  const addBall = useCallback(() => { /* ... código anterior ... */ }, []);
  const deleteSelected = useCallback(() => { /* ... código anterior ... */ }, []);
  const clearBoard = useCallback(() => { /* ... código anterior ... */ }, []);
  const getJsonData = useCallback(() => { /* ... código anterior ... */ }, []);

  return {
    canvasRef,
    activeTool,
    setActiveTool,
    addPlayer,
    addBall,
    deleteSelected,
    clearBoard,
    getJsonData
  };
};