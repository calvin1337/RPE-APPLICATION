import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Settings } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react"
import Home from "./Screens/Home";
import { StyleSheet} from 'react-native';
import User from './Screens/User';
import { createStackNavigator } from '@react-navigation/stack'

import Graphs from './Screens/Graph';
import Welcome from "./Screens/Welcome"
import InSport from "./Screens/InSport";
import UserSettings from "./Screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#2B2D42",
  }  
}



export default function Navigation() {
  
  const [signedIn, setSignedIn] = useState(false); 
  
  
  return (
    <NavigationContainer>
      {signedIn ? (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
          <Tab.Screen 
            name="Graphs" 
            component={Graphs} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.container}> 
                  <Ionicons name="bar-chart" size={32} color="white" />
                </View>
              )
            }}
          />
          <Tab.Screen 
            name="Home" 
            component={HomeStack} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.container}> 
                  <Ionicons name="add-circle" size={32} color="#66AEC5" />
                </View>
              )
            }}
          />
          <Tab.Screen 
            name="User" 
            component={User} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.container}> 
                  <Ionicons name="person" size={32} color="white" />
                </View>
              )
            }}
          />
        </Tab.Navigator>
      ) : (
        <WelcomeStack setSignedIn={setSignedIn} />
      )}
    </NavigationContainer>
  );
}


const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={Home} />
      <Stack.Screen name="InSportPage" component={InSport} />
      <Stack.Screen name="SettingsPage" component={UserSettings} />
    </Stack.Navigator>
  );
};

const WelcomeStack = ({ setSignedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomePage">
        {(props) => <Welcome {...props} setSignedIn={setSignedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
