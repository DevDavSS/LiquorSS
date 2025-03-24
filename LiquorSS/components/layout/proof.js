import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PaymentSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCVV, setNewCardCVV] = useState("");

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

  const addNewCard = () => {
    if (newCardName.trim() && newCardNumber.trim() && newCardExpiry.trim() && newCardCVV.trim()) {
      const maskedNumber = `**** **** **** ${newCardNumber.slice(-4)}`;
      const newCard = { name: newCardName, number: maskedNumber, expiry: newCardExpiry };
      setCards([...cards, newCard]);
      setNewCardName("");
      setNewCardNumber("");
      setNewCardExpiry("");
      setNewCardCVV("");
      setShowAddCardModal(false);
    }
  };

  return (
    <View style={{ paddingHorizontal: 30, backgroundColor: "#fff" }}>
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
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Selecciona una tarjeta</Text>
            <FlatList
              data={cards}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1 }}
                  onPress={() => { setSelectedCard(item); setShowCardsModal(false); }}
                >
                  <Icon name="credit-card" size={20} color="#333" style={{ marginRight: 10 }} />
                  <Text>{`${item.name} - ${item.number} (Exp: ${item.expiry})`}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setShowAddCardModal(true)} style={{ marginTop: 10 }}>
              <Text style={{ color: "blue" }}>Agregar nueva tarjeta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCardsModal(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: "red" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para agregar nueva tarjeta */}
      <Modal visible={showAddCardModal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Nueva Tarjeta</Text>
            <TextInput
              placeholder="Nombre en la tarjeta"
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              value={newCardName}
              onChangeText={setNewCardName}
            />
            <TextInput
              placeholder="Número de tarjeta"
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              keyboardType="numeric"
              value={newCardNumber}
              onChangeText={setNewCardNumber}
              maxLength={16}
            />
            <TextInput
              placeholder="Fecha de vencimiento (MM/AA)"
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              keyboardType="numeric"
              value={newCardExpiry}
              onChangeText={setNewCardExpiry}
              maxLength={5}
            />
            <TextInput
              placeholder="CVV"
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              keyboardType="numeric"
              value={newCardCVV}
              onChangeText={setNewCardCVV}
              maxLength={3}
            />
            <TouchableOpacity onPress={addNewCard} style={{ marginBottom: 10 }}>
              <Text style={{ color: "green" }}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAddCardModal(false)}>
              <Text style={{ color: "red" }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentSelector;
