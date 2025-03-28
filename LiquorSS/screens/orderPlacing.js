import { View, ScrollView, StyleSheet, ActivityIndicator, Dimensions, Text } from 'react-native';
import { SubTitle } from '../components/layout/Titles';
import DeliveryAddressField from '../components/layout/deliveyAdressField'; // Componente para agregar dirección
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase-config';
import { collection, onSnapshot, doc, deleteDoc, addDoc, getDocs } from 'firebase/firestore';
import { CompactProductItemCart } from '../components/layout/compactProductItemCart';
import ProductContainer from '../components/layout/Productcontainer';
import PaymentSelector from '../components/layout/paymentTypeField';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { ButtonClassTree } from '../components/Controls/Buttons';
import { useNavigation } from '@react-navigation/native';
import MapViewComponent from '../components/layout/MapViewComponent';


export default function OrderPlacing() {
  const [cartItems, setCartItems] = useState([]); // Estado para los productos del carrito
  const [loading, setLoading] = useState(true); // Estado para mostrar el indicador de carga
  const [serviceCost, setServiceCost] = useState(0); // Costo de servicio
  const [shippingCost, setShippingCost] = useState(0); // Costo de envío
  const [selectedAddress, setSelectedAddress] = useState(null); // Estado para la dirección seleccionada

  const navigation = useNavigation(); // Obtener el objeto navigation
  const clearCart = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
  
      const cartRef = collection(db, "usuarios", user.uid, "carrito");
  
      // Obtener todos los productos del carrito
      const querySnapshot = await getDocs(cartRef);
  
      // Eliminar todos los productos del carrito
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      
      // Esperar a que se eliminen todos los productos
      await Promise.all(deletePromises);
  
      console.log("Carrito vacío");
  
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  };
  
  const gotoOrderPlacing = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No hay usuario autenticado");
        return;
      }
  
      // Crear un objeto con los productos del carrito y el total
      const orderData = {
        products: cartItems.map(item => ({
          productId: item.id,
          productName: item.product_name,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        total: calculateFinalTotal(), // Usamos el total calculado
        date: new Date().toISOString(), // Fecha en formato ISO
      };
  
      // Obtener la referencia de la subcolección "orderHistory"
      const orderRef = collection(db, "usuarios", user.uid, "orderHistory");
  
      // Agregar la nueva orden
      await addDoc(orderRef, orderData);
  
      console.log("Orden registrada en el historial");
  
      // Vaciar el carrito después de realizar el pedido
      await clearCart();
  
      // Navegar a la pantalla de seguimiento de la orden
      navigation.navigate('OrderTracking');
    
    } catch (error) {
      console.error("Error al registrar la orden:", error);
    }
  };
  

  useEffect(() => {
    const fetchCartItems = () => {
      const user = auth.currentUser;
      if (!user) return;

      const cartRef = collection(db, "usuarios", user.uid, "carrito");

      // Escuchar cambios en tiempo real
      const unsubscribe = onSnapshot(cartRef, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCartItems(items);
        setLoading(false);
      }, (error) => {
        console.error("Error al obtener productos del carrito:", error);
        setLoading(false);
      });

      return unsubscribe; // Se desuscribe cuando el componente se desmonta
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Generar costos de servicio y envío aleatorios
    const randomServiceCost = (Math.random() * 20 + 2).toFixed(2); // Entre 2 y 7
    const randomShippingCost = (Math.random() * 100 + 5).toFixed(2); // Entre 5 y 15
    
    setServiceCost(randomServiceCost);
    setShippingCost(randomShippingCost);
  }, [cartItems]);

  const handleRemoveItem = async (productId) => {
    // Función para eliminar un producto del carrito
    try {
      const user = auth.currentUser;
      if (!user) return;

      await deleteDoc(doc(db, "usuarios", user.uid, "carrito", productId));

      // Filtrar los productos en local para actualizar la UI inmediatamente
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Calcular el total de los productos
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  // Calcular el total final
  const calculateFinalTotal = () => {
    const totalProducts = parseFloat(calculateTotal());
    return (totalProducts + parseFloat(serviceCost) + parseFloat(shippingCost)).toFixed(2);
  };

  const handleAddressSelection = (address) => {
    setSelectedAddress(address); // Actualizar la dirección seleccionada
  };

  return (
    <View style={styles.container}>
      <SubTitle label="Place your order" />
      
      {/* Componente DeliveryAddressField para seleccionar la dirección */}
      <DeliveryAddressField onAddressSelect={handleAddressSelection} />

      {/* ScrollView para los productos */}
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollContainer}>
        <ProductContainer>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : cartItems.length > 0 ? (
            cartItems.map(item => (
              <CompactProductItemCart
                key={item.id} 
                label={item.product_name} 
                price={item.price}
                productId={item.id}
                onDelete={handleRemoveItem}  
                quantity={item.quantity || 1}
              />
            ))
          ) : (
            <SubTitle label="Tu carrito está vacío" />
          )}
        </ProductContainer>
      </ScrollView>

      <ScrollView style={styles.costsContainer}>
        <SubTitle label="Metodo de pago" />
        <View style={styles.paymentContainer}>
          <PaymentSelector />
        </View>

        {/* ScrollView para los costos */}
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Total Productos:</Text>
          <Text style={styles.costValue}>${calculateTotal()}</Text>
        </View>
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Costo del Servicio:</Text>
          <Text style={styles.costValue}>${serviceCost}</Text>
        </View>
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Costo de Envío:</Text>
          <Text style={styles.costValue}>${shippingCost}</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TOTAL A PAGAR:</Text>
          <Text style={styles.totalValue}>${calculateFinalTotal()}</Text>
          <ButtonClassTree label={"Place order"} onPress={gotoOrderPlacing} />
        </View>
      </ScrollView>

      {/* Mapa con la ruta si hay una dirección seleccionada */}
      {selectedAddress && (
        <MapViewComponent destination={selectedAddress} />
      )}
    </View> 
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    height: screenHeight * 0.4, // 40% de la pantalla para los productos
  },
  scrollContent: {
    paddingBottom: 30,
  },
  paymentContainer: {
    height: screenHeight * 0.25, // 25% de la pantalla para el método de pago
    width: "100%",
    justifyContent: "flex-start", 
    marginTop: -20, // Reducir margen superior
  },
  costsContainer: {
    marginTop: 10,
    paddingHorizontal: "3.5%",
    paddingBottom: 20,
  },
  costItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  costLabel: {
    fontSize: 16,
    color: "#333",
    fontFamily: Fonts.family.regular,
  },
  costValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: Fonts.family.regular,
  },
  totalContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    color: "#333",
    fontFamily: Fonts.family.regular,
  },
  totalValue: {
    fontSize: 24,
    color: Colors.wine, // Color destacado para el total
    fontFamily: Fonts.family.regular,
  },
});
