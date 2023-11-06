import { getGenericPassword, setGenericPassword, resetGenericPassword } from 'react-native-keychain';

export async function setUserToken(token: string): Promise<void> {
  await setGenericPassword('any-string', token);
}

export async function getUserToken(): Promise<string | null> {
  const creds = await getGenericPassword();

  return creds
    ? creds.password
    : null;
}

export async function clearUserToken(): Promise<void> {
  await resetGenericPassword();
}
