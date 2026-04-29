import EncryptedStorage from 'react-native-encrypted-storage';
import {store} from 'store';
import {resetUser} from 'store/slices/user';

export async function storeSession(token: string, refreshToken: string) {
  return EncryptedStorage.setItem(
    'user_session',
    JSON.stringify({token, refreshToken}),
  );
}

export async function retrieveSession() {
  return EncryptedStorage.getItem('user_session');
}

export async function getToken() {
  const session = await retrieveSession();
  if (!session) return;
  return JSON.parse(session).token;
}

export async function getRefreshToken() {
  const session = await retrieveSession();
  if (!session) return;
  return JSON.parse(session).refreshToken;
}

export async function removeSession() {
  return EncryptedStorage.removeItem('user_session');
}

export async function removeAllSession() {
  await removeSession();
  store.dispatch(resetUser());
}
