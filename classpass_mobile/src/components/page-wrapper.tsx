import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { hasDynamicIsland, hasNotch } from 'react-native-device-info';

import { iOS } from '../utils/utils';

export default function PageWrapper({ children, isNavigationTab = false, alignCenter = true }: PageWrapperProps) {
  const margin = 10;
  const marginTop = isNavigationTab && iOS() && (hasDynamicIsland() || hasNotch())
    ? 60
    : margin;
  const paddingBottom = isNavigationTab
    ? 60
    : 0;

  const marginStyles = {
    marginTop,
    marginBottom: margin,
    marginRight: margin,
    marginLeft: margin,
  };

  const styles = StyleSheet.create({
    container: {
      ...marginStyles,
      paddingBottom,
    },
    centerContainer: {
      ...marginStyles,
      flex: 1,
      justifyContent: 'center',
    },
    keyboardView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior="padding" enabled keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={alignCenter ? styles.centerContainer : styles.container}>
        <View>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
