import React from 'react';
import { Text } from 'react-native-paper';

export default function Paragraph({ children }: Props) {
  const fontSize = 16;
  const marginBottom = 5;

  return (
    <Text style={{ fontSize, marginBottom }}>
      {children}
    </Text>
  );
}
