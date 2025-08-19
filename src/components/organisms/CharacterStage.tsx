import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';

export type LayerState = {
  id: string;
  name?: string;
  src: string;
  visible: boolean;
  hue: number;
  brightness: number;
  saturate: number;
};

type Props = {
  size?: number;
  layers: LayerState[];
};

export type CharacterStageHandle = {
  exportPNG: () => Promise<string>;
};

const CharacterStage = forwardRef<CharacterStageHandle, Props>(({ size = 256, layers }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // displaySize is the pixel size used for on-screen preview (kept small on phones)
  const [displaySize, setDisplaySize] = useState<number>(size);

  useEffect(() => {
    function update() {
      const isSmall = typeof window !== 'undefined' && window.innerWidth < 768;
      setDisplaySize(isSmall ? Math.min(200, size) : size);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [size]);

  // explicit order (bottom -> top): background, base, shoes, pants, shirt, mouth, nose, piercing, eyes, eyebrow
  const orderedIds = React.useMemo<string[]>(() => ['background', 'base', 'hair', 'shoes', 'pants', 'shirt', 'mouth', 'nose', 'piercing', 'eyes', 'eyebrow'], []);

  useImperativeHandle(ref, () => ({
    exportPNG: async () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

  const orderedLayers = orderedIds
        .map(id => layers.find(l => l.id === id))
        .filter(Boolean) as LayerState[];

      for (const layer of orderedLayers) {
        if (!layer.visible) continue;
        if (!layer.src) continue;
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            ctx.save();
            ctx.filter = `hue-rotate(${layer.hue}deg) brightness(${layer.brightness}) saturate(${layer.saturate})`;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.restore();
            resolve();
          };
          img.onerror = (e) => reject(e);
          img.src = layer.src;
        });
      }

      return canvas.toDataURL('image/png');
    }
  }), [layers, size, orderedIds]);

  // render layers in the same explicit order so background is underneath
  const renderOrder = orderedIds
    .map(id => layers.find(l => l.id === id))
    .filter(Boolean) as LayerState[];

  return (
    <div ref={containerRef} className={`bg-white relative mx-auto`} style={{ width: displaySize, height: displaySize }}>
      {renderOrder.map((layer, idx) => {
        if (!layer.src || !layer.visible) return null;
        return (
          <img
            key={layer.id}
            src={layer.src}
            alt={layer.name ?? layer.id}
            style={{
              filter: `hue-rotate(${layer.hue}deg) brightness(${layer.brightness}) saturate(${layer.saturate})`,
              zIndex: idx + 1,
            }}
            className="absolute inset-0 w-full h-full object-contain"
          />
        );
      })}
    </div>
  );
});

CharacterStage.displayName = 'CharacterStage';

export default CharacterStage;
