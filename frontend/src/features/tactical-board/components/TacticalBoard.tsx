import { useFabricBoard } from '../hooks/useFabricBoard';
import { Toolbar } from './Toolbar';
// TacticalBoard.tsx
import axios from 'axios';
import { useAuthStore } from '../../../store/authStore';

export const TacticalBoard = () => {
  const {
    canvasRef,
    activeTool,
    setActiveTool,
    addPlayer,
    addBall,
    deleteSelected,
    clearBoard,
    getJsonData
  } = useFabricBoard({});

  const token = useAuthStore((state) => state.token);

  const handleSave = async () => {const dataJson = getJsonData();
    if (!dataJson) return;
  
    try {
      await axios.post('http://localhost:3000/tactical', {
        title: "Nueva Jugada Táctica",
        canvasData: JSON.parse(dataJson)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("¡Jugada guardada con éxito en tu Academia!");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar la jugada");
    }
  };

  return (
    <div className="flex h-[600px] w-full max-w-6xl mx-auto bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Barra Lateral */}
      <Toolbar 
        activeTool={activeTool}
        onToolSelect={setActiveTool}
        onAddPlayerHome={() => addPlayer('home')}
        onAddPlayerAway={() => addPlayer('away')}
        onAddBall={addBall}
        onDeleteSelected={deleteSelected}
        onClear={clearBoard}
        onSave={handleSave}
      />

      {/* Área del Canvas */}
      <div className="flex-1 flex items-center justify-center bg-slate-200/50 p-8">
        {/* El wrapper es importante para sombras y bordes sin afectar el canvas interno */}
        <div className="border-4 border-red-500 w-[800px] h-[500px]">
    <canvas ref={canvasRef} />
</div>
      </div>
    </div>
  );
};