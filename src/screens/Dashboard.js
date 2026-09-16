import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import {
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../config/firebase";

import UserCard from "../components/UserCard";
import CustomButton from "../components/CustomButton";

export default function Dashboard({
  navigation,
}) {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarUsuario = async () => {

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

        setUserData({
          ...snapshot.data(),
          email: user.email,
        });

      } else {

        Alert.alert(
          "Información",
          "No se encontró información del usuario."
        );
      }

    } catch (error) {

      Alert.alert(
        "Error",
        "No se pudo cargar la información."
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    const unsubscribe =
      navigation.addListener(
        "focus",
        cargarUsuario
      );

    return unsubscribe;

  }, [navigation]);

  const cerrarSesion = async () => {

    try {

      await signOut(auth);

      navigation.replace("Login");

    } catch (error) {

      Alert.alert(
        "Error",
        "No se pudo cerrar la sesión."
      );
    }
  };

  if (loading) {

    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2563eb"
        />

        <Text>
          Cargando información...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.title}>
          Mi Perfil
        </Text>

        {userData && (
          <UserCard user={userData} />
        )}

        <CustomButton
          title="Editar información"
          onPress={() =>
            navigation.navigate("EditProfile")
          }
        />

        <CustomButton
          title="Cerrar sesión"
          secondary
          onPress={cerrarSesion}
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
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
    marginVertical: 20,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});