import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.4;

export default function WeightPicker({ route }) {
  const { Gender } = route.params;
  const navigation = useNavigation();

  const [selectedWeight, setSelectedWeight] = useState(155); // Initial selected weight in lbs
  const [selectedUnit, setSelectedUnit] = useState('lbs'); // Initial selected unit

  const selectWeight = () => {
    navigation.navigate('LoginInfo', { Gender: Gender, Weight: `${selectedWeight}${selectedUnit}` });
  }

  const handleScroll = (event) => {
    const weight = Math.round(event.nativeEvent.contentOffset.x / 10); // Adjust as needed for scrolling sensitivity
    setSelectedWeight(weight);
  }

  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={{ textAlign: 'center', margin: 10, color: '#EDF2F4', fontSize: 20, fontWeight: 'bold' }}>Select Your Weight</Text>
          <Text style={{ textAlign: 'center', margin: 10, color: '#EDF2F4', fontSize: 16, fontWeight: '500' }}>{selectedWeight} {selectedUnit}</Text>
          <View style={styles.weightContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              contentContainerStyle={{ paddingHorizontal: width / 2 - 20 }}
            >
              {[...Array(300).keys()].map((item) => (
                <View key={item} style={styles.indicator} />
              ))}
            </ScrollView>
          </View>
          <Text style={{ textAlign: 'center', margin: 10, color: '#EDF2F4', fontSize: 14, fontWeight: '200' }}>You can change this later</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth }, { backgroundColor: '#AEAEAE' }]} onPress={() => selectWeight("Empty")} >
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { width: buttonWidth }, { backgroundColor: '#66AEC5' }]} onPress={selectWeight}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(43, 45, 66, 0.7)'
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 40,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#030303',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  topContainer: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 100
  },
  weightContainer: {
    justifyContent: 'center',
    height: 100,
    width: '100%',
    backgroundColor: '#2B2D42',
    overflow: 'hidden', // Ensure indicators don't overflow container
    marginTop: 20,
  },
  indicator: {
    width: 1,
    height: 20,
    backgroundColor: '#EDF2F4',
    marginRight: 9,
  }
});
