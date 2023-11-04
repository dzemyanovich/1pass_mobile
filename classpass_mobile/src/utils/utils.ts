import { Platform } from 'react-native';

const iOSvalue = Platform.OS === 'ios';
const androidValue = Platform.OS === 'android';

export function iOS() {
  return iOSvalue;
}

export function Android() {
  return androidValue;
}

export function delay(sec: number) {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-implied-eval, no-promise-executor-return, @typescript-eslint/no-explicit-any
  return new Promise((res: any) => setTimeout(res, sec * 1000));
}

export function formatDate(date: string): string | null {
  if (!date) {
    return null;
  }
  return new Date(date).toLocaleString();
}

export function isToday(date: string): boolean {
  const todaysDate = new Date();

  return new Date(date).setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0);
}

export function getErrorMessages<T>(lambdaResponse: LambdaResponse<T>): string | undefined {
  return lambdaResponse.errors?.join('. ');
}
