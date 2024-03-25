import { View, Text, ImageBackground, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../firebase';


export default function Users({ userData }) {
  const firebaseImageUrl = 'https://firebasestorage.googleapis.com/v0/b/rpe-app-cc0c7.appspot.com/o/image1.png?alt=media&token=b719b3ac-8fe1-42ff-9a44-03d735e8891f';

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    setUser(currentUser);
  }, []);

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // Redirect or perform any additional actions after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigation = useNavigation();

  const navigateToSettings = () => {
    // Navigate to the Settings screen
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, color: "white", paddingLeft: 50 }}>Setting</Text>
        <TouchableOpacity onPress={navigateToSettings}>
          <Ionicons name="settings-sharp" size={32} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 20, color: "white", paddingLeft: 30, paddingBottom: 25 }}>Account Details</Text>
        <View style={styles.usersContainer}>
          
        <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
          <View style={[styles.column, { flex: 0.35 }]}>
          <Text style={[styles.text]}>Email:</Text>

          </View>
          <View style={[styles.column, { flex: 0.65 }]}>
            <Text style={styles.text}>email@testgmail.com</Text>
          </View>
        </View>


            
        <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
          <View style={[styles.column, { flex: 0.35 }]}>
          <Text style={[styles.text]}>Password: </Text>

          </View>
          <View style={[styles.column, { flex: 0.65 }]}>
            <Text style={styles.text}>itriyhw80sd</Text>
          </View>
        </View>


        <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
          <View style={[styles.column, { flex: 0.35 }]}>
          <Text style={[styles.text]}>Gender:</Text>

          </View>
          <View style={[styles.column, { flex: 0.65 }]}>
            <Text style={styles.text}>Male</Text>
          </View>
        </View>

        <View style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>
          <View style={[styles.column, { flex: 0.35 }]}>
          <Text style={[styles.text]}>Weight: </Text>

          </View>
          <View style={[styles.column, { flex: 0.65 }]}>
            <Text style={styles.text}>158lb / 72kg</Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={[styles.itemContainer, { width: 175, marginRight: 10 }]}>
            <View style={[styles.column, { alignItems: "center" }]}>
            <Text style={[styles.text, { paddingTop: 35 , paddingBottom: 35}]}>7 sessions this week!</Text>
            </View>
          </View>
          <View style={[styles.itemContainer, { width: 175 }]}>
            <View style={[styles.column, { alignItems: "center" }]}>
            <Text style={styles.text}>Account created 291 days ago</Text>
            </View>
          </View>
        </View>






            <View style={styles.itemContainer}>
            <View style={[styles.column, { alignItems: "center" }]}>
              {/* <Image style={styles.image} source={require('../assets/avatar-female.png')} /> */}
              </View>
            </View>

        </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 45, 66, 0.7)'
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#1F283A",
    paddingTop: 80,
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  usersContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 100,
    paddingTop: 10,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#2B2D42",
    borderRadius: 15,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will add space between the items horizontally
    maxWidth: 400,
  },  
  column: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 15,
  },
});