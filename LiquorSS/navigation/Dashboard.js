import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Image , StyleSheet, TouchableOpacity} from 'react-native';
import ShopScreen from '../screens/ShopScreen';
import { Header } from '../components/layout/Header';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons'; 
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import Welcome from '../screens/Welcome'
const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
      <Drawer.Navigator
        initialRouteName="Shop"
        screenOptions={{
          drawerStyle: {
            width: 300,
            backgroundColor: Colors.blackWine,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
          drawerContentContainerStyle: {
            padding: 0, 
          },
          drawerActiveBackgroundColor: 'transparent', 
          drawerInactiveBackgroundColor: 'transparent',
          drawerItemStyle: {
            paddingHorizontal: 0,
            marginHorizontal: 0,  
          },
        }}
      >

    
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          header: ({ navigation }) => (
            <Header navigation={navigation} showBack={false} />
          ),
          drawerLabel: () => (
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom:30 }}>
              <Image
                source={require('../assets/images/saul.png')}  
                style={{
                    marginTop:80,
                    
                  width: 140,
                  height: 140,
                  borderRadius: 60, 
                }}
              />
              <Text style={{ color: 'white', marginTop: 10,fontFamily: Fonts.family.regular, fontSize: Fonts.size.normal }}>Saul Goodman</Text>
              <Text style={{ color: 'white', fontSize: Fonts.size.small, marginBottom:30, }}>SaulGdman@gamil.com</Text>
            </View>
          ),
        }}
      />
            
            <Drawer.Screen
        name="Shop"
        component={Profile}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <Header navigation={navigation} showBack={false} />
          ),
          drawerLabel: ({ focused }) => (
            <View
              style={[
                styles.drawerItemContainer,
                { backgroundColor: focused ? Colors.lowBrawn : 'transparent' }, 
              ]}
            >
              <EvilIcons
                name="user" 
                size={24} 
                color={focused ? '#fff' : '#aaa'} 
                style={styles.iconStyle}
              />
              <Text
                style={[
                  styles.drawerLabelText,
                  { color: focused ? '#fff' : '#aaa' }, 
                ]}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Prof"
        component={ShopScreen}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <Header navigation={navigation} showBack={false} />
          ),
          drawerLabel: ({ focused }) => (
            <View
              style={[
                styles.drawerItemContainer,
                { backgroundColor: focused ? Colors.lowBrawn : 'transparent' }, 
              ]}
            >
              <EvilIcons
                name="archive" 
                size={24}
                color={focused ? '#fff' : '#aaa'} 
                style={styles.iconStyle}
              />
              <Text
                style={[
                  styles.drawerLabelText,
                  { color: focused ? '#fff' : '#aaa' }, 
                ]}
              >
                Products
              </Text>
            </View>
          ),
        }}

      />
        <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <Header navigation={navigation} showBack={false} />
          ),
          drawerLabel: ({ focused }) => (
            <View
              style={[
                styles.drawerItemContainer,
                { backgroundColor: focused ? Colors.lowBrawn : 'transparent' }, 
              ]}
            >
              <EvilIcons
                name="cart" 
                size={24} 
                color={focused ? '#fff' : '#aaa'} 
                style={styles.iconStyle}
              />
              <Text
                style={[
                  styles.drawerLabelText,
                  { color: focused ? '#fff' : '#aaa' }, 
                ]}
              >
                Cart
              </Text>
              
            </View>
          ),
        }}
      />
        <Drawer.Screen
        name="Logout"
        component={Welcome}
        options={{
          headerShown: false,

          drawerLabel: ({ focused }) => (
            <View
              style={[
                styles.LogoutDrawer,
                { backgroundColor: focused ? Colors.lowBrawn : 'transparent' }, 
              ]}
            >
              <EvilIcons
                name="Logout"
                size={24} 
                color={focused ? '#fff' : '#aaa'}
                style={styles.iconStyle}
              />
              <Text
                style={[
                  styles.drawerLabelText,
                  { color: focused ? '#fff' : '#aaa' },
                ]}
              >
                Logout
              </Text>
            </View>
          ),
        }}
      />

    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 1, 
    alignSelf: 'stretch', 
    width:500
  },
  iconStyle: {
    marginRight: 20,
  },
  drawerLabelText: {
    fontSize: 16,
    fontFamily: Fonts.family.bold,
  },
  LogoutDrawer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,


    marginTop:130
  }
});