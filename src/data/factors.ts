export type Factor = {
  id: string;
  label: string;
  assets: { id: string; src: string; name?: string }[];
};

export const factors: Factor[] = [
  { id: 'base', label: 'Base', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'main-body1', src: '/layers/base/main-body1.png', name: 'Male 1' },
    { id: 'main-body2', src: '/layers/base/main-body2.png', name: 'Male 2' },
  ] },
  { id: 'hair', label: 'Hairstyle', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'hair-1', src: '/layers/hair/hair-style1.png', name: 'Hair 1' },
    { id: 'hair-2', src: '/layers/hair/hair-style2.png', name: 'Hair 2' },
  ] },
  { id: 'eyes', label: 'Eyes', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'eyes-1', src: '/layers/eyes/eye1.png', name: 'Eyes 1' },
    { id: 'eyes-2', src: '/layers/eyes/eye2.png', name: 'Eyes 2' },
  ] },
  { id: 'eyebrow', label: 'Eyebrow', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'eyebrow-1', src: '/layers/eyebrow/eye-brow1.png', name: 'Eyebrow 1' },
    { id: 'eyebrow-2', src: '/layers/eyebrow/eye-brow2.png', name: 'Eyebrow 2' },
  ] },
  { id: 'piercing', label: 'Piercing', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'piercing-1', src: '/layers/piercing/piercing1.png', name: 'Piercing 1' },
    { id: 'piercing-2', src: '/layers/piercing/piercing2.png', name: 'Piercing 2' },
  ] },
  { id: 'mouth', label: 'Mouth', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'mouth-1', src: '/layers/mouth/mouth1.png', name: 'Mouth 1' },
    { id: 'mouth-2', src: '/layers/mouth/mouth2.png', name: 'Mouth 2' },
  ] },
  { id: 'shirt', label: 'Shirts', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'shirt-1', src: '/layers/shirt/shirt1.png', name: 'Shirt 1' },
    { id: 'shirt-2', src: '/layers/shirt/shirt2.png', name: 'Shirt 2' },
  ] },
  { id: 'pants', label: 'Pants', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'pants-1', src: '/layers/pants/pants1.png', name: 'Pants 1' },
    { id: 'pants-2', src: '/layers/pants/pants2.png', name: 'Pants 2' },
  ] },
  { id: 'shoes', label: 'Shoes', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'shoes-1', src: '/layers/shoes/shoes1.png', name: 'Shoes 1' },
    { id: 'shoes-2', src: '/layers/shoes/shoes2.png', name: 'Shoes 2' },
  ] },
  { id: 'background', label: 'Background', assets: [
    { id: 'none', src: '', name: 'None' },
    { id: 'flag', src: '/layers/background/background-flag.svg', name: 'Flag' }
  ] },
];
