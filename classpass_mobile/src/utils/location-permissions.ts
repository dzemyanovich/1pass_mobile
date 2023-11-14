import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { iOS } from './utils';

export async function requestLocationPermission() {
  if (iOS()) {
    Geolocation.requestAuthorization();
  } else {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use locations');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}
