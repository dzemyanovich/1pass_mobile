import React from 'react';
import { Text, ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 50,
  },
  backgroundScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.3,
    zIndex: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    height: '100%',
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  loadingText: {
    fontSize: 32,
  },
});

export default function Loader() {
  const loading = useSelector((state: ReduxState) => state.loading);

  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundScreen} />
      <View style={[styles.textContainer, styles.horizontal]}>
        <Text style={styles.loadingText}>
          <ActivityIndicator animating size="large" />
        </Text>
      </View>
    </View>
  );
}
