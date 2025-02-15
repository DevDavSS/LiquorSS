import { Header } from '../components/layout/Header';
import { Logo2 } from '../components/layout/Logo';
import { ButtonClassTwo } from '../components/Controls/Buttons';
import { Wrapper } from '../components/layout/Wrapper';
import {Title} from '../components/layout/Titles'
import {FormItem}  from '../components/Controls/Formitem';
import {BirthdatePicker} from '../components/Controls/Formitem';
import { Content } from '../components/layout/Content';  
import { ScrollView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const goToHome = () => {
    navigation.navigate('Shop');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Header showBack={true} />
      <Logo2 />
      <Title label={"Sign Up"}></Title>
      <Content>
        <FormItem label="Nombre de usuario" placeholder="Your user" />
        <FormItem label="Correo Electronico" placeholder="Your Email" />

        <BirthdatePicker label={"Fecha de Nacimiento"}></BirthdatePicker>
        <FormItem label="Contraseña" placeholder="Your password" />
        <ButtonClassTwo label="ACCEDER" onPress={goToHome} />
      </Content>      
    </ScrollView>

    
  );
}

