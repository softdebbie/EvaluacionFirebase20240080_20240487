import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function CustomButton({
  title,
  onPress,
  secondary = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        secondary && styles.secondaryButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          secondary && styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 6,
  },

  secondaryButton: {
    backgroundColor: "#e5e7eb",
  },

  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryText: {
    color: "#1f2937",
  },
});