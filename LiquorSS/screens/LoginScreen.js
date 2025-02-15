import { Header } from '../components/layout/Header';
import { Logo2 } from '../components/layout/Logo';
import { ButtonClassTwo } from '../components/Controls/Buttons';
import { Wrapper } from '../components/layout/Wrapper';
import {Title} from '../components/layout/Titles'
import {FormItem} from '../components/Controls/Formitem';
import { StyleSheet, View } from "react-native";
import { Content } from '../components/layout/Content';  


export default function LoginScreen({ navigation }) {
  const goToHome = () => {
    navigation.navigate('Shop');
  };

  return (
   <View>
      <Header showBack={true}/>
      <Logo2/>
      <Title label="Sign In" />
      
      <View style={styles.customContentContainer}>
        <Content>
          <FormItem label="Nombre de usuario" placeholder="Your user" />
          <FormItem label="Contraseña" placeholder="Your password" />
          <View style={styles.Buttom}>
          <ButtonClassTwo label="ACCEDER" onPress={goToHome}  />            
          </View>

        </Content>
      </View>    
   </View>

    
  );
}

const styles = StyleSheet.create({
  customContentContainer: {
    marginTop: 70,
  },
  Buttom:{
    width: "100%",
    alignItems:"center",
    marginTop:50
  }
});

