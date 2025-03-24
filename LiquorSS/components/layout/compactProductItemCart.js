import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { ProductImage } from "./Productimage";
import Fonts from "../../constants/Fonts";
import { updateQuantityInCart } from "../../services/firebase"; // Importamos la función para actualizar la cantidad

export function CompactProductItemCart({ label, price, productId }) {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const validPrice = typeof price === 'number' && !isNaN(price) ? price : 0;
    const validQuantity = typeof quantity === 'number' && !isNaN(quantity) ? quantity : 1;
    setTotalPrice(validPrice * validQuantity);
  }, [quantity, price]);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    await updateQuantityInCart(productId, newQuantity);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ProductImage />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(quantity - 1)}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(quantity + 1)}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    minHeight: 70, // Asegura que el contenedor no sea más grande que el necesario
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5, // Reducir el padding vertical
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
    color: Colors.wine,
  },
  price: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
    color: Colors.wine,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: Colors.wine,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  quantityText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.black,
  },
});
