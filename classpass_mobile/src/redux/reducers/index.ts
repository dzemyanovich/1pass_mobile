import userDataReducer from './user-data-reducer';
import firebaseTokenReducer from './firebase-token-reducer';
import alertReducer from './alert-reducer';
import loadingReducer from './loading-reducer';

export default {
  userData: userDataReducer,
  firebaseToken: firebaseTokenReducer,
  alert: alertReducer,
  loading: loadingReducer,
};
