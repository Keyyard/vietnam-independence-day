import React from 'react';
import { LayerState } from '../organisms/CharacterStage';

export default function LayerItem({ layer, onToggle, onSelect }:{layer:Partial<LayerState> & {id:string}; onToggle:(id:string)=>void; onSelect?: (id:string)=>void}){
  return (
    <div className="flex items-center space-x-2 p-2 card">
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white">
        <img src={layer.src} alt={layer.name ?? layer.id} className="max-w-full max-h-full object-contain thumb" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="font-medium truncate max-w-[140px]">{layer.name ?? layer.id}</div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={layer.visible} onChange={()=>onToggle(layer.id)} />
            <button className="btn-outline text-xs" onClick={()=>onSelect?.(layer.id)}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
