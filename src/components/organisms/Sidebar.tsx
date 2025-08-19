import React from 'react';
import LayerItem from '../molecules/LayerItem';
import { LayerState } from './CharacterStage';
import { factors, Factor } from '../../data/factors';

type Props = {
  layers: LayerState[];
  onToggle: (id: string) => void;
  onChange: (id: string, patch: Partial<LayerState>) => void;
  selectedFactor?: string | null;
  onSelectFactor?: (id: string | null) => void;
};


export default function Sidebar({ layers, onToggle, onChange, selectedFactor = null, onSelectFactor }: Props){
  const currentFactor: Factor | undefined = factors.find(f => f.id === selectedFactor);

  return (
  <div className="w-full md:w-80 h-full card flex flex-col">
      <div className="p-3 border-b">
        <h3 className="text-lg font-semibold" style={{color: 'var(--theme-primary)'}}>Traits</h3>
      </div>
      <div className="flex flex-wrap gap-2 p-3">
        {factors.map(f => (
          <button
            key={f.id}
            onClick={() => onSelectFactor?.(f.id)}
            className={`text-sm rounded-md px-3 py-1 h-8 flex items-center justify-center ${selectedFactor === f.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ marginRight: 6 }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="p-3 overflow-auto flex-1">
        {/* If a factor is selected, show its assets as thumbnails */}
        {currentFactor ? (
          <div>
            <h4 className="text-sm font-medium mb-2">Choose {currentFactor.label}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentFactor.assets.map((a: {id:string; src:string; name?:string}) => {
                const layerForFactor = layers.find(l => l.id === currentFactor.id);
                const isSelected = layerForFactor?.src === a.src || (a.src === '' && !layerForFactor?.src);
                const handleClick = () => {
                  if (!a.src) {
                    onChange(currentFactor.id, { src: '', visible: false, name: a.name ?? 'None' });
                  } else {
                    onChange(currentFactor.id, { src: a.src, visible: true, name: a.name ?? '' });
                  }
                };
                return (
                  <div key={a.id} className="flex flex-col items-center">
                    <button onClick={handleClick} className={`thumb ${isSelected? 'selected': ''} w-28 h-28 flex items-center justify-center`} aria-pressed={isSelected}>
                      {a.src ? (
                        <img src={a.src} alt={a.name ?? a.id} className="w-full h-full object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).src='/layers/placeholder.svg'; }} />
                      ) : (
                        <svg viewBox="0 0 24 24" role="img" aria-label="None" className="none-icon w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <title>None</title>
                          <rect x="2" y="2" width="20" height="20" rx="0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.9" />
                          <path d="M7 7 L17 17 M17 7 L7 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                        </svg>
                      )}
                    </button>
                    <div className="text-xs text-gray-600 mt-1">{a.name ?? (a.src ? '' : 'None')}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {layers.map(l=> (
              <LayerItem key={l.id} layer={l} onToggle={onToggle} onSelect={(id)=>onSelectFactor?.(id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
