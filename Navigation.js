import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react"
import Home from "./Screens/Home";
import { StyleSheet} from 'react-native';
import User from './Screens/User';
import { createStackNavigator } from '@react-navigation/stack'

import Graphs from './Screens/Graph';
import Welcome from "./Screens/Welcome"
import InSport from "./Screens/InSport";
import GenderPick from './Screens/GenderPick';
import LoginInformation from './Screens/LoginInfo';
import WeightPicker from './Screens/WeightSelect';
import AddPhoto from './Screens/AddPhoto';
import CreateAccount from './Screens/CreateAccount';

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


// Main navigation component
export default function Navigation() {
  
  const [signedIn, setSignedIn] = useState(false); 
  
  
  return (
    <NavigationContainer>
      {signedIn ? (
        // Analytics graphs etc
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
          <Tab.Screen 
            name="Graphs" 
            component={GraphStack} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.container}> 
                  <Ionicons name="bar-chart" size={32} color="white" />
                </View>
              )
            }}
          />
          {/* Home pages sports etc */}
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
          {/* Settings pages */}
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

// Stack navigator for home screens
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={Home} />
      <Stack.Screen name="InSportPage" component={InSport} />
    </Stack.Navigator>
  );
};

// Stack navigator for welcome screen
// Loading pages etc
const WelcomeStack = ({ setSignedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomePage">
        {(props) => <Welcome {...props} setSignedIn={setSignedIn} />}
        
      </Stack.Screen>
      <Stack.Screen name="GenderPick" component={GenderPick} />
      <Stack.Screen name="WeightPicker" component={WeightPicker} />
      <Stack.Screen name="LoginInfo" component={LoginInformation} />
      <Stack.Screen name="AddProfilePhoto" component={AddPhoto} />
      <Stack.Screen name="CreateUserAccount">
      {(props) => <CreateAccount {...props} setSignedIn={setSignedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const GraphStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GraphPage" component={Graphs} />
    </Stack.Navigator>
  ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
