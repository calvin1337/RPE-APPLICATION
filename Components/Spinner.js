import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const Spinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#66AEC5" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1F283A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});