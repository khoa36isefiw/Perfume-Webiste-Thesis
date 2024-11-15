import i18n from 'i18next';
// English
import EN from './locales/en.json';
// Vietnamese
import VI from './locales/vi.json';

export const locales = {
    en: 'English',
    vi: 'Vietnamese',
};

const defaultNS = 'translate';
i18n.init({
    // default language
    fallbackLng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    interpolation: {
        escapeValue: false,
    },
    ns: ['translate'],
    defaultNS,
    resources: {
        en: {
            // namespace
            translate: EN,
        },
        vi: {
            // namespace
            translate: VI,
        },
    },
});

export default i18n;
