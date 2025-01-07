import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { wp, hp, fs, spacing, radius } from '../src';

const ExampleComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Responsive Text</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),          // 90% of screen width
    height: hp(80),         // 80% of screen height
    padding: spacing(16),   // responsive padding
  },
  box: {
    backgroundColor: '#fff',
    padding: spacing(20),
    borderRadius: radius(8),
  },
  text: {
    fontSize: fs(16),      // responsive font size
  },
});

export default ExampleComponent;
