import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Logo2 } from '../components/layout/Logo';
import { ButtonClassTwo } from '../components/Controls/Buttons';
import { Wrapper } from '../components/layout/Wrapper';
import { Title } from '../components/layout/Titles';
import { FormItem } from '../components/Controls/Formitem';
import { BirthdatePicker } from '../components/Controls/Formitem';
import { Content } from '../components/layout/Content';
import { ScrollView } from 'react-native';
import { registerEmailPass } from '../services/firebase'; // Asegúrate de tener esta función correctamente importada

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: '',

  });
  const [loading, setLoading] = useState(false);

  const goToHome = () => {
    navigation.navigate('Shop'); // Aquí se navegará a la pantalla "Shop" después del registro
  };
  const registerUser = async () => {
    setLoading(true);
    
    console.log('Datos del usuario antes del registro:', user); // Verifica que los valores estén definidos
  
    const result = await registerEmailPass({
      email: user.email,
      full_name: user.username,
      password: user.password,
      birthdate: user.birthdate, // Enviamos la fecha seleccionada
    });
  
    if (result) {
      console.log('Registro exitoso');
      setLoading(false);
      goToHome(); // Navegar a la siguiente pantalla
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
        onChange={(value) => setUser((prev) => ({ ...prev, username: value }))} // Asegúrate de que el onChange esté funcionando
/>
        <FormItem
          label="Correo Electrónico"
          placeholder="Your Email"
          value={user.email}
          onChange={(value) => setUser((prev) => ({ ...prev, email: value }))}
        />
        <BirthdatePicker
          label="Fecha de Nacimiento"
          value={user.birthdate} // Pasamos el valor actual de la fecha
          onChange={(date) => setUser((prev) => ({ ...prev, birthdate: date.toISOString().split('T')[0] }))} // Guardamos la fecha en formato ISO
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
          isLoading={loading} // Mostrar un spinner mientras se registra el usuario
        />
      </Content>
    </ScrollView>
  );
}
