import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.4;
const startWeight = 30;
const endWeight = 150;
const increment = 0.5;

const generateItems = () => {
  const items = [];
  for (let i = startWeight; i <= endWeight; i += increment) {
    items.push(`${i} kg`);
  }
  return items;
};

const Items = generateItems();

export default function WeightPicker({ route }) {
  const { Gender } = route.params;
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const selectWeight = (weight) => {
    navigation.navigate('LoginInfo', { Gender: Gender, Weight: weight });
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      const initialOffset = ((Items.length - 1) / 2) * 85; // Assuming each item width is 80 with 5 margin, adjust as needed
      scrollViewRef.current.scrollTo({ x: initialOffset, animated: false });
    }
  }, []);

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={{
        uri:
          'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={{ textAlign: 'center', margin: 10, color: '#EDF2F4', fontSize: 20, fontWeight: 'bold' }}>
            Select Your Weight
          </Text>
          {/* Weight Selector */}
          <View style={styles.weightContainer}>
            <Text style={{ textAlign: 'center', color: 'white', marginBottom: 10 }}>Please select your weight or skip this stap below</Text>
            <View style={styles.scrollContainer}>
              <ScrollView
                horizontal
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContentContainer}
                showsHorizontalScrollIndicator={false}
              >
                {Items.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.item} onPress={() => selectWeight(item)}>
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          <Text style={{ textAlign: 'center', margin: 10, color: '#EDF2F4', fontSize: 14, fontWeight: '200' }}>
            You can change this later
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth }, { backgroundColor: '#AEAEAE' }]} onPress={() => selectWeight('Empty')}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity
            style={[styles.button, { width: buttonWidth }, { backgroundColor: '#66AEC5' }]}
            onPress={() => selectWeight('158lb/72kg')}
          >
            <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>*/}
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(43, 45, 66, 0.7)',
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
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  topContainer: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 100,
  },
  weightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 300,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 5,
  },
  itemText: {
    color: 'white',
    fontSize: 20,
  },
});
