import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";
import { ErrorMessageProps } from "../types/quiz";

export const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => (
  <View style={styles.container} accessibilityRole="alert">
    <Text style={styles.title}>Aviso</Text>
    <Text style={styles.message}>{message}</Text>
    {onDismiss ? (
      <Pressable
        style={styles.button}
        onPress={onDismiss}
        accessibilityRole="button"
        accessibilityLabel="Cerrar aviso"
        accessibilityHint="Oculta el mensaje de aviso actual"
      >
        <Text style={styles.buttonText}>Entendido</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF6DF",
    borderColor: COLORS.warningYellow,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  title: {
    color: COLORS.darkBlue,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  message: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.warningYellow,
    borderRadius: 12,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonText: {
    color: COLORS.darkBlue,
    fontSize: 14,
    fontWeight: "700",
  },
});
