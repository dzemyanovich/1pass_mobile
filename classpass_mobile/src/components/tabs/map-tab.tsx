import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { DEFAULT_LAT, DEFAULT_LONG, MAP_ZOOM_DELTA } from '../../../app.json';
import type { NavigationProps } from '../../../custom-types';

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
  const { sportObjects }: UserData = useSelector((state: ReduxState) => state.userData);

  function animateToRegion(latitude: number, longitude: number): void {
    if (!mapRef.current) {
      // eslint-disable-next-line no-console
      console.error('### mapRef.current is undefined');
    } else {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: MAP_ZOOM_DELTA,
        longitudeDelta: MAP_ZOOM_DELTA,
      });
    }
  }

  function onMapReady() {
    console.log('### getCurrentPosition');
    Geolocation.getCurrentPosition(
      async (position) => {
        console.log('### current location obtained');
        const { latitude, longitude } = position.coords;

        setUserCoords({
          latitude,
          longitude,
        });

        animateToRegion(latitude, longitude);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(`### erorr code: ${error.code}`, error.message);
      },
      { enableHighAccuracy: false, timeout: 5000 },
    );
  }

  // todo: do we need this check???
  if (!sportObjects.length) {
    console.log('### sportObjects.length = 0')
    return null;
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
