import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../../locales/en/translation.json';
import translationES from '../../locales/es/translation.json';
import translationFR from '../../locales/fr/translation.json';
import translationDE from '../../locales/de/translation.json';
import translationIT from '../../locales/it/translation.json';

// The translations
const resources = {
	en: {
		translation: translationEN
	},
	es: {
		translation: translationES
	},
	fr: {
		translation: translationFR
	},
	de: {
		translation: translationDE
	},
	it: {
		translation: translationIT
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	keySeparator: false,
	fallbackLng: 'en',

	interpolation: {
		escapeValue: false
	}
});

export default i18n;
