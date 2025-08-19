import React from 'react';
import Slider from '../atoms/Slider';
import { LayerState } from './CharacterStage';
import { useLocale } from '../../i18n/LocaleContext';

export default function EditorBoard({ layer, onChange }:{layer:LayerState | null; onChange:(patch:Partial<LayerState>)=>void}){
  const { t } = useLocale();
  if (!layer) return (
    <div className="w-80 p-4 card">{t('select_trait')}</div>
  );

  return (
    <div className="w-80 p-4 card space-y-3">
  <h4 className="font-semibold text-sm">{t('editing')}: {layer.name ?? layer.id}</h4>
      <div>
        <Slider label={t('hue')} min={0} max={360} value={layer.hue} onChange={(v)=>onChange({hue:v})} />
      </div>
      <div>
        <label className="block text-sm text-gray-600">{t('brightness')}</label>
        <input className="w-full" type="range" min={0.5} max={1.5} step={0.01} value={layer.brightness} onChange={(e)=>onChange({brightness: Number(e.target.value)})} />
      </div>
      <div>
        <label className="block text-sm text-gray-600">{t('saturate')}</label>
        <input className="w-full" type="range" min={0} max={2} step={0.01} value={layer.saturate} onChange={(e)=>onChange({saturate: Number(e.target.value)})} />
      </div>
    </div>
  );
}
