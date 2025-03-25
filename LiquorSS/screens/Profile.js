import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Wrapper} from '../components/layout/Wrapper'
import {Content} from '../components/layout/Content'
import { ProfImage2 } from '../components/layout/ProfImage';
import { Title } from '../components/layout/Titles';
import Fonts from '../constants/Fonts';
import { InfoLine } from '../components/Controls/InfoLine';
import { ButtonClassTwo } from '../components/Controls/Buttons';
import { auth, db } from '../firebase-config';
import { collection } from 'firebase/firestore';


export default function Profile() {

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = collection(db, "usuarios").doc(user.uid);
        const doc = await userRef.get();

        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setUser(doc.data());
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <View>
      <Wrapper>
        <Content>
          <Title label={"Profile"}></Title>
        <ProfImage2></ProfImage2>
        <Text style={styles.UserName}></Text>          
        </Content>
        <Content>
          <View style={styles.container}>
            <InfoLine label={"User: "  } information={"doc.full_name"}></InfoLine>

            <InfoLine label={"Email: "}  information={"SaulGdMan@gmail.com"}></InfoLine>
            <InfoLine label={"Birth Date: "}  information={"12/12/1990"}></InfoLine>
        
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