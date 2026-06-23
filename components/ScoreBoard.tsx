import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";
import { ScoreBoardProps } from "../types/quiz";

export const ScoreBoard = ({ score, bestScore }: ScoreBoardProps) => (
  <View style={styles.container}>
    <View style={styles.backgroundAccent} />
    <View style={styles.item}>
      <Text style={styles.label}>Puntaje actual</Text>
      <Text style={styles.value}>{score}</Text>
      <Text style={styles.caption}>respuestas seguras</Text>
    </View>
    <View style={styles.divider} />
    <View style={styles.item}>
      <Text style={styles.label}>Mejor puntaje</Text>
      <Text style={styles.value}>{bestScore}</Text>
      <Text style={styles.caption}>record local</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 16,
    overflow: "hidden",
    padding: 16,
  },
  backgroundAccent: {
    backgroundColor: "rgba(123, 47, 247, 0.12)",
    borderRadius: 80,
    height: 160,
    position: "absolute",
    right: -50,
    top: -62,
    width: 160,
  },
  item: {
    alignItems: "center",
    flex: 1,
  },
  divider: {
    backgroundColor: COLORS.lightGray,
    width: 1,
  },
  label: {
    color: COLORS.gray,
    fontSize: 13,
    marginBottom: 6,
  },
  value: {
    color: COLORS.appOrange,
    fontSize: 30,
    fontWeight: "800",
  },
  caption: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
});
