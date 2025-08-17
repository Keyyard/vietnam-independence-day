import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { factors } from '../../data/factors';

export type LayerState = {
  id: string;
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

const CharacterStage = forwardRef<CharacterStageHandle, Props>(({ size = 512, layers }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    exportPNG: async () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      // draw background white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

  // strict order: background first, base second, then the rest in factors order
  const order = factors.map(f => f.id).filter(id => id !== 'background' && id !== 'base');
  const orderedIds = ['background', 'base', ...order];
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
  }), [layers, size]);

  // render layers in the same strict order so background is underneath
  const renderOrder = (() => {
    const order = factors.map(f => f.id).filter(id => id !== 'background' && id !== 'base');
    const orderedIds = ['background', 'base', ...order];
    return orderedIds
      .map(id => layers.find(l => l.id === id))
      .filter(Boolean) as LayerState[];
  })();

  return (
    <div ref={containerRef} className={`bg-white relative`} style={{ width: size, height: size }}>
      {renderOrder.map((layer, idx) => {
        if (!layer.src || !layer.visible) return null;
        return (
          <img
            key={layer.id}
            src={layer.src}
            alt={layer.id}
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
