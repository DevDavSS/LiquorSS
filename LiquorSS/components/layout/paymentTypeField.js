import React, { useState, useEffect } from "react";
import { TextInput, Modal, View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../../firebase-config";
import { addCreditCard } from "../../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import AddCardModal from "./animatedCardModal"; // Importa el modal animado
import Fonts from "../../constants/Fonts";
const PaymentSelector = () => {
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cards, setCards] = useState([]);
  
  const paymentMethods = [
    { type: "Efectivo", icon: "money" },
    { type: "Tarjeta", icon: "credit-card" },
    { type: "PayPal", icon: "paypal" }
  ];

  const selectMethod = (method) => {
    setSelectedMethod(method);
    if (method === "Tarjeta") {
      setShowCardsModal(true);
    }
  };

  useEffect(() => {
    const fetchCardItems = () => {
      const user = auth.currentUser;
      if (!user) return;

      const cardRef = collection(db, "usuarios", user.uid, "tarjetas");

      const unsubscribe = onSnapshot(cardRef, (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCards(items);
        setLoading(false);
      }, (error) => {
        console.error("Error al obtener tarjetas:", error);
        setLoading(false);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchCardItems();
    return () => unsubscribe && unsubscribe();
  }, []);

  const addNewCard = async (cardData) => {
    const { cardNumber, cardName, expiryDate, cvv } = cardData;

    if (!cardName.trim() || !cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      Alert.alert("Error", "El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      Alert.alert("Error", "Formato de fecha incorrecto. Usa MM/AA.");
      return;
    }

    const maskedNumber = `**** **** **** ${cardNumber.slice(-4)}`;
    const newCard = { 
      name: cardName, 
      number: maskedNumber, 
      expiry: expiryDate,
      cvv: cvv
    };

    try {
      await addCreditCard(newCard);
      setShowAddCardModal(false); // Cierra el modal después de guardar la tarjeta
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error);
      Alert.alert("Error", "No se pudo guardar la tarjeta.");
    }
  };

  return (
    <View style={{ paddingHorizontal: 10, backgroundColor: "#fff" }}>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.type}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            marginVertical: 5,
            backgroundColor: "#fff",
          }}
          onPress={() => selectMethod(method.type)}
        >
          <Icon name={method.icon} size={30} color="#333" />
          <Text style={{ fontSize: 18 }}>{method.type}</Text>
          {selectedMethod === method.type && (
            selectedMethod === "Tarjeta" && selectedCard ? (
              <Text>{`${selectedCard.name} - ${selectedCard.number}`}</Text>
            ) : (
              <Icon name="check" size={20} color="green" />
            )
          )}
        </TouchableOpacity>
      ))}

      {/* Modal para seleccionar tarjeta */}
      <Modal visible={showCardsModal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%", alignSelf: "center" }}>
            <Text style={{ fontSize: 18, marginBottom: 10, fontFamily:Fonts.family.regular }}>Selecciona una tarjeta</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff"  />
            ) : cards.length === 0 ? (
              <Text style={{ textAlign: "center", marginVertical: 10 }}>No tienes tarjetas guardadas</Text>
            ) : (
              <FlatList
                data={cards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center", padding: 20, borderBottomWidth: 1 }}
                    onPress={() => {
                      setSelectedCard(item);
                      setShowCardsModal(false);
                    }}
                  >
                    <Icon name="credit-card" size={20} color="#333" style={{ marginRight: 10 }} />
                    <Text>{`${item.name} - ${item.number} (Exp: ${item.expiry})`}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity onPress={() => setShowAddCardModal(true)} style={{ marginTop: 20, alignItems: "center" , }}>
              <Text style={{ color: "black" , fontFamily:Fonts.family.regular, padding:10}}>Agregar nueva tarjeta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowCardsModal(false)} style={{ marginTop: 20, alignItems: "center" }}>
              <Text style={{ color: "black" ,fontFamily:Fonts.family.regular, padding:10}}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para agregar nueva tarjeta con animación */}
      <AddCardModal 
        visible={showAddCardModal} 
        onClose={() => setShowAddCardModal(false)} 
        onSave={addNewCard}  // Pasamos la función addNewCard al modal
      />
    </View>
  );
};

export default PaymentSelector;
