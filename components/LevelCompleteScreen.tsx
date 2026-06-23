import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";
import { LevelCompleteScreenProps } from "../types/quiz";
import { calculatePercentage } from "../utils/quizHelpers";

export const LevelCompleteScreen = ({
  levelTitle,
  levelScore,
  levelTotal,
  nextLevelTitle,
  onContinue,
}: LevelCompleteScreenProps) => {
  const levelPercentage = calculatePercentage(levelScore, levelTotal);

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.glowLarge} />
        <Text style={styles.kicker}>Fase completada</Text>
        <Text style={styles.title}>{levelTitle}</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>{`${levelPercentage}%`}</Text>
          <Text style={styles.scoreLabel}>{`${levelScore}/${levelTotal}`}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Buen avance</Text>
        <Text style={styles.infoText}>
          Ya completaste esta ronda. El siguiente bloque sube la dificultad y presenta casos con más contexto.
        </Text>
      </View>

      <Pressable
        style={styles.continueButton}
        onPress={onContinue}
        accessibilityRole="button"
        accessibilityLabel={`Continuar a ${nextLevelTitle}`}
        accessibilityHint="Avanza al siguiente nivel del quiz"
      >
        <Text style={styles.continueButtonText}>{`Continuar a ${nextLevelTitle}`}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  heroCard: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 24,
    overflow: "hidden",
    padding: 24,
  },
  glowLarge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 90,
    height: 180,
    position: "absolute",
    right: -70,
    top: -70,
    width: 180,
  },
  kicker: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 18,
    textAlign: "center",
  },
  scoreCircle: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 72,
    height: 144,
    justifyContent: "center",
    width: 144,
  },
  scoreValue: {
    color: COLORS.appOrange,
    fontSize: 38,
    fontWeight: "900",
  },
  scoreLabel: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  infoTitle: {
    color: COLORS.appNavy,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  infoText: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 20,
  },
  continueButton: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 58,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },
});
