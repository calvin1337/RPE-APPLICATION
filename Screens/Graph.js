import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.5;

export default function AnalyticsPage() {
  const navigation = useNavigation();

  const selectDuration = (duration) => {
    navigation.navigate('SomeScreen', { Duration: duration });
  };

  const selectAttribute = (attribute) => {
    navigation.navigate('SomeScreen', { Attribute: attribute });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.heading}>Stats:</Text>
          <Text style={styles.text}>Weekly</Text>
          <Text style={styles.text}>Total Sum: 1370</Text>
          <Text style={styles.text}>Average: 190</Text>
          <Text style={styles.text}>Sessions: 11</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.heading}>Graph Timescale:</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={() => selectDuration('Daily')}>
              <Text style={styles.buttonText}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectDuration('Weekly')}>
              <Text style={styles.buttonText}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectDuration('Bi-Weekly')}>
              <Text style={styles.buttonText}>Bi-Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectDuration('Monthly')}>
              <Text style={styles.buttonText}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.emptyBox}></View>

        <View style={styles.box}>
          <Text style={styles.heading}>Attribute Boxes:</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={() => selectAttribute('Duration Only')}>
              <Text style={styles.buttonText}>Duration Only</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => selectAttribute('Average Ratings')}>
              <Text style={styles.buttonText}>Average Ratings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 45, 66, 0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    backgroundColor: 'rgba(27, 23, 39, 0.8)',
    borderRadius: 10,
    padding: 50,
    marginBottom: 60,
  },
  emptyBox: {
    width: '90%',
    height: buttonWidth,
    backgroundColor: 'rgba(27, 23, 39, 0.8)',
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(43, 45, 66, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%', // Adjust width to fit buttons evenly in a row
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
