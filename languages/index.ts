import en from './en';
import fr from './fr';

const languages = {en, fr};

export type TLanguage = keyof typeof languages;
export type TLanguageKey = keyof typeof en;

export default languages;
