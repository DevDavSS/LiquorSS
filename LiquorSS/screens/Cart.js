import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Animated, TouchableWithoutFeedback } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { Title, SubTitle } from '../components/layout/Titles';
import ProductContainer from '../components/layout/Productcontainer';
import { ProductItemCart } from '../components/layout/ProductItemCart';
import { ButtonClassTwo } from '../components/Controls/Buttons'; // Asegúrate de importar correctamente
import { useNavigation } from '@react-navigation/native';
export default function Cart() {

  const navigation = useNavigation(); // Obtener el objeto navigation
  const gotoOrderPlacing = () => navigation.navigate('Order'); // Función para navegar a la pantalla de orden
  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0); // Estado para el total
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad
  const [translateY] = useState(new Animated.Value(0)); // Animación para mover la vista

  useEffect(() => {
    const fetchCartItems = () => {
      const user = auth.currentUser;
      if (!user) return;

      const cartRef = collection(db, "usuarios", user.uid, "carrito");

      // Usamos `onSnapshot` para escuchar los cambios en tiempo real
      const unsubscribe = onSnapshot(cartRef, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCartItems(items);
        setLoading(false);
        calculateTotal(items); // Calculamos el total al recibir los productos
      }, (error) => {
        console.error("Error al obtener productos del carrito:", error);
        setLoading(false);
      });

      return unsubscribe; // Limpieza del listener cuando el componente se desmonte
    };

    fetchCartItems();
  }, []);

  // Función para calcular el total
  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    setTotal(totalPrice);
  };

  // Función para mostrar/ocultar la sección
  const toggleVisibility = () => {
    const toValue = isVisible ? 100 : 0; // Deslizar hacia abajo si es visible, hacia arriba si no lo es
    setIsVisible(!isVisible);

    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Title label={"Tu Carrito"} />
      <SubTitle label={"Productos seleccionados:"} />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ProductContainer>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <ProductItemCart 
                  key={item.id} 
                  label={item.product_name} 
                  price={item.price} // Pasamos el precio como número, sin formato de "$"
                  productId={item.id}
                  onDelete={handleRemoveItem}  
                  quantity={item.quantity || 1} // Aseguramos de pasar la cantidad
                />
              ))
            ) : (
              <SubTitle label="Tu carrito está vacío" />
            )}
          </ProductContainer>
        </ScrollView>
      )}

      <Animated.View
        style={[styles.totalContainer, { transform: [{ translateY }] }]}>
        <TouchableWithoutFeedback onPress={toggleVisibility}>
          <View>
            <SubTitle label={`Total: $${total.toFixed(2)}`} />
            
          </View>
        </TouchableWithoutFeedback>
        <ButtonClassTwo label={"Pagar"} onPress={gotoOrderPlacing}/> 
      </Animated.View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  totalContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
