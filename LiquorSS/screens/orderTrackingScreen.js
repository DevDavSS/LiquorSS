import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapViewComponent from "../components/layout/MapViewComponent";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { Title, SubTitle } from "../components/layout/Titles";
import DeliveryManContainer from "../components/layout/deliveryManSection";


export default function OrderTracking() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Rasreo de pedido</Text>
      <Text style={styles.title1}>Hora estimada de llegada: </Text>
      <Text style={styles.title1}>11:34pm - 12:10am</Text>
      <MapViewComponent />
      <DeliveryManContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title1: {
    fontSize: 18,
    fontFamily: Fonts.family.regular,
    color: Colors.primary,
    marginLeft: 30,

    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginLeft: 30,
    marginTop: -10,
    marginBottom: 10,
  },
});
