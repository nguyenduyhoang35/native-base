import languages, {TLanguage, TLanguageKey} from 'languages';
import {createContext, PropsWithChildren, useCallback, useContext} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {store} from 'store';
import {languageSelector, setLanguage} from 'store/slices/user';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export type TFTranslate = (
  key: TLanguageKey,
  options?: Record<string, string | number>,
  defaultText?: string,
) => string;

export type TLangContext = {
  translate: TFTranslate;
  changeLanguage: (key: TLanguage) => void;
};

const LanguageContext = createContext<TLangContext>({
  translate: () => '',
  changeLanguage: () => null,
});

export const translateStatic: TFTranslate = (
  key: TLanguageKey,
  options?: Record<string, string | number>,
  defaultText?: string,
) => {
  const language = languageSelector(store.getState());
  let lang = languages[language || 'en']?.[key] || defaultText || '';
  if (options && Object.keys(options).length) {
    Object.keys(options).forEach(k => {
      lang = lang.replace(`{${k}}`, String(options[k]));
    });
  }
  return lang;
};

export const useLanguage = () => useContext(LanguageContext);

export const useTranslate = () => useContext(LanguageContext).translate;

export const LanguageProvider = ({children}: PropsWithChildren) => {
  const language = useSelector(languageSelector, shallowEqual);

  const translate = useCallback(
    (
      key: TLanguageKey,
      options?: Record<string, string | number>,
      defaultText?: string,
    ) => {
      let lang = languages[language || 'en']?.[key] || defaultText || key;
      if (options && Object.keys(options).length) {
        Object.keys(options).forEach(k => {
          lang = lang.replace(`{${k}}`, String(options[k]));
        });
      }
      return lang;
    },
    [language],
  );

  const changeLanguage = useCallback((lang: keyof typeof languages) => {
    store.dispatch(setLanguage(lang));
  }, []);

  return (
    <LanguageContext.Provider value={{translate, changeLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};
