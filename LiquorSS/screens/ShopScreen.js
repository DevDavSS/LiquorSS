import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProductContainer from '../components/layout/Productcontainer';
import { Content } from '../components/layout/Content';
import SearchBar from '../components/Controls/Searchbar';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { ProductItem } from '../components/layout/Porducitem';

export default function ShopScreen() {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    console.log('Filter selected:', value);
  };

  return (
    <View style={styles.container}>
      <Content style={styles.content}>
        <SearchBar />
        <RNPickerSelect
          onValueChange={handleFilterChange}
          items={[
            { label: 'Vinos', value: 'vinos' },
            { label: 'Cervezas', value: 'cervezas' },
            { label: 'Licores', value: 'licores' },
            { label: 'Sin alcohol', value: 'sin_alcohol' },
          ]}
          placeholder={{
            label: 'Selecciona una categoría...',
            value: null,
            color: '#9EA0A4',
            fontFamily: Fonts.family.regular,
          }}
          style={pickerSelectStyles}
          value={selectedFilter}
        />
      </Content>
      <ProductContainer style={styles.productContainer}>
        <ProductItem label={"BLUE LABEL"} price={"$14000"}/>
        <ProductItem label={"Whisky"} price={"$8000"}/>
        <ProductItem label={"white wine"} price={"$11000"}/>
        <ProductItem label={"tequila"} price={"$12000"}/>
        <ProductItem label={"Vodka"} price={"$5000"}/>
      </ProductContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  productContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    padding: 10,
    
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
    backgroundColor: Colors.white,
    fontFamily: Fonts.family.regular,
  },
});
