import { View, Image, Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export function Logo({ width = windowWidth * 0.8 }) {
  const image = require('../../assets/images/logo2.png');
  const size = typeof width === 'number' ? width : windowWidth * 0.8;
  
  return (
    <View style={styles.container}>
      <Image
        style={{
          height: size,
          width: size,
        }}
        source={image}
      />
    </View>
  );
}


export function Logo2({ width }) {
    const image = require('../../assets/images/logo2.png');
  const size = typeof width === 'number' ? width : windowWidth * 0.4;

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: size,
          width: size,
        }}
        source={image}
      />
    </View>
  );
}
export function Logo3({ width }) {
  const image = require('../../assets/images/logo2.png');


return (
  <View style={styles.container}>
    <Image
      style={{
        height: 40,
        width: 40,
      }}
      source={image}
    />
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 50
  }
});
