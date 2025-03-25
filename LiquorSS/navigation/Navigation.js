import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts, Cinzel_400Regular, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import SplashScreen from '../screens/SplashScreen';
import Welcome from '../screens/Welcome';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Dashboard from './Dashboard';  
import Profile from '../screens/Profile';
import orderPlacing from '../screens/orderPlacing';
import orderTracking from '../screens/orderTrackingScreen';
import MapViewComponent from '../components/layout/MapViewComponent';
import purchaseHistoryScreen from '../screens/purchaseHistory';


const Stack = createStackNavigator();

export default function Navigation() {
  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Shop"
          component={Dashboard}  
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Prof"
          component={Profile}  
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Order"
          component={orderPlacing}
          options={{ headerShown: false }}/>

        <Stack.Screen
          name="OrderTracking"
          component={orderTracking}
          options={{ headerShown: false }}/>
        
        <Stack.Screen
          name="purchaseHistory"
          component={purchaseHistoryScreen}
          options={{ headerShown: false }}/>



          <Stack.Screen name="MapScreen" component={MapViewComponent} />
          {/* otras pantallas */}


      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
