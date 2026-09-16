import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

export default function UserCard({ user }) {
  return (
    <View style={styles.card}>

      {user?.imageUrl ? (
        <Image
          source={{ uri: user.imageUrl }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Sin imagen
          </Text>
        </View>
      )}

      <Text style={styles.name}>
        {user?.nombreCompleto || "Usuario"}
      </Text>

      <Text style={styles.data}>
        Correo: {user?.email || "No disponible"}
      </Text>

      <Text style={styles.data}>
        Fecha de nacimiento:{" "}
        {user?.fechaNacimiento || "No disponible"}
      </Text>

      <Text style={styles.data}>
        Carnet: {user?.carnet || "No disponible"}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 15,
  },

  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e5e7eb",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  placeholderText: {
    color: "#6b7280",
  },

  name: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111827",
  },

  data: {
    fontSize: 15,
    marginVertical: 5,
    color: "#374151",
  },
});