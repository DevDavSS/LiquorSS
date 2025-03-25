import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image, Modal, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { auth, db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import getCoordinatesFromAddress from "../../services/googleServices";
import { useFocusEffect } from "@react-navigation/native"; 
import Colors from "../../constants/Colors";
import mapStyle from "../../constants/mapStyles";
import Fonts from "../../constants/Fonts";
import { useNavigation } from "@react-navigation/native";

export default function MapViewComponent() {
  const [origin, setOrigin] = useState({
    latitude: 20.589290,  
    longitude: -100.389536
  });

  const [destination, setDestination] = useState({
    latitude: 20.589290,  
    longitude: -100.389536
  });

  const [routeCoords, setRouteCoords] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null); 
  const [courierPosition, setCourierPosition] = useState(origin); 
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal

  const mapRef = useRef(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getActiveAddress(); 
    }, [])
  );

  useEffect(() => {
    if (activeAddress) {
      setDestination({
        latitude: activeAddress.latitude,
        longitude: activeAddress.longitude
      });

      getRouteCoordinates(origin, activeAddress); 
    }
  }, [activeAddress]);

  const getActiveAddress = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const addressRef = collection(db, "usuarios", user.uid, "adresses");
      const q = query(addressRef, where("status", "==", "1"));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const activeDoc = querySnapshot.docs[0];
        const activeData = activeDoc.data();

        if (!activeData.latitude || !activeData.longitude) {
          const address = `${activeData.street}, ${activeData.number}, ${activeData.colony}, ${activeData.city}`;
          const coords = await getCoordinatesFromAddress(address);
          if (coords) {
            activeData.latitude = coords.latitude;
            activeData.longitude = coords.longitude;
          }
        }

        setActiveAddress(activeData); 
      }
    } catch (error) {
      console.error("Error al obtener la dirección activa:", error);
    }
  };

  const getRouteCoordinates = async (start, end) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=AIzaSyCokKc54lXPpiSlxcA77Icgo7HU59Y9GhA`
      );
      const data = await response.json();

      if (data.routes.length > 0) {
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setRouteCoords(decodedPoints);
      }
    } catch (error) {
      console.error("Error al obtener la ruta:", error);
    }
  };

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  useEffect(() => {
    if (routeCoords.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < routeCoords.length) {
          setCourierPosition(routeCoords[i]);
          setIndex(i);
          i++;
        } else {
          clearInterval(interval); // Detiene el intervalo una vez que se han recorrido todas las coordenadas
        }
      }, 100);
  
      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
    }
  }, [routeCoords]);

  // Mover el mapa para seguir al repartidor
  useEffect(() => {
    if (courierPosition && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: courierPosition.latitude,
        longitude: courierPosition.longitude,
        latitudeDelta: 0.02,  // Valor menor para acercar más el mapa
        longitudeDelta: 0.02, // Valor menor para acercar más el mapa
      });
    }
  }, [courierPosition]);

  // Verificar si el repartidor ha llegado a su destino usando la fórmula de Haversine
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en kilómetros
    return distance; // Puedes ajustar el valor en metros si lo deseas
  };

  useEffect(() => {
    if (courierPosition && destination) {
      const distance = haversineDistance(
        courierPosition.latitude,
        courierPosition.longitude,
        destination.latitude,
        destination.longitude
      );

      if (distance < 0.1) { // Si la distancia es menor a 100 metros
        setModalVisible(true); // Mostrar el modal cuando el repartidor llegue
      }
    }
  }, [courierPosition, destination]);

  const handleFinishOrder = () => {
    setModalVisible(false); // Cerrar el modal
    navigation.navigate("Shop"); // Navegar a la pantalla de "Shop"
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef} // Asignar el ref al MapView
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          customMapStyle={mapStyle}
        >
          <Marker coordinate={origin} title="Origen - Zócalo" />

          {activeAddress && activeAddress.latitude && activeAddress.longitude && (
            <Marker
              coordinate={{
                latitude: activeAddress.latitude,
                longitude: activeAddress.longitude,
              }}
              title="Destino - Dirección Activa"
            />
          )}

          {courierPosition && (
            <Marker
              coordinate={courierPosition}
              title="Repartidor en camino"
            >
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('../../assets/images/delorean.png')} // Ruta a la imagen
                  style={{
                    width: 50,  // Tamaño ajustado del ícono
                    height: 50, // Tamaño ajustado del ícono
                    resizeMode: 'contain', // Ajusta la imagen sin cortarla
                  }}
                />
              </View>
            </Marker>
          )}

          {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="red" />}
        </MapView>
      </View>

      {/* Modal de pedido finalizado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Pedido Finalizado!</Text>
            <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
              <Text style={styles.buttonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: "100%",
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
  },
  map: {
    width: "90%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.family.bold,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: Fonts.family.regular,
  },
});
