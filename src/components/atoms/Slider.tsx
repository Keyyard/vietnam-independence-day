import React from 'react';

type Props = {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
};

export default function Slider({ label, min = 0, max = 360, step = 1, value, onChange }: Props) {
  return (
    <div className="flex flex-col space-y-1 text-sm">
      {label && <label className="text-gray-700">{label}</label>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="text-xs text-gray-500">{value}</div>
    </div>
  );
}
