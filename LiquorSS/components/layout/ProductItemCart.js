import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { ProductImage } from "./Productimage";
import Fonts from "../../constants/Fonts";
import { FontAwesome } from "@expo/vector-icons";
import { updateQuantityInCart } from "../../services/firebase"; // Importamos la función para actualizar la cantidad
import { removeFromCart } from "../../services/firebase"; // Importamos la función para eliminar del carrito

export function ProductItemCart({ label, price, productId, onDelete,  }) {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); // Inicializamos totalPrice con 0

  useEffect(() => {
    // Validamos que price y quantity sean números
    const validPrice = typeof price === 'number' && !isNaN(price) ? price : 0; 
    const validQuantity = typeof quantity === 'number' && !isNaN(quantity) ? quantity : 1;

    setTotalPrice(validPrice * validQuantity);
  }, [quantity, price]);

  const handleDelete = async () => {
    console.log("Eliminando producto con ID:", productId);
    await removeFromCart(productId); // Eliminar del carrito
    onDelete(productId); // Eliminar del estado en Cart.js
  };

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return; // Evitar que la cantidad sea menor que 1
    setQuantity(newQuantity);
    await updateQuantityInCart(productId, newQuantity); // Actualizamos la cantidad en Firestore
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ProductImage />
      </View>
      <View style={styles.detailsContainer}>
        {label && <Text style={styles.title}>{label}</Text>}
        {price && <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>} {/* Mostrar el precio total */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(quantity - 1)}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(quantity + 1)}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <FontAwesome name="trash" size={24} color={Colors.wine} />
        </TouchableOpacity>
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: Colors.white,
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    padding: 10,
  },
  detailsContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.medium,
    color: Colors.wine,
    textAlign: "center",
    marginBottom: 5,
  },
  price: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
    color: Colors.wine,
    textAlign: "center",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.wine,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  quantityText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  deleteButton: {
    marginTop: 10,
    alignItems: "center",
  },
});
