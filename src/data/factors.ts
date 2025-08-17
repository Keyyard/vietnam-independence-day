export type Factor = {
  id: string;
  label: string;
  assets: { id: string; src: string; name?: string }[];
};

export const factors: Factor[] = [
  { id: 'base', label: 'Base', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'male', src: '/layers/base/base-male.svg', name: 'Male' }
  ] },
  { id: 'hair', label: 'Hairstyle', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'hair-1', src: '/layers/hair/hair-1.svg', name: 'Hair 1' }
  ] },
  { id: 'nose', label: 'Nose', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'nose-1', src: '/layers/nose/nose-1.svg', name: 'Nose 1' }
  ] },
  { id: 'eyes', label: 'Eyes', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'eyes-1', src: '/layers/eyes/eyes-1.svg', name: 'Eyes 1' }
  ] },
  { id: 'eyebrow', label: 'Eyebrow', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'eyebrow-1', src: '/layers/eyebrow/eyebrow-1.svg', name: 'Eyebrow 1' }
  ] },
  { id: 'piercing', label: 'Piercing', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'piercing-1', src: '/layers/piercing/piercing-1.svg', name: 'Piercing 1' }
  ] },
  { id: 'mouth', label: 'Mouth', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'mouth-1', src: '/layers/mouth/mouth-1.svg', name: 'Mouth 1' }
  ] },
  { id: 'shirt', label: 'Shirts', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'shirt-1', src: '/layers/shirt/shirt-1.svg', name: 'Shirt 1' }
  ] },
  { id: 'pants', label: 'Pants', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'pants-1', src: '/layers/pants/pants-1.svg', name: 'Pants 1' }
  ] },
  { id: 'shoes', label: 'Shoes', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'shoes-1', src: '/layers/shoes/shoes-1.svg', name: 'Shoes 1' }
  ] },
  { id: 'background', label: 'Background', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'flag', src: '/layers/background/background-flag.svg', name: 'Flag' }
  ] },
];
