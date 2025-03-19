import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
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
      user.password, // Contraseña
      
    );
    console.log('Usuario creado:', context.user.uid);

    const userRef = doc(db, 'usuarios', context.user.uid);
    console.log('Guardando en Firestore...');
    await setDoc(userRef, {
      
      email: user.email,
      full_name: user.full_name,
      birthdate: user.birthdate, // Enviamos la fecha seleccionada
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
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    Alert.alert('Error', 'Credenciales incorrectas')
    //Alert.alert('Error', JSON.stringify(error));
    return false;
  }
};


export const removeFromCart = async (productId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("Debes iniciar sesión para eliminar productos del carrito.");
      return;
    }

    const cartRef = doc(db, "usuarios", user.uid, "carrito", productId);
    await deleteDoc(cartRef);

  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
  }
};


export const updateQuantityInCart = async (productId, newQuantity) => {

  const user = auth.currentUser;
  try {
    const productRef = doc(db, "usuarios", user.uid, "carrito", productId);
    await updateDoc(productRef, {
      quantity: newQuantity,
    });
    console.log("Cantidad actualizada exitosamente.");
  } catch (error) {
    console.error("Error al actualizar la cantidad:", error);
  }
};