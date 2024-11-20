import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Logo3 } from './Logo';


export function Header({ showBack = false }) {
  const navigation = useNavigation();
  const goToBack = () => {
    navigation.goBack();
  };

  const showDrawer = () => {

    if (navigation && navigation.openDrawer) {
      navigation.openDrawer();
    } else {
      console.warn('navigation.openDrawer no está disponible');
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginTop:30 }}>
      
      {showBack ? (
        <TouchableOpacity onPress={goToBack}>
          <Ionicons name="arrow-back-outline" size={40} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={showDrawer}>
          <Ionicons name="menu" size={40} color="black" />
        </TouchableOpacity>
      )}

 
    </View>
  );
}
