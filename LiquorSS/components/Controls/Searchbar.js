import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../constants/Fonts';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    console.log('Searching:', text);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <View>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={Colors.black} style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="¿Qué te gustaría beber hoy?..."
          placeholderTextColor={Colors.black}
          value={searchText}
          onChangeText={handleSearch}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="times-circle" size={20} color={Colors.blackWine} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '110%',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono de búsqueda y el campo de texto
  },
  searchInput: {
    flex: 1, // Esto asegura que el TextInput ocupe el espacio restante
    height: 60,
    fontSize: 16,
    fontFamily:Fonts.family.regular,
    borderBottomWidth: 1, // Solo una línea en la parte inferior
    borderBottomColor: Colors.blackWine, // Color de la línea
    paddingVertical: 0, // Elimina el padding vertical para que sea solo una línea

  },
  clearButton: {
    marginLeft: 10, // Espacio entre el campo de texto y el ícono de borrar
  },
});
