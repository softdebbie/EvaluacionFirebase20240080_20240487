import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../config/firebase";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {

    if (!email || !password) {
      Alert.alert(
        "Campos obligatorios",
        "Ingrese correo y contraseña."
      );
      return;
    }

    try {

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      navigation.replace("Dashboard");

    } catch (error) {

      let mensaje = "No se pudo iniciar sesión.";

      if (error.code === "auth/invalid-credential") {
        mensaje = "Correo o contraseña incorrectos.";
      }

      if (error.code === "auth/invalid-email") {
        mensaje = "El correo electrónico no es válido.";
      }

      Alert.alert("Error", mensaje);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >

      <ScrollView
        contentContainerStyle={styles.content}
      >

        <Text style={styles.title}>
          Bienvenido
        </Text>

        <Text style={styles.subtitle}>
          Iniciar sesión
        </Text>

        <CustomInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          placeholder="ejemplo@correo.com"
          keyboardType="email-address"
        />

        <CustomInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholder="Ingrese su contraseña"
          secureTextEntry
        />

        <CustomButton
          title="Iniciar sesión"
          onPress={iniciarSesion}
        />

        <CustomButton
          title="Crear una cuenta"
          secondary
          onPress={() => navigation.navigate("Register")}
        />

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 20,
    color: "#374151",
    textAlign: "center",
    marginBottom: 30,
  },
});