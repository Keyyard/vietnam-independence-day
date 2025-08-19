import React from 'react';

type Layer = {
  id: string;
  name?: string;
  src?: string;
  visible: boolean;
  hue: number;
  brightness: number;
  saturate: number;
};

export default function LayerItem({ layer, onToggle }:{layer:Layer; onToggle:(id:string)=>void}){
  return (
    <div className="flex items-center space-x-2 p-2 card">
      {layer.src ? (
        <img src={layer.src} alt={layer.name ?? layer.id} className="w-8 h-8 object-contain thumb" />
      ) : (
        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">None</div>
      )}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="font-medium truncate">{layer.name ?? layer.id}</div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={layer.visible} onChange={()=>onToggle(layer.id)} />
          </div>
        </div>
      </div>
    </div>
  );
}
