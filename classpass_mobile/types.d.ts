type Props = {
  children: ReactNode,
};

type PageWrapperProps = Props & {
  isNavigationTab?: boolean,
  alignCenter?: boolean,
};

type LambdaResponse<T> = {
  success: boolean,
  errors?: string[],
  data?: T,
};

type SportObjectVM = {
  id: number,
  name: string,
  address: string,
  lat: number,
  long: number,
  images: string[],
};

type UserBooking = {
  id: number,
  sportObject: SportObjectVM,
  bookingTime: string,
  visitTime: string,
};

type UserInfo = {
  phone: string,
  email: string,
  firstName: string,
  lastName: string,
};

type UpdateUserDataPayload = {
  bookings: UserBooking[],
  userInfo: UserInfo,
};

type UserData = {
  sportObjects: SportObjectVM[],
  bookings: UserBooking[] | null,
  userInfo: UserInfo | null,
};

type UserDataResponse = LambdaResponse<UserData>;

type SignInRequest = {
  phone: string,
  password: string,
};

type SignInResponse = LambdaResponse<{
  token: string,
  bookings: UserBooking[],
  userInfo: UserInfo,
}>;

type AlertData = {
  visible: boolean;
  text: string;
};

type AlertPayload = {
  text: string;
};

type ReduxState = {
  userData: UserData,
  firebaseToken: string,
  alert: AlertData,
  loading: boolean,
};

type CreateBookingRequest = {
  token: string,
  sportObjectId: number,
};

type CreateBookingResponse = LambdaResponse<UserBooking>;

type CancelBookingRequest = {
  token: string,
  bookingId: number,
};

type CancelBookingResponse = LambdaResponse<void>;

type CancelBookingPayload = {
  bookingId: number,
};

type SendCodeRequest = {
  phone: string,
};

type SendCodeResponse = LambdaResponse<void>;

type VerifyCodeRequest = {
  phone: string,
  code: string,
};

type VerifyCodeResponse = LambdaResponse<void>;

type SignUpRequest = {
  phone: string,
  firstName: string,
  lastName: string,
  email: string,
  confirmEmail: string,
  password: string,
  confirmPassword: string,
};

type SignUpResponse = LambdaResponse<{
  token: string,
  userInfo: UserInfo,
}>;

type FirebaseRequest = {
  firebaseToken: string,
  userToken: string,
};

type FirebaseResponse = LambdaResponse<void>;

type ConfirmVisitPayload = {
  bookingId: string;
  visitTime: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirebaseMessageFunc = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => any;
