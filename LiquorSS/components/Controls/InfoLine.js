import { View, Text, StyleSheet } from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import React from 'react';

export function InfoLine({ label, information }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {information && <Text style={styles.informationStyle}>{information}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribuye los elementos a lo largo del eje horizontal
    alignItems: 'center', // Alinea verticalmente los elementos
    marginBottom: 10,
    width: '95%',
    marginTop: 40,
    borderBottomColor: Colors.wine,
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  label: {
    color: Colors.wine,
    fontSize: 15,
    fontFamily: Fonts.family.regular,
    textAlign: 'left',
  },
  informationStyle: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: Fonts.family.regular,
    textAlign: 'right', // Alinea el texto del segundo elemento a la derecha
  },
});
