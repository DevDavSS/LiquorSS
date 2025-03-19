import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import ProductContainer from '../components/layout/Productcontainer';
import { Content } from '../components/layout/Content';
import SearchBar from '../components/Controls/Searchbar';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {ProductItem} from '../components/layout/Porducitem';

export default function ShopScreen() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let q = collection(db, "productos");
      if (selectedFilter) {
        q = query(q, where("category", "==", selectedFilter));
      }
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedFilter]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowercasedFilter = searchText.toLowerCase();
      setFilteredProducts(products.filter(product =>
        product.product_name.toLowerCase().includes(lowercasedFilter)
      ));
    }
  }, [searchText, products]);

  return (
    <View style={styles.container}>
      <Content style={styles.content}>
        <SearchBar value={searchText} onChangeText={setSearchText} />
        <RNPickerSelect
          onValueChange={setSelectedFilter}
          items={[
            { label: 'Vinos', value: 'vinos' },
            { label: 'Cervezas', value: 'cervezas' },
            { label: 'Licores', value: 'licor' },
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

      {loading ? (
        <ActivityIndicator size="large" color={Colors.wine} />
      ) : (
        <ProductContainer style={styles.productContainer}>
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ProductContainer>
      )}
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
