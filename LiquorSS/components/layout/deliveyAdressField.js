import React, { useState, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, Modal, TextInput, Button, 
  StyleSheet, FlatList, ActivityIndicator 
} from "react-native";
import Colors from "../../constants/Colors";
import { addNewAddress, updateAddressStatus } from "../../services/firebase";  // Asegúrate de tener esta función en tu servicio
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { FontAwesome as Icon } from "@expo/vector-icons"; 
import Fonts from "../../constants/Fonts";


const AddressSelector = () => {
  const [city, setCity] = useState("");
  const [colony, setColony] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);


  useEffect(() => {
    const fetchAddressItems = () => {
      const user = auth.currentUser;
      if (!user) return;
    
      const addressRef = collection(db, "usuarios", user.uid, "adresses");
    
      const unsubscribe = onSnapshot(
        addressRef,
        (querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          setAddress(items);  // Asegúrate de que `items` sea un array de direcciones
          setLoading(false);
        },
        (error) => {
          console.error("Error al obtener las direcciones:", error);
          setLoading(false);
        }
      );
    
      return unsubscribe;
    };
    

    const unsubscribe = fetchAddressItems();
    return () => unsubscribe && unsubscribe();
  }, []);


  const saveAddress = async (adress) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("No hay usuario autenticado");
            return;
        }

        const { city, colony, street, number } = adress;

        // Validar que todos los valores estén definidos y no sean cadenas vacías
        if (!city || !colony || !street || !number) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        const newAddress = { city, colony, street, number };

        await addNewAddress(newAddress); // Guarda en Firebase
        setSelectedAddress(`${street} #${number}, ${colony}, ${city}`);
        setModalVisible(false);

    } catch (error) {
        console.error("Error al guardar la dirección:", error);
    }
};
const handleAddressSelection = async (selectedAddress) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    // Establecer la dirección seleccionada
    setSelectedAddress(`${selectedAddress.street}, ${selectedAddress.number}, ${selectedAddress.colony}, ${selectedAddress.city}`);

    // Obtener la referencia a la dirección seleccionada en Firestore
    const addressRef = doc(db, "usuarios", user.uid, "adresses", selectedAddress.id);

    // Actualizar el estado de la dirección seleccionada a "1" (activo)
    await updateDoc(addressRef, {
      status: "1",  // Asume que 'estado' es el campo que maneja el estado de la dirección
    });

    // Filtrar todas las direcciones y actualizar las demás a "0" (inactivo)
    if (Array.isArray(address)) {
      address.forEach(async (addressItem) => {
        if (addressItem.id !== selectedAddress.id) {
          const otherAddressRef = doc(db, "usuarios", user.uid, "adresses", addressItem.id);
          await updateDoc(otherAddressRef, {
            status: "0",  // Cambiamos el estado a "0" para las demás direcciones
          });
        }
      });
    } else {
      console.error("address no es un array", address);
    }

    // Cerrar el modal de selección
    setAddressModalVisible(false);

  } catch (error) {
    console.error("Error al seleccionar la dirección:", error);
  }
};

  return (
    <View>
      {/* Campo de dirección */}
      <TouchableOpacity style={styles.addressContainer} onPress={() => setAddressModalVisible(true)}>
        <Text style={styles.label}>Your Address</Text>
        <Text style={styles.address}>{selectedAddress || "Selecciona una dirección"}</Text>
      </TouchableOpacity>

      {/* Modal para seleccionar dirección guardada */}
      <Modal visible={addressModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una dirección</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : address.length === 0 ? (
              <Text style={styles.noAddressesText}>No tienes direcciones guardadas</Text>
            ) : (
              <FlatList
                data={address}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.addressItem}
                    onPress={() => handleAddressSelection(item)}
                  >
                    <Icon name="map-marker" size={20} color="#333" style={styles.icon} />
                    <Text>{`${item.street}, ${item.number}, ${item.colony}, ${item.city}`}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Agregar nueva dirección</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAddressModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para ingresar una nueva dirección */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingrese su dirección</Text>

            <TextInput
                style={styles.input}
                placeholder="Ciudad"
                value={city}
                onChangeText={(text) => setCity(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Colonia"
                value={colony}
                onChangeText={(text) => setColony(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Calle"
                value={street}
                onChangeText={(text) => setStreet(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Número"
                value={number}
                onChangeText={(text) => setNumber(text)}
                keyboardType="numeric"
            />


            <TouchableOpacity onPress={() => saveAddress({ city, colony, street, number })}>
              <Text style={styles.saveButton}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "gray",
    fontFamily: Fonts.family.regular,
  },
  address: {
    fontSize: 16,
    fontFamily: Fonts.family.bold,
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
  noAddressesText: {
    textAlign: "center",
    marginVertical: 10,
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  addButton: {
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "black",
    padding: 10,
    fontFamily: Fonts.family.regular,
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "black",
    padding: 10,
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
    backgroundColor: "#f9f9f9"
  },
  saveButton: { color: "black", fontSize: 18, marginTop: 10, fontFamily: Fonts.family.regular },
  cancelButton: { color: "black", fontSize: 18, marginTop: 20, fontFamily: Fonts.family.regular },
});

export default AddressSelector;
