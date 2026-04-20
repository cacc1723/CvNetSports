import { MousePointer2, Trash2, RotateCcw, Save, MoveRight } from 'lucide-react';
import type { ToolType } from '../types/board.types';

interface ToolbarProps {
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
  onAddPlayerHome: () => void;
  onAddPlayerAway: () => void;
  onAddBall: () => void;
  onDeleteSelected: () => void;
  onClear: () => void;
  onSave: () => void;
}

export const Toolbar = (props: ToolbarProps) => {
    // Función helper para clases CSS de estado activo
    const getBtnClass = (toolName: ToolType) => {
      const base = "p-3 rounded-lg transition-colors flex flex-col items-center gap-1 text-sm font-medium w-full";
      return props.activeTool === toolName 
        ? `${base} bg-blue-100 text-blue-700 border border-blue-300 shadow-sm` 
        : `${base} text-slate-700 hover:bg-slate-100 border border-transparent`;
    };
  
    const actionBtnClass = "p-3 rounded-lg hover:bg-slate-100 transition-colors flex flex-col items-center gap-1 text-sm font-medium text-slate-700 w-full";
  
    return (
      <div className="flex flex-col gap-3 p-3 bg-white border-r border-slate-200 h-full w-28 overflow-y-auto shadow-sm z-10">
        
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-1">Cursor</span>
        
        {/* Herramienta: Selección */}
        <button className={getBtnClass('select')} onClick={() => props.onToolSelect('select')}>
          <MousePointer2 size={22} />
          <span>Mover</span>
        </button>
  
        {/* Herramienta: Flecha */}
        <button className={getBtnClass('arrow')} onClick={() => props.onToolSelect('arrow')}>
          <MoveRight size={22} className="text-yellow-500" />
          <span>Flecha</span>
        </button>
  
        <div className="w-full h-px bg-slate-200 my-2"></div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-1">Fichas</span>
  
        {/* Agregar Jugadores y Balón */}
        <button className={actionBtnClass} onClick={props.onAddPlayerHome}>
          <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-md"></div>
          <span>Local</span>
        </button>
  
        <button className={actionBtnClass} onClick={props.onAddPlayerAway}>
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
          <span>Visita</span>
        </button>
  
        <button className={actionBtnClass} onClick={props.onAddBall}>
          <div className="w-4 h-4 rounded-full bg-white border-2 border-slate-800 shadow-md"></div>
          <span>Balón</span>
        </button>
  
        <div className="w-full h-px bg-slate-200 my-2"></div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-1">Acciones</span>
  
        {/* Eliminar y Limpiar */}
        <button className={`${actionBtnClass} text-red-600 hover:bg-red-50`} onClick={props.onDeleteSelected}>
          <Trash2 size={22} />
          <span>Borrar</span>
        </button>
  
        <button className={actionBtnClass} onClick={props.onClear}>
          <RotateCcw size={22} />
          <span>Limpiar</span>
        </button>
  
        <div className="flex-grow"></div>
  
        {/* Guardar */}
        <button className="p-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex flex-col items-center gap-1 text-sm font-medium w-full shadow-md" onClick={props.onSave}>
          <Save size={22} />
          <span>Guardar</span>
        </button>
      </div>
    );
  };