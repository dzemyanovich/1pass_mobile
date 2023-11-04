import * as Keychain from 'react-native-keychain';

export async function setUserToken(token: string): Promise<void> {
  await Keychain.setGenericPassword('any-string', token);
}

export async function getUserToken(): Promise<string | null> {
  const creds = await Keychain.getGenericPassword();

  return creds
    ? creds.password
    : null;
}

export async function clearUserToken(): Promise<void> {
  await Keychain.resetGenericPassword();
}
