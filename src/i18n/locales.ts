export type LocaleKey = 'en' | 'vi';

export const locales: Record<LocaleKey, Record<string, string>> = {
  en: {
    'select_trait': 'Select a trait to edit',
    'editing': 'Editing',
    'hue': 'Hue',
    'brightness': 'Brightness',
    'saturate': 'Saturate',
  },
  vi: {
    'select_trait': 'Chọn đặc điểm để chỉnh',
    'editing': 'Đang chỉnh',
    'hue': 'Màu (Hue)',
    'brightness': 'Độ sáng',
    'saturate': 'Độ bão hòa',
  },
};
