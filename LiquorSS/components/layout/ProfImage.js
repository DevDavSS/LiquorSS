
import { View, StyleSheet, Text, Image} from "react-native";

export function ProfImage(){

    return(
        <View>
              <Image
                source={require('../../assets/images/saul.png')}  // Usar require() para la imagen local
                style={styles.image}
              />
        </View>
    )

}
export function ProfImage2(){

    return(
        <View>
              <Image
                source={require('../../assets/images/kim.png')}  // Usar require() para la imagen local
                style={styles.image}
              />
        </View>
    )

}

const styles = StyleSheet.create({
    image: {
        marginTop:10,
        
        width: 160,
        height: 160,
        borderRadius: 70, // Imagen circular
    }
})