import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase-config";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const PurchaseHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const ordersRef = collection(doc(db, "usuarios", user.uid), "orderHistory");
        
        // Usando onSnapshot para obtener actualizaciones en tiempo real
        const unsubscribe = onSnapshot(ordersRef, (ordersSnapshot) => {
          const ordersList = ordersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersList);
          setLoading(false);
        });
        
        // Limpiar la suscripción cuando el componente se desmonte
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching order history:", error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando historial...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Compras</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>ID: {item.id}</Text>
            <Text style={styles.orderText}>Fecha: {item.date}</Text>
            <Text style={styles.orderText}>Total: ${item.total}</Text>
            <TouchableOpacity style={styles.detailsButton} onPress={() => openModal(item)}>
              <Text style={styles.detailsButtonText}>Ver Detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal de Detalles */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles de la Compra</Text>
            {selectedOrder && (
              <>
                <Text style={styles.modalText}>ID: {selectedOrder.id}</Text>
                <Text style={styles.modalText}>Fecha: {selectedOrder.date}</Text>
                <Text style={styles.modalText}>Total: ${selectedOrder.total}</Text>
                <Text style={styles.modalText}>Productos:</Text>
                <FlatList
                  data={selectedOrder.products}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Text style={styles.modalText}>- {item.productName} (${item.price})</Text>
                  )}
                />
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PurchaseHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.family.regular,
    color: Colors.primary,
    marginBottom: 20,
  },
  orderItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  orderText: {
    fontSize: 16,
    fontFamily: Fonts.family.regular,
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  detailsButtonText: {
    color: Colors.alblack,
    fontSize: 16,
    fontFamily: Fonts.family.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontFamily: Fonts.family.regular,
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
    fontSize: 20,
    fontFamily: Fonts.family.bold,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontFamily: Fonts.family.regular,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
  },
});
