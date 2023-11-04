import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  'home-tabs': undefined;
  'bookings': undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  'profile': undefined;
  'auth-verify-code': {
    phone: string,
  },
  'complete-sign-up': {
    phone: string,
  };
  'sport-object': {
    sportObjectId: number,
    name: string,
    address: string,
    images: string[],
  },
};

export type NavigationProps = NativeStackScreenProps<RootStackParamList>;

export type SportObjectProps = NativeStackScreenProps<RootStackParamList, 'sport-object'>;

export type VerifyCodeProps = NativeStackScreenProps<RootStackParamList, 'auth-verify-code'>;

export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'complete-sign-up'>;
