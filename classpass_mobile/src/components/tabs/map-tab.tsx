import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'react-native-paper';
import { StyleSheet, Dimensions, PermissionsAndroid } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { getUserData } from '../../api';
import { DEFAULT_LAT, DEFAULT_LONG, MAP_ZOOM_DELTA } from '../../../app.json';
import { HIDE_LOADER, SET_USER_DATA } from '../../redux/action-types';
import type { NavigationProps } from '../../../custom-types';
import { iOS } from '../../utils/utils';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: deviceHeight,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default function MapTab({ navigation }: NavigationProps) {
  // minsk coords
  const [userCoords, setUserCoords] = useState({
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LONG,
  });
  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();
  const { sportObjects }: UserData = useSelector((state: ReduxState) => state.userData);

  function animateToRegion(latitude: number, longitude: number): void {
    if (!mapRef.current) {
      // eslint-disable-next-line no-console
      console.error('mapRef.current is undefined');
    } else {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: MAP_ZOOM_DELTA,
        longitudeDelta: MAP_ZOOM_DELTA,
      });
    }
  }

  async function requestLocationPermission() {
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

  async function onMapReady(): Promise<void> {
    await requestLocationPermission();

    const userDataResponse = await getUserData();
    dispatch({
      type: SET_USER_DATA,
      payload: userDataResponse.data as UserData,
    });

    Geolocation.getCurrentPosition(
      async (position) => {
        console.log('#### CURRENT LOCATION OBTAINED #####');
        const { latitude, longitude } = position.coords;

        setUserCoords({
          latitude,
          longitude,
        });

        animateToRegion(latitude, longitude);

        dispatch({
          type: HIDE_LOADER,
        });
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(`erorr code: ${error.code}`, error.message);

        dispatch({
          type: HIDE_LOADER,
        });
      },
      { enableHighAccuracy: false, timeout: 5000 },
    );
  }

  return (
    <MapView
      ref={mapRef}
      onMapReady={() => onMapReady()}
      provider="google"
      style={styles.map}
      showsUserLocation
      showsMyLocationButton
      initialRegion={{
        latitude: userCoords.latitude,
        longitude: userCoords.longitude,
        latitudeDelta: MAP_ZOOM_DELTA,
        longitudeDelta: MAP_ZOOM_DELTA,
      }}>
      {sportObjects.map((sportObject: SportObjectVM) => {
        const { id, name, address, lat, long, images } = sportObject;

        function sportObjectNavigate() {
          navigation.navigate('sport-object', { sportObjectId: id, name, address, images });
        }

        return (
          <Marker coordinate={{ latitude: lat, longitude: long }} key={`${lat}${long}`}>
            <Callout onPress={() => sportObjectNavigate()}>
              <Text>{name}</Text>
              <Text>{address}</Text>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
}
