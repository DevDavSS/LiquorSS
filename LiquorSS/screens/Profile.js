import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Wrapper} from '../components/layout/Wrapper'
import {Content} from '../components/layout/Content'
import { ProfImage2 } from '../components/layout/ProfImage';
import { Title } from '../components/layout/Titles';
import Fonts from '../constants/Fonts';
import { InfoLine } from '../components/Controls/InfoLine';
import { ButtonClassTwo } from '../components/Controls/Buttons';


export default function Profile() {
  return (
    <View>
      <Wrapper>
        <Content>
          <Title label={"Profile"}></Title>
        <ProfImage2></ProfImage2>
        <Text style={styles.UserName}>Kimberly Wexler</Text>          
        </Content>
        <Content>
          <View style={styles.container}>
            <InfoLine label={"User: "} information={"kim Wexler"}></InfoLine>
            <InfoLine label={"Number: "}  information={"558293844"}></InfoLine>
            <InfoLine label={"Email: "}  information={"SaulGdMan@gmail.com"}></InfoLine>
            <InfoLine label={"Birth Date: "}  information={"12/12/1990"}></InfoLine>
            <InfoLine label={"Password: "}  information={"123234"}></InfoLine>            
          </View>
          <View  style={styles.editButton}>
            <ButtonClassTwo label={"Edit Infomation"}>
            </ButtonClassTwo>
          </View>

        </Content>
      </Wrapper>



    </View>
  );
}
const styles = StyleSheet.create({
    UserName:{
      fontFamily: Fonts.family.regular,
      fontSize: Fonts.size.large,
      marginTop: 20
    },
    container: {
      marginTop:40,
    },
    editButton:{
      width:"70%",
      height:"20%",
      marginBottom:40
    }


})