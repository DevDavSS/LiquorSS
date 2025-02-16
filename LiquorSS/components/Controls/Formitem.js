import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export function FormItem({ label, placeholder, value, onChange }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder ? ` ${placeholder}` : "Ingrese texto"}
        placeholderTextColor={Colors.black + '70'}
        value={value} // Control de valor
        onChangeText={onChange} // Actualiza el estado del input
      />
    </View>
  );
}


export function BirthdatePicker({ label }) {  // Desestructuramos correctamente 'label'
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Mantener abierto en iOS
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true); // Abrir el picker cada vez que presionas el botón
  };

  return (
    <View style={styles.containerBirth}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity onPress={showDatepicker} style={styles.BirthButton}>
        <Text style={styles.buttonText}>Seleccionar fecha</Text> {/* Aquí agregamos el texto del botón */}
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
    marginTop: 30,
    
  },
  label: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: Fonts.family.regular,
    textAlign: 'left',
  },
  input: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    color: Colors.jet,
    fontSize: Fonts.size.normal,
    paddingBottom: 5,
    paddingTop: 5,
  },
  BirthButton: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 10,
    width: '80%',  // Ajuste para el tamaño
    paddingVertical: 5,
    marginVertical: 10, // Opcional: agregar espacio entre el botón y otros elementos
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.family.regular,
  },
  containerBirth: {
    marginBottom: 10,
    width: '100%',
    marginTop: 30,
    alignItems:"center"
    
  },
});
