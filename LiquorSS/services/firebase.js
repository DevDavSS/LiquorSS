import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

import { auth, db } from '../firebase-config';

/**
 * Función para cerrar sesión
 */
export const logoutAuth = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};
/**
 * Permite registrar un usuario nuevo
 *
 * @param {object} user - Objeto que representa el registro de un usuario nuevo
 * @returns boolean
 */
export const registerEmailPass = async (user) => {
  try {
    console.log('Correo:', user.email);
    console.log('user:', user.full_name);
    console.log('Intentando registrar al usuario...');
    const context = await createUserWithEmailAndPassword(
      auth,
      user.email, // Correo
      user.password // Contraseña
    );
    console.log('Usuario creado:', context.user.uid);

    const userRef = doc(db, 'usuarios', context.user.uid);
    console.log('Guardando en Firestore...');
    await setDoc(userRef, {
      
      email: user.email,
      full_name: user.full_name,
    });

    return true; // Registro exitoso
  } catch (error) {
    console.log('Error al registrar el usuario:', error);
    Alert.alert('Error', JSON.stringify(error));
    return false; // Error en el registro
  }
};


/**
 * Permite iniciar sesión
 *
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 */
export const loginWithEmailPass = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};