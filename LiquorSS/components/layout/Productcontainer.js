import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Wrapper2 } from "./Wrapper";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");

export default function ProductContainer({ children }) {
  return (
    <Wrapper2>
      <View style={styles.container}>
        {children} 
      </View>
    </Wrapper2>
  );
}



const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    padding: 10,
  
  },

});
