import {View, StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

export function Content({children}) {
    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems:'center',

        justifyContent: 'center',
        paddingHorizontal: 40,
   
       
    }

})