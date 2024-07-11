import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationVI from "./i18n/vi.json";
import translationEN from "./i18n/en.json";

const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  }
};

const lang = localStorage.getItem("lang");

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lang || 'en', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy bản dịch

    interpolation: {
      escapeValue: false // React đã tự động chống XSS
    }
  });

export default i18n;
