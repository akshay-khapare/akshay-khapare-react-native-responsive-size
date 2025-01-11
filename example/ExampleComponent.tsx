import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { wp, hp, fs, spacing, radius } from '../src';

const ExampleComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Responsive Component</Text>
        <Text style={styles.description}>
          This component demonstrates the usage of responsive sizing utilities.
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Action Button</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing(16),
  },
  card: {
    width: wp(90),
    padding: spacing(16),
    backgroundColor: '#ffffff',
    borderRadius: radius(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: fs(24),
    fontWeight: 'bold',
    marginBottom: spacing(8),
    color: '#333333',
  },
  description: {
    fontSize: fs(16),
    color: '#666666',
    lineHeight: fs(24),
  },
  buttonContainer: {
    width: wp(100),
    padding: spacing(16),
    alignItems: 'center',
    marginTop: spacing(16),
  },
  button: {
    width: wp(80),
    height: hp(6),
    backgroundColor: '#007AFF',
    borderRadius: radius(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '600',
  },
});

export default ExampleComponent;
