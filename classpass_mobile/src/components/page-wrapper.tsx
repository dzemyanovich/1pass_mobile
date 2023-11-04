import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { iOS } from '../utils/utils';

export default function PageWrapper({ children, isNavigationTab = false, alignCenter = true }: PageWrapperProps) {
  const margin = 10;
  const marginTop = isNavigationTab && iOS() && (DeviceInfo.hasDynamicIsland() || DeviceInfo.hasNotch())
    ? 60
    : margin;

  const marginStyles = {
    marginTop,
    marginBottom: margin,
    marginRight: margin,
    marginLeft: margin,
  };

  const styles = StyleSheet.create({
    container: {
      ...marginStyles,
    },
    centerContainer: {
      ...marginStyles,
      flex: 1,
      justifyContent: 'center',
    },
  });

  return (
    <ScrollView contentContainerStyle={alignCenter ? styles.centerContainer : styles.container}>
      {children}
    </ScrollView>
  );
}
