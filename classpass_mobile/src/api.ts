import { get, post } from './rest';
import { API_URL } from '../app.json';
import { getUserToken, setUserToken } from './secure-store-manager';

export async function getUserData(): Promise<UserDataResponse> {
  const token = await getUserToken();
  const data = {
    token,
  };
  const response: UserDataResponse = await get(`${API_URL}/get-user-data`, data);
  return response;
}

export async function signIn(request: SignInRequest): Promise<SignInResponse> {
  const { phone, password } = request;
  const response: SignInResponse = await post(`${API_URL}/sign-in`, { phone, password });
  if (response.success) {
    await setUserToken(response.data?.token as string);
  }
  return response;
}

export async function createBooking(request: CreateBookingRequest): Promise<CreateBookingResponse> {
  const response: CreateBookingResponse = await post(`${API_URL}/create-booking`, request);
  return response;
}

export async function cancelBooking(request: CancelBookingRequest): Promise<CancelBookingResponse> {
  const response: CancelBookingResponse = await post(`${API_URL}/cancel-booking`, request);
  return response;
}

export async function authSendCode(request: SendCodeRequest): Promise<SendCodeResponse> {
  const response: SendCodeResponse = await post(`${API_URL}/auth-send-code`, request);
  return response;
}

export async function authVerifyCode(request: VerifyCodeRequest): Promise<VerifyCodeResponse> {
  const response: VerifyCodeResponse = await post(`${API_URL}/auth-verify-code`, request);
  return response;
}

export async function completeSignUp(request: SignUpRequest): Promise<SignUpResponse> {
  const response: SignUpResponse = await post(`${API_URL}/sign-up`, request);
  return response;
}

export async function registerFirebaseToken(firebaseToken: string): Promise<void> {
  const userToken: string | null = await getUserToken();

  if (!userToken) {
    return;
  }

  const firebaseRequest: FirebaseRequest = {
    firebaseToken,
    userToken,
  };

  const registerTokenResponse: FirebaseResponse = await post(`${API_URL}/register-firebase-token`, firebaseRequest);

  if (!registerTokenResponse.success) {
    console.error('error occurred while registering firebase token');
  } else {
    console.log('firebase token successfully registed on back-end');
  }
}

export async function deleteFirebaseToken(firebaseToken: string): Promise<void> {
  const userToken: string | null = await getUserToken();

  if (!userToken) {
    return;
  }

  const firebaseRequest: FirebaseRequest = {
    firebaseToken,
    userToken,
  };

  const deleteTokenResponse: FirebaseResponse = await post(`${API_URL}/delete-firebase-token`, firebaseRequest);

  if (!deleteTokenResponse.success) {
    console.error('error occurred while deleting firebase token');
  } else {
    console.log('firebase token successfully deleted on back-end');
  }
}
