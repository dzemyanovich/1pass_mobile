import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Title({ children }: Props) {
  const styles = StyleSheet.create({
    container: {
      fontSize: 25,
      marginBottom: 5,
    },
  });

  return (
    <Text style={styles.container}>
      {children}
    </Text>
  );
}
