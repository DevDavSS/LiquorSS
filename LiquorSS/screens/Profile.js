import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Wrapper } from '../components/layout/Wrapper';
import { Content } from '../components/layout/Content';
import { ProfImage2 } from '../components/layout/ProfImage';
import { Title } from '../components/layout/Titles';
import Fonts from '../constants/Fonts';
import { InfoLine } from '../components/Controls/InfoLine';
import { ButtonClassTwo } from '../components/Controls/Buttons';
import { auth, db } from '../firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Importar el ícono de historial

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({
    full_name: '',
    email: '',
    birthdate: ''
  });

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setEditedData({
            full_name: data.full_name || '',
            email: data.email || '',
            birthdate: data.birthdate || ''
          });
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "usuarios", user.uid);
      await setDoc(userRef, editedData, { merge: true });

      setUserData((prevState) => ({ ...prevState, ...editedData }));
      setModalVisible(false);
      Alert.alert("Éxito", "Los datos se actualizaron correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudo actualizar la información");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No se encontraron datos de usuario</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Wrapper>
        <Content>
          <Title label="Perfil" />
          <ProfImage2 />
          <Text style={styles.UserName}>{userData.full_name || 'No name'}</Text>
        </Content>
        <Content>
          <View style={styles.container}>
            <InfoLine label="Usuario: " information={userData.full_name || 'No disponible'} />
            <InfoLine label="Email: " information={userData.email || 'No disponible'} />
            <InfoLine label="Fecha de nacimiento: " information={userData.birthdate || 'No disponible'} />
          </View>

          {/* Botón de Editar Información y el icono del historial */}
          <View style={styles.buttonRow}>
          <ButtonClassTwo label="Editar Información" onPress={() => setModalVisible(true)} style={styles.smallButton} />
          <TouchableOpacity 
            style={styles.historyButton} 
            onPress={() => navigation.navigate("purchaseHistory")}
          >
            <MaterialIcons name="book" size={30} color="black" />
          </TouchableOpacity>
        </View>
        </Content>
      </Wrapper>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Información</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={editedData.full_name}
                onChangeText={(text) => setEditedData({ ...editedData, full_name: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={editedData.email}
                onChangeText={(text) => setEditedData({ ...editedData, email: text })}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento"
                value={editedData.birthdate}
                onChangeText={(text) => setEditedData({ ...editedData, birthdate: text })}
            />

            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: Fonts.family.regular,
  },
  UserName: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.large,
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: Fonts.family.regular,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    marginTop: 10,
    width: 250,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  saveButton: { color: "black", fontSize: 18, marginTop: 10, fontFamily: Fonts.family.regular },
  cancelButton: { color: "black", fontSize: 18, marginTop: 20, fontFamily: Fonts.family.regular },
  
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,

  },
  historyButton: {
    marginLeft: 0,
    padding: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    marginTop: 40,
  },
  smallButton: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    fontSize: 14, // Reducido
  },
  
});
