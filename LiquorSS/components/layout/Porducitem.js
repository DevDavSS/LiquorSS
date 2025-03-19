import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ButtonClassTree } from '../Controls/Buttons';
import Colors from "../../constants/Colors";
import { ProductImage } from "./Productimage";
import Fonts from "../../constants/Fonts";
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { getDocs, updateDoc } from "firebase/firestore";
const addToCart = async (product) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    return;
  }

  try {
    const userCartRef = collection(db, "usuarios", user.uid, "carrito");

    // Verificar si el producto ya está en el carrito
    const querySnapshot = await getDocs(userCartRef);
    const existingProduct = querySnapshot.docs.find(doc => doc.data().product_name === product.product_name);

    if (existingProduct) {
      // Si el producto ya existe, actualizamos la cantidad
      const productRef = existingProduct.ref;
      await updateDoc(productRef, {
        quantity: existingProduct.data().quantity + 1, // Acumula la cantidad
      });
      alert("Cantidad del producto actualizada");
    } else {
      // Si el producto no existe, lo agregamos al carrito con quantity = 1
      await addDoc(userCartRef, {
        product_name: product.product_name,
        price: product.price,
        quantity: 1, // Inicializamos la cantidad en 1
      });
      alert("Producto agregado al carrito");
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
  }
};



export function ProductItem({ product }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ProductImage />
      </View>
      {product.product_name && <Text style={styles.title}>{product.product_name}</Text>}
      {product.price && <Text style={styles.price}>${product.price}</Text>}
      <View style={styles.buttonContainer}>
        <ButtonClassTree label={"Agregar al carrito"} onPress={() => addToCart(product)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: 10, 
    backgroundColor: Colors.white,
    height: 300,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%", 
    height: "70%", 
    overflow: "hidden", 
    justifyContent: "center",
  },
  buttonContainer: {
    width: "90%",
    alignItems: "center",
    height: 85,
    marginTop: 200,
    position: "absolute"
  },
  title: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
    color: Colors.wine,
    textAlign: 'center',
  },
  price: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
    color: Colors.wine,
    textAlign: 'center',
  },
});
