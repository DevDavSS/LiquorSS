import { View, Text, StyleSheet } from 'react-native';
import Fonts from '../../constants/Fonts';

export function Title({ label }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.title}>{label}</Text>}
    </View>
  );
}
export function SubTitle({ label }) {
  return (
    <View style={styles.container2}>
      {label && <Text style={styles.subtitle}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.ExtraLarge,
    color: '#000',
    textAlign: 'center',
  },
  container2:{
    alignItems:"flex-start",
    margin:30
    

  },
  subtitle: {
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.large,
    color: '#000',
    paddingRight:100
  
  },
});
