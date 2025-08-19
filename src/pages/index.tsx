import React, { useMemo, useRef, useState } from 'react';
import CharacterStage, { LayerState, CharacterStageHandle } from '../components/organisms/CharacterStage';
import Sidebar from '../components/organisms/Sidebar';
import EditorBoard from '../components/organisms/EditorBoard';
import { factors } from '../data/factors';

export default function Home() {
  const defaultLayers: LayerState[] = useMemo(() => {
    // build initial layers from factors list; choose first non-empty asset (usually the second entry) so defaults aren't 'None'
    return factors.map(f => {
      const firstNonEmpty = f.assets.find(a => a.src) ?? f.assets[0];
      return {
        id: f.id,
        name: firstNonEmpty?.name ?? f.label ?? f.id,
        src: firstNonEmpty?.src ?? '',
        visible: true,
        hue: 0,
        brightness: 1,
        saturate: 1,
      } as LayerState;
    });
  }, []);

  const [layers, setLayers] = useState<LayerState[]>(defaultLayers);
  const stageRef = useRef<CharacterStageHandle | null>(null);
  const [selectedFactor, setSelectedFactor] = useState<string | null>('hair');

  function toggle(id: string) {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  }
  function change(id: string, patch: Partial<LayerState>) {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
  }

  async function exportPNG() {
    if (!stageRef.current) return;
    const dataUrl = await stageRef.current.exportPNG();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'avatar.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Ensure a layer exists for the given factor id. If missing, add a default entry
  function ensureLayerExists(factorId: string) {
    setLayers(prev => {
      if (prev.find(l => l.id === factorId)) return prev;
      const fac = factors.find(f => f.id === factorId);
      const firstNonEmpty = fac?.assets.find(a => a.src) ?? fac?.assets[0];
      const newLayer: LayerState = {
        id: factorId,
        name: firstNonEmpty?.name ?? fac?.label ?? factorId,
        src: firstNonEmpty?.src ?? '',
        visible: true,
        hue: 0,
        brightness: 1,
        saturate: 1,
      };
      // insert new layer in the same order as factors
      const factorOrder = factors.map(f => f.id);
      const newArr: LayerState[] = [];
      for (const fid of factorOrder) {
        const existing = prev.find(p => p.id === fid);
        if (existing) newArr.push(existing);
        else if (fid === factorId) newArr.push(newLayer);
      }
      // include any others that might exist but not in the factors list
      for (const p of prev) if (!newArr.find(n => n.id === p.id)) newArr.push(p);
      return newArr;
    });
  }

  return (
  <div className=" flex flex-col items-center justify-start p-12 md:p-8">
      <div className="w-full flex justify-center mb-6">
        <div className="heading-wrap">
                <h1 className="font-title heading-back text-lg heading-xl text-[var(--theme-muted)]">Happy Vietnam Independence Day</h1>
                <h1 className="font-title heading-front text-lg heading-xl text-[var(--theme-primary)]">Happy Vietnam Independence Day</h1>
        </div>
      </div>
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 justify-center w-full max-w-5xl px-2 md:px-0">
        <main className="w-full md:w-2/3 flex items-start justify-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg card">
            <div className="bg-white p-4 rounded-md shadow-inner mx-auto">
              <CharacterStage ref={stageRef} layers={layers} size={356} />
            </div>
          </div>
        </main>

  <aside className="md:w-1/3 flex flex-col gap-3 mx-auto">
          <Sidebar layers={layers} onToggle={toggle} onChange={change} selectedFactor={selectedFactor} onSelectFactor={(id)=>{ console.log('selectFactor ->', id); if(!id) { setSelectedFactor(null); return; } ensureLayerExists(id); setSelectedFactor(id); }} />
          <EditorBoard layer={layers.find(l=>l.id===selectedFactor) ?? null} onChange={(patch)=>{ if(!selectedFactor) return; change(selectedFactor, patch); }} />

          <div className="p-4">
            <button onClick={exportPNG} className="w-full btn-primary">Download PNG</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
