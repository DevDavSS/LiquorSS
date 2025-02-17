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

export function BirthdatePicker({ label, value, onChange }) {  
  const [date, setDate] = useState(value || new Date()); // Inicia con el valor recibido
  const [show, setShow] = useState(false); // Aquí declaras el estado show

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); // Oculta el DateTimePicker después de seleccionar
    setDate(currentDate);
    onChange(currentDate); // Actualiza el estado en el componente padre
  };

  const showDatepicker = () => {
    setShow(true); // Muestra el DateTimePicker
  };

  return (
    <View style={styles.containerBirth}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity onPress={showDatepicker} style={styles.BirthButton}>
        <Text style={styles.buttonText}>
          {date.toLocaleDateString()} {/* Muestra la fecha seleccionada */}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
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
