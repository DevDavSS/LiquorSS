import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ImageBackground, Image, Text } from 'react-native';
import Fonts from '../constants/Fonts';
import Button from '../components/Controls/Buttons';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const moveAnimLogo = useRef(new Animated.Value(0)).current; // Controla la posición vertical del logo
  const scaleAnimLogo = useRef(new Animated.Value(1)).current; // Controla el tamaño (escala) del logo
  const moveAnimButtons = useRef(new Animated.Value(200)).current; // Declaración correcta

  const moveAnimText = useRef(new Animated.Value(200)).current; // El texto inicia fuera de la pantalla (abajo)
//   const moveAnimButtons = useRef(new Animated.Value(200)).current; // Los botones inician fuera de la pantalla (abajo)
    const navigation = useNavigation(); // Obtener el objeto navigation
  const LoginScreen = () => {
    navigation.navigate('Login'); 
  };
  const RegisterScreen = () => {
    navigation.navigate('Register'); 
  };

  useEffect(() => {
    // Animación del logo
    Animated.timing(moveAnimLogo, {
      toValue: -250, // Mueve el logo hacia arriba
      duration: 2000, // Duración en milisegundos
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnimLogo, {
      toValue: 1.5, // Escala el logo
      duration: 200,
      useNativeDriver: true,
    }).start();


    Animated.sequence([
      Animated.delay(2000), // Espera que termine la animación del logo
      Animated.parallel([
        Animated.timing(moveAnimText, {
          toValue: 0, // Mueve el texto hacia su posición original
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnimButtons, {
          toValue: 0, // Mueve los botones hacia su posición original
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/welcome-fond.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.Image
          source={require('../assets/images/logo2.png')}
          style={[
            styles.logo,
            {
              transform: [
                { translateY: moveAnimLogo }, // Animación de movimiento del logo
                { scale: scaleAnimLogo }, // Animación de escala del logo
              ],
            },
          ]}
        />

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: moveAnimText.interpolate({
                inputRange: [0, 200], // Rango de entrada corregido: debe ser ascendente
                outputRange: [1, 0], // Hacerlo visible cuando esté en la posición correcta
              }),
              transform: [{ translateY: moveAnimText }], // Animación de movimiento del texto
            },
          ]}
        >
          ¡Welcome!
        </Animated.Text>
   
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: moveAnimButtons.interpolate({
                inputRange: [0, 200], // Rango de entrada corregido: debe ser ascendente
                outputRange: [1, 0], // Hacerlos visibles cuando estén en la posición correcta
              }),
              transform: [{ translateY: moveAnimButtons }], // Animación de movimiento de los botones
            },
          ]}
        >
          <Button label="Sign Up"  onPress={RegisterScreen}/>
          <Button label="Sign In" onPress={LoginScreen}/>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.ExtraLarge,
    color: '#000',
    textAlign: 'center',
    marginTop: -150,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -100,
    position: 'absolute',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
});
