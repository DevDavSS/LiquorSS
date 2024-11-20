// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome'); 
    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo2.png')} style={styles.logo} />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});

export default SplashScreen;
