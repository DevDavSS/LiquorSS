import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Logo2 } from '../components/layout/Logo';
import { ButtonClassTwo } from '../components/Controls/Buttons';
import { Title } from '../components/layout/Titles';
import { FormItem } from '../components/Controls/Formitem';
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import { Content } from '../components/layout/Content';
import { loginWithEmailPass } from '../services/firebase';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!user.username || !user.password) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    setLoading(true);
    
    console.log(user.username, user.password)
    const result = await loginWithEmailPass(user.username, user.password);
    if (result) {
      setLoading(false);
      navigation.navigate('Shop');
      
    } else {
      
      setLoading(false);
    
    }
  };

  return (
    <ScrollView>
      <View>
        <Header showBack />
        <Logo2 />
        <Title label="Sign In" />

        <View style={styles.customContentContainer}>
          <Content>
            <FormItem 
              label="Correo Electronico" 
              placeholder="Your email" 
              value={user.username}
              onChange={(text) => setUser({...user, username: text})} 
            />
            <FormItem 
              label="Contraseña" 
              placeholder="Your password" 
              value={user.password}
              onChange={(text) => setUser({...user, password: text})} 
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
