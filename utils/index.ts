import {Rule} from '@rn-form/form';
import {API_URL} from 'env';
import {translateStatic} from 'providers/Language';
import {Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export const MAX_SIZE = 100000000;

export function random(length: number = 16) {
  const characters =
    'ABCDEFGHIJQRSTU012345VWXYZabcdefghijklmnKLMNOPopqrstuvwxyz6789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getErrorMessage = (e: any) => {
  let err;
  try {
    err = JSON.stringify(e);
  } catch {}
  const mess =
    e.response?.data?.message || e?.message || err || e?.toString() || '';
  return translateStatic(mess, undefined, mess);
};

export const getErrorMessageCode = (e: any): string => {
  const mess = e.response?.data?.message || e.message;
  return mess;
};

export const throwError = (e: any) => {
  if (__DEV__) {
    console.log('Error', e?.message, e?.response);
  }
  showMessage({message: getErrorMessage(e), type: 'danger', duration: 5000});
};

export const validateConfPassword = async (pass: string, confirm: string) => {
  if (pass !== confirm) {
    throw translateStatic('validate.password_does_not_match');
  }
};

export const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const getFileUrl = (url?: string) => {
  if (!url) return '';
  if (
    url?.startsWith?.('/') ||
    url?.startsWith?.('file:') ||
    url?.startsWith?.('content:') ||
    url?.startsWith?.('ph:')
  ) {
    return Platform.select({
      ios: url!.replace('file://', ''),
      default: url.startsWith?.('file://') ? url : `file://${url}`,
    });
  }
  return url?.includes?.('http://') || url?.includes?.('https://')
    ? url ?? ''
    : `${API_URL}/api/uploads/${url}`;
};

export const formatNumber = (num: number) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num?.toString();
};

export const formatDuration = (seconds: number, showHours?: boolean) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (showHours) {
    return `${h?.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  return `${m}:${s.toString().padStart(2, '0')}`;
};

export type {Rule};
