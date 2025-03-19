import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Logo2 } from '../components/layout/Logo';
import { ButtonClassTwo } from '../components/Controls/Buttons';
import { Title } from '../components/layout/Titles';
import { FormItem } from '../components/Controls/Formitem';
import { BirthdatePicker } from '../components/Controls/Formitem';
import { Content } from '../components/layout/Content';
import { ScrollView, Alert } from 'react-native';
import { registerEmailPass } from '../services/firebase'; 

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: '',

  });
  const [loading, setLoading] = useState(false);

  const goToHome = () => {
    navigation.navigate('Shop'); 
  };
  const registerUser = async () => {
    if (!user.username || !user.password || !user.email || !user.birthdate) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }
    setLoading(true);

    console.log('Datos del usuario antes del registro:', user); 
  
    const result = await registerEmailPass({
      email: user.email,
      full_name: user.username,
      password: user.password,
      birthdate: user.birthdate, 
    });

  
    if (result) {
      console.log('Registro exitoso');
      setLoading(false);
      goToHome(); 
    } else {
      console.log('Error en el registro');
      setLoading(false);
    }
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Header showBack={true} />
      <Logo2 />
      <Title label={"Sign Up"} />
      <Content>
      <FormItem
        label="Nombre de usuario"
        placeholder="Your user"
        value={user.username}
        onChange={(value) => setUser((prev) => ({ ...prev, username: value }))} 
/>
        <FormItem
          label="Correo Electrónico"
          placeholder="Your Email"
          value={user.email}
          onChange={(value) => setUser((prev) => ({ ...prev, email: value }))}
        />
        <BirthdatePicker
          label="Fecha de Nacimiento"
          value={user.birthdate} 
          onChange={(date) => setUser((prev) => ({ ...prev, birthdate: date.toISOString().split('T')[0] }))} //metodo para recibir el valor de la fe`cha de nacimiento
        />

        <FormItem
          label="Contraseña"
          placeholder="Your password"
          secure={true}
          value={user.password}
          onChange={(value) => setUser((prev) => ({ ...prev, password: value }))}
        />
        <ButtonClassTwo
          label="REGISTRARME"
          onPress={registerUser}
          isLoading={loading} 
        />
      </Content>
    </ScrollView>
  );
}
