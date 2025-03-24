import React, { useState, useEffect, useRef } from "react";
import { TextInput, Modal, View, Text, TouchableOpacity, Animated, StyleSheet, Image } from "react-native";
import Fonts from "../../constants/Fonts";
const AddCardModal = ({ visible, onClose, onSave }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Tarjeta animada */}
          <View style={styles.cardContainer}>
            <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}> 
              {/* Chip en la tarjeta */}
              <View style={styles.chip}>
                <View style={styles.chipInner}></View>
              </View>

              {/* Logotipo MasterCard */}
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/MasterCard_logo.svg/600px-MasterCard_logo.svg.png' }} // URL del logotipo de MasterCard
                style={styles.masterCardLogo}
              />

              <Text style={styles.cardNumber}>{cardNumber || "**** **** **** ****"}</Text>
              <Text style={styles.cardName}>{cardName || "Nombre del Titular"}</Text>
              <Text style={styles.cardExpiry}>{expiryDate || "MM/AA"}</Text>
            </Animated.View>
            <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}> 
              <Text style={styles.cvvLabel}>CVV</Text>
              <Text style={styles.cvv}>{cvv || "***"}</Text>
            </Animated.View>
          </View>

          {/* Formulario de entrada */}
          <TextInput placeholder="Número de tarjeta" style={styles.input} keyboardType="numeric" 
            value={cardNumber} onChangeText={setCardNumber} maxLength={16} />
          <TextInput placeholder="Nombre en la tarjeta" style={styles.input} 
            value={cardName} onChangeText={setCardName} />
          <TextInput placeholder="Fecha de expiración (MM/AA)" style={styles.input} 
            value={expiryDate} onChangeText={setExpiryDate} maxLength={5} />
          <TextInput placeholder="CVV" style={styles.input} keyboardType="numeric" 
            value={cvv} onChangeText={setCvv} maxLength={3}
            onFocus={() => setIsFlipped(true)}
            onBlur={() => setIsFlipped(false)} />

          {/* Botones */}
          <TouchableOpacity onPress={() => { onSave({ cardNumber, cardName, expiryDate, cvv }); onClose(); }}>
            <Text style={styles.saveButton}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 30, borderRadius: 15, alignItems: "center", width: "90%", alignSelf: "center" },
  cardContainer: { width: 300, height: 180, marginBottom: 20, position: "relative" },
  card: { 
    position: "absolute", 
    width: "100%", 
    height: "100%", 
    backgroundColor: "#3B3B3B", // Color más suave
    justifyContent: "center", 
    borderRadius: 15, // Bordes más redondeados
    padding: 15, 
    backfaceVisibility: "hidden", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 5,  // Sombra en Android
  },
  cardBack: { 
    backgroundColor: "#333", 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: 15,
  },
  cardNumber: { color: "white", fontSize: 22, textAlign: "center" },
  cardName: { color: "white", fontSize: 14, textAlign: "center", marginTop: 10 },
  cardExpiry: { color: "white", fontSize: 14, textAlign: "center", marginTop: 5 },
  cvvLabel: { color: "white", fontSize: 14 },
  cvv: { color: "white", fontSize: 20, fontWeight: "bold" },

  // Diseño del chip de la tarjeta
  chip: {
    position: "absolute",
    top: 20,
    left: 30,
    width: 40,
    height: 25,
    backgroundColor: "#D1D1D1",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  chipInner: {
    width: 20,
    height: 10,
    backgroundColor: "#B0B0B0",
    borderRadius: 3,
  },

  // Logotipo de MasterCard
  masterCardLogo: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 10, 
    marginBottom: 15, 
    width: 250, 
    borderRadius: 10,  // Bordes redondeados
    backgroundColor: "#f9f9f9" // Fondo suave para los inputs
  },
  saveButton: { color: "black", fontSize: 18, marginTop: 10,fontFamily: Fonts.family.regular },
  cancelButton: { color: "black", fontSize: 18, marginTop: 20, fontFamily: Fonts.family.regular },
});

export default AddCardModal;
