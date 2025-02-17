import React, { useRef } from 'react';
import { Header } from '../components/layout/Header';
import { Logo2 } from '../components/layout/Logo';
import { ButtonClassTwo } from '../components/Controls/Buttons';
import { Title } from '../components/layout/Titles';
import { FormItem } from '../components/Controls/Formitem';
import { StyleSheet, View, Alert } from "react-native";
import { Content } from '../components/layout/Content';
import { loginWithEmailPass } from '../services/firebase';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const validCredentials = {
  full_name: 'usuario',
  password: 'contraseña'
};

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState({
    username: '',
    password: '',

  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async() =>{
    setLoading(true);
    const result = await loginWithEmailPass ({
      full_name: user.username,
      password: user.password,

    })
  if (result){
    setLoading(false)
    navigation.navigate('Shop');
  }
  }

  return (
    <ScrollView>

    <View>
      <Header showBack />
      <Logo2 />
      <Title label="Sign In" />

      <View style={styles.customContentContainer}>
        <Content>
          <FormItem 
            label="Nombre de usuario" 
            placeholder="Your user" 
            onChangeText={(text) => (usernameRef.current = text)}
          />
          <FormItem 
            label="Contraseña" 
            placeholder="Your password" 
            onChangeText={(text) => (passwordRef.current = text)}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <ButtonClassTwo label="ACCEDER" onPress={handleLogin} isLoading={loading} />
          </View>
        </Content>
      </View>
    </View>      
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  customContentContainer: {
    marginTop: 70,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50
  }
});