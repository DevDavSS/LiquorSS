import React from "react";
import { View, StyleSheet } from "react-native";
import MapViewComponent from "../components/layout/MapViewComponent";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { Title, SubTitle } from "../components/layout/Titles";
export default function OrderTracking() {
  return (
    <View style={styles.container}>
      <SubTitle label={"Rasreo de pedido"}/>

      <MapViewComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
