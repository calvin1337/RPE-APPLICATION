import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import BackButton from '../Components/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../firebase';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.8; 

export default function InSport({ navigation, route }) {
  const { selectedSport } = route.params;
  const [selectedRPE, setSelectedRPE] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const handleRPESelection = (value) => {
    setSelectedRPE(value === selectedRPE ? null : value);
  };



  const renderRPEButton = (value, label) => {
    return (
      <TouchableOpacity
        key={value}
        style={[styles.row, selectedRPE === value && styles.selected]}
        onPress={() => handleRPESelection(value)}
      >
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.settingsContainer}>
        <Text style={{ fontSize: 20, color: "white" }}>{selectedSport}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
        <Ionicons name="settings-sharp" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View style={styles.RPEcontainer}>
          {renderRPEButton(0, '0. Rest')}
          {renderRPEButton(1, '1. Very Very Easy')}
          {renderRPEButton(2, '2. Easy')}
          {renderRPEButton(3, '3. Moderate')}
          {renderRPEButton(4, '4. Somewhat Hard')}
          {renderRPEButton(5, '5. Hard')}
          {renderRPEButton(6, '6. -')}
          {renderRPEButton(7, '7. Very Hard')}
          {renderRPEButton(8, '8. -')}
          {renderRPEButton(9, '9. -')}
          {renderRPEButton(10, '10. Maximal')}
        </View>
        <Text style={styles.label}>Enter your workout time in minutes</Text>
        <View style={styles.inputContainer}>
          
          <TextInput
            style={[styles.input, { width: buttonWidth }]}
            value={selectedTime}
            onChangeText={setSelectedTime}
            placeholder="Enter workout time"
            keyboardType="numeric"
            placeholderTextColor="#EDF2F4"
          />
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button,{ width: buttonWidth },{backgroundColor:'#66AEC5'} ]} >
        
            <Text style={styles.buttonText}>Add workout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F283A',
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    marginTop: 100,
    padding: 20,
  },
  RPEcontainer: {
    padding: 20,
    margin: 25,
    backgroundColor: '#1B1727',
    borderRadius: 15,
    flex:1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 10,
  },
  selected: {
    backgroundColor: '#FFA07A', 
  },
  text: {
    color: '#FFFFFF',
  },
  inputContainer: {
    padding: 20,
    margin: 25,
    backgroundColor: '#1B1727',
    borderRadius: 15,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#030303', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    color: "#EDF2F4",
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: '#1B1727',
    borderRadius: 15, 
    padding: 10,
    fontSize: 16,
    height: 50,
    color: '#EDF2F4',
    backgroundColor: "#1B1727",
  },
  
});

