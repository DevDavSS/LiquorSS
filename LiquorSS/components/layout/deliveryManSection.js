import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DeliveryManContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.orderText}>Your order is almost at your address</Text>
      <View style={styles.deliveryManContainer}>
        <Image
          source={{ uri: 'https://static.wikia.nocookie.net/breakingbad/images/9/9f/Season_4_-_Mike.jpg/revision/latest/scale-to-width/360?cb=20110620221523' }}
          style={styles.profileImage}
        />
        <View style={styles.textIconContainer}>
          <Text style={styles.deliveryText}>Your delivery man:</Text>
          <View style={styles.nameIconContainer}>
            <Text style={styles.nameText}>Michael Ehrmantraut</Text>
            <Ionicons name="chatbubble-ellipses" size={24} color="black" style={styles.icon} />
            <Ionicons name="call" size={24} color="black" style={styles.icon} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deliveryManContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textIconContainer: {
    flexDirection: 'column',
  },
  nameIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 14,
    color: '#555',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    marginLeft: 5,
  },
});

export default DeliveryManContainer;
