import { View, ScrollView,StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
export function Wrapper ({ children, backgroundColor }) {
  return (
    <View style={[
      styles.container,
      { backgroundColor }
    ]}>
      <ScrollView>
        {children}
      </ScrollView>
    </View>
  );
};
export function Wrapper2 ({ children, backgroundColor }) {
  return (
    <View style={[
      styles.container2,
      { backgroundColor }
    ]}>
      <ScrollView>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ghostWhite,
    alignItems:"center",

  },
  container2: {
    backgroundColor: Colors.ghostWhite,
    alignItems:"center",
    paddingBottom:150
  }
});