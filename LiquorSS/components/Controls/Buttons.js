import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export default function Button({ label, type = 'black', onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.container,
      type === 'white' && styles.containerWhite
    ]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

export function ButtonClassTwo({label, type = 'black', onPress}){

  return(
    <TouchableOpacity onPress={onPress} style={[
      styles.container2,
      type === 'white' && styles.containerWhite
    ]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 25,
    paddingVertical: 15,
    width: '350',
    marginBottom:70 ,

    
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
    paddingVertical: 20,
    width: '50%',
    marginTop: 70
  }
});