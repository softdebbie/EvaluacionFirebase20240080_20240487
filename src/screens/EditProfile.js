import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../config/firebase";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function EditProfile({
  navigation,
}) {

  const [nombreCompleto, setNombreCompleto] =
    useState("");

  const [fechaNacimiento, setFechaNacimiento] =
    useState("");

  const [carnet, setCarnet] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {

    try {

      const user = auth.currentUser;

      if (!user) {
        navigation.replace("Login");
        return;
      }

      const userRef = doc(
        db,
        "usuarios",
        user.uid
      );

      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {

        const data = snapshot.data();

        setNombreCompleto(
          data.nombreCompleto || ""
        );

        setFechaNacimiento(
          data.fechaNacimiento || ""
        );

        setCarnet(
          data.carnet || ""
        );

        setImageUrl(
          data.imageUrl || ""
        );
      }

    } catch (error) {

      Alert.alert(
        "Error",
        "No se pudieron cargar los datos."
      );

    } finally {

      setLoading(false);
    }
  };

  const guardarCambios = async () => {

    if (
      !nombreCompleto ||
      !fechaNacimiento ||
      !carnet ||
      !imageUrl
    ) {

      Alert.alert(
        "Campos obligatorios",
        "Complete todos los campos."
      );

      return;
    }

    try {

      const user = auth.currentUser;

      if (!user) return;

      const userRef = doc(
        db,
        "usuarios",
        user.uid
      );

      await updateDoc(userRef, {

        nombreCompleto:
          nombreCompleto.trim(),

        fechaNacimiento:
          fechaNacimiento.trim(),

        carnet:
          carnet.trim(),

        imageUrl:
          imageUrl.trim(),
      });

      Alert.alert(
        "Actualizado",
        "La información fue actualizada correctamente.",
        [
          {
            text: "Aceptar",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );

    } catch (error) {

      Alert.alert(
        "Error",
        "No se pudieron guardar los cambios."
      );
    }
  };

  if (loading) {

    return (
      <View style={styles.loading}>
        <Text>
          Cargando...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.title}>
          Editar perfil
        </Text>

        <CustomInput
          label="Nombre completo"
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
          placeholder="Nombre completo"
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
          placeholder="Carnet"
        />

        <CustomInput
          label="URL de imagen"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />

        <CustomButton
          title="Guardar cambios"
          onPress={guardarCambios}
        />

        <CustomButton
          title="Cancelar"
          secondary
          onPress={() =>
            navigation.goBack()
          }
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 25,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});