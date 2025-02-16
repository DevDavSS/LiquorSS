import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export default function Button({ label, type = 'black', onPress, isLoading = false }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.container, 
        type === 'white' && styles.containerWhite, 
        isLoading && styles.disableButton,
      ]}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator style={styles.activity} color={Colors.white} />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export function ButtonClassTwo({ label, type = 'black', onPress, isLoading = false }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.container2, 
        type === 'white' && styles.containerWhite, 
        isLoading && styles.disableButton,
      ]}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator style={styles.activity} color={Colors.white} />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export function ButtonClassTree({ label, type = 'black', onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.container2, 
      type === 'white' && styles.containerWhite
    ]}>
      <Text style={styles.text2}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activity: {
    marginRight: 10,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 25,
    paddingVertical: 15,
    width: 350, // Cambié de '350' a 350
    marginBottom: 70,
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.normal,
  },
  containerWhite: {
    borderColor: Colors.white,
    borderRadius: 10,
    borderWidth: 2,
  },
  container2: {
    alignItems: 'center',
    backgroundColor: Colors.wine,
    borderRadius: 10,
    paddingVertical: 10,
    width: '90%',
    marginTop: 50,
  },
  text2: {
    color: Colors.white,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
  },
  disableButton: {
    opacity: 0.5, // O agrega un estilo de desactivación visual para el botón
  }
});
