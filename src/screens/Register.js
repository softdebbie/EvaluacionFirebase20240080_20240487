import React, { useState } from "react";

import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../config/firebase";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function Register({ navigation }) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [carnet, setCarnet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const registrarUsuario = async () => {
    if (!nombreCompleto || !email || !password || !fechaNacimiento || !carnet) {
      Alert.alert(
        "Campos obligatorios",
        "Complete todos los campos (la URL de imagen es opcional).",
      );

      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 6 caracteres.",
      );

      return;
    }

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const uid = credential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        uid: uid,
        nombreCompleto: nombreCompleto.trim(),
        email: email.trim(),
        fechaNacimiento: fechaNacimiento.trim(),
        carnet: carnet.trim(),
        imageUrl: imageUrl.trim(),
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Registro exitoso", "La cuenta fue creada correctamente.", [
        {
          text: "Aceptar",
          onPress: () => navigation.replace("Dashboard"),
        },
      ]);
    } catch (error) {
      console.log("ERROR REAL:", error);

      let mensaje = "No se pudo crear la cuenta.";

      if (error.code === "auth/email-already-in-use") {
        mensaje = "Este correo ya está registrado.";
      }

      if (error.code === "auth/invalid-email") {
        mensaje = "El correo no es válido.";
      }

      if (error.code === "auth/weak-password") {
        mensaje = "La contraseña es demasiado débil.";
      }

      Alert.alert("Error", mensaje);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crear cuenta</Text>

        <Text style={styles.subtitle}>Complete sus datos</Text>

        <CustomInput
          label="Nombre completo"
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
          placeholder="Nombre y apellidos"
        />

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
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
        />

        <CustomInput
          label="Fecha de nacimiento"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
          placeholder="DD/MM/AAAA"
        />

        <CustomInput
          label="Carnet institucional"
          value={carnet}
          onChangeText={setCarnet}
          placeholder="Ej. 20240080"
        />

        <CustomInput
          label="URL de imagen (opcional)"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
          keyboardType="url"
        />

        <CustomButton title="Registrarme" onPress={registrarUsuario} />

        <CustomButton
          title="Ya tengo una cuenta"
          secondary
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  content: {
    padding: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 25,
    marginTop: 5,
  },
});
