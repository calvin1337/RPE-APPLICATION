import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const Spinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});