import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { auth, db } from "../../firebase-config"; // Asumiendo que estás utilizando Firebase
import { collection, query, where, getDocs } from "firebase/firestore";
import getCoordinatesFromAddress from "../../services/googleServices";
import { useFocusEffect } from "@react-navigation/native"; // Agrega esta importación
import { Title, SubTitle } from "./Titles";
import Colors from "../../constants/Colors";
import mapStyle from "../../constants/mapStyles";
export default function MapViewComponent() {

  

  const [origin, setOrigin] = useState({
    latitude: 19.432608, // CDMX - Zócalo
    longitude: -99.133209,
  });

  const [destination, setDestination] = useState({
    latitude: 19.390519, // CDMX - Estadio Azteca
    longitude: -99.14964,
  });

  const [routeCoords, setRouteCoords] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null); // Dirección activa

  // Llamar a getActiveAddress cada vez que la pantalla se enfoque
  useFocusEffect(
    React.useCallback(() => {
      getActiveAddress(); // Obtiene la dirección activa cada vez que la pantalla se enfoca
    }, [])
  );

  useEffect(() => {
    if (activeAddress) {
      getRouteCoordinates(activeAddress, destination); // Llama a la API de rutas cuando la dirección cambia
    }
  }, [activeAddress, destination]);

  const getActiveAddress = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const addressRef = collection(db, "usuarios", user.uid, "adresses");
      const q = query(addressRef, where("status", "==", "1")); // Filtra por estado activo

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const activeDoc = querySnapshot.docs[0];
        const activeData = activeDoc.data();

        // Si las coordenadas no están disponibles en activeData, obtenerlas mediante geocodificación
        if (!activeData.latitude || !activeData.longitude) {
          const address = `${activeData.street}, ${activeData.number}, ${activeData.colony}, ${activeData.city}`;
          const coords = await getCoordinatesFromAddress(address);
          if (coords) {
            activeData.latitude = coords.latitude;
            activeData.longitude = coords.longitude;
          }
        }
        
        setActiveAddress(activeData); // Establece la dirección activa con las coordenadas
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

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        customMapStyle={mapStyle} // Aplica el estilo personalizado aquí
      >
        {/* Origen: Dirección predeterminada */}
        <Marker coordinate={origin} title="Origen - Zócalo" />

        {/* Destino: Dirección activa obtenida de Firebase */}
        {activeAddress && activeAddress.latitude && activeAddress.longitude && (
          <Marker
            coordinate={{
              latitude: activeAddress.latitude,
              longitude: activeAddress.longitude,
            }}
            title="Destino - Dirección Activa"
          />
        )}

        {/* Destino fijo: Estadio Azteca */}
        <Marker coordinate={destination} title="Destino - Estadio Azteca" />

        {/* Ruta */}
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="blue" />}
      </MapView>        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: "100%",
    height: "95%",  // Ajusta el tamaño del contenedor del mapa si es necesario
    justifyContent: "center",
    alignItems: "center",  // Centra el mapa
    backgroundColor: Colors.lightGray,
  },
  map: {
    width: "90%",  // El mapa ocupa el 90% del ancho del contenedor
    height: "100%", // El mapa ocupa el 100% del contenedor
  },
});
