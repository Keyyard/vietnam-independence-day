import React from 'react';

type Layer = {
  id: string;
  name: string;
  src: string;
  visible: boolean;
  hue: number;
  brightness: number;
  saturate: number;
};

export default function LayerItem({ layer, onToggle, onSelect }:{layer:Layer; onToggle:(id:string)=>void; onSelect?: (id:string)=>void}){
  return (
    <div className="flex items-center space-x-2 p-2 card">
      <img src={layer.src} alt={layer.name} className="w-12 h-12 object-contain thumb" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="font-medium">{layer.name}</div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={layer.visible} onChange={()=>onToggle(layer.id)} />
            <button className="btn-outline text-xs" onClick={()=>onSelect?.(layer.id)}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
