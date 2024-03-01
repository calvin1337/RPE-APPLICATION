import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.9;

export default function AnalyticsPage() {
  const navigation = useNavigation();

  const selectDuration = (duration) => {
    navigation.navigate('SomeScreen', { Duration: duration });
  };

  const selectAttribute = (attribute) => {
    navigation.navigate('SomeScreen', { Attribute: attribute });
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }}
      style={styles.backgroundImage}
    >
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
          <TouchableOpacity style={styles.button} onPress={() => selectDuration('Daily')}>
            <Text style={styles.text}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => selectDuration('Weekly')}>
            <Text style={styles.text}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => selectDuration('Bi-Weekly')}>
            <Text style={styles.text}>Bi-Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => selectDuration('Monthly')}>
            <Text style={styles.text}>Monthly</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyBox}></View>

        <View style={styles.box}>
          <Text style={styles.heading}>Attribute Boxes:</Text>
          <TouchableOpacity style={styles.button} onPress={() => selectAttribute('Duration Only')}>
            <Text style={styles.text}>Duration Only</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => selectAttribute('Average Ratings')}>
            <Text style={styles.text}>Average Ratings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 45, 66, 0.7)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  box: {
    width: buttonWidth,
    backgroundColor: 'rgba(27, 23, 39, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  emptyBox: {
    width: buttonWidth,
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
  button: {
    backgroundColor: 'rgba(43, 45, 66, 0.8)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});
