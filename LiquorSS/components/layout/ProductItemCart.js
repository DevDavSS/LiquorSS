import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { ProductImage } from "./Productimage";
import Fonts from "../../constants/Fonts";
import { FontAwesome } from "@expo/vector-icons";

export function ProductItemCart({ label, price, onDelete }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ProductImage />
      </View>
      <View style={styles.detailsContainer}>
        {label && <Text style={styles.title}>{label}</Text>}
        {price && <Text style={styles.price}>{price}</Text>}
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
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
