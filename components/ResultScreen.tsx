import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";
import { ResultScreenProps } from "../types/quiz";
import { calculatePercentage, getSecurityLevel } from "../utils/quizHelpers";

export const ResultScreen = ({
  score,
  totalQuestions,
  bestScore,
  levelSummaries,
  onRestart,
}: ResultScreenProps) => {
  const percentage = calculatePercentage(score, totalQuestions);
  const securityLevel = getSecurityLevel(percentage);
  const scoreMessage = `Respondiste correctamente ${score} de ${totalQuestions} desafios.`;
  const scaleAnimation = useRef(new Animated.Value(0.94)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnimation, {
        damping: 12,
        stiffness: 120,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        duration: 360,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnimation, scaleAnimation]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnimation,
          transform: [{ scale: scaleAnimation }],
        },
      ]}
    >
      <View style={styles.heroResult}>
        <View style={styles.heroResultGlow} />
        <Text style={styles.kicker}>Resultado final</Text>
        <Text style={styles.title}>{securityLevel.title}</Text>
        <View style={styles.percentageRing}>
          <Text style={styles.percentage}>{`${percentage}%`}</Text>
        </View>
        <Text style={styles.score}>{scoreMessage}</Text>
      </View>
      <Text style={styles.message}>{securityLevel.message}</Text>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{score}</Text>
          <Text style={styles.summaryLabel}>Aciertos</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalQuestions - score}</Text>
          <Text style={styles.summaryLabel}>Por reforzar</Text>
        </View>
      </View>

      <View style={styles.bestCard}>
        <Text style={styles.bestLabel}>Mejor puntaje guardado</Text>
        <Text style={styles.bestValue}>{bestScore}</Text>
      </View>

      <View style={styles.levelsCard}>
        <Text style={styles.levelsTitle}>Desempeno por nivel</Text>
        {levelSummaries.map((summary) => (
          <View key={summary.difficulty} style={styles.levelRow}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelName}>{summary.title}</Text>
              <View style={styles.levelTrack}>
                <View
                  style={[
                    styles.levelFill,
                    { width: `${calculatePercentage(summary.score, summary.total)}%` },
                  ]}
                />
              </View>
            </View>
            <Text style={styles.levelScore}>{`${summary.score}/${summary.total}`}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.restartButton}
        onPress={onRestart}
        accessibilityRole="button"
        accessibilityLabel="Volver a intentarlo"
        accessibilityHint="Reinicia el quiz sin borrar el mejor puntaje"
      >
        <Text style={styles.restartButtonText}>Volver a intentarlo</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 16,
  },
  heroResult: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 26,
    marginBottom: 18,
    overflow: "hidden",
    padding: 22,
  },
  heroResultGlow: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 90,
    height: 180,
    position: "absolute",
    right: -74,
    top: -64,
    width: 180,
  },
  kicker: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 14,
  },
  percentage: {
    color: COLORS.darkBlue,
    fontSize: 46,
    fontWeight: "900",
  },
  percentageRing: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    borderRadius: 72,
    borderWidth: 6,
    height: 144,
    justifyContent: "center",
    marginBottom: 18,
    width: 144,
  },
  score: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
  },
  message: {
    color: COLORS.gray,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
    paddingHorizontal: 6,
    textAlign: "center",
  },
  bestCard: {
    backgroundColor: COLORS.background,
    borderRadius: 18,
    marginBottom: 20,
    padding: 16,
  },
  levelsCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 20,
    padding: 16,
  },
  levelsTitle: {
    color: COLORS.appNavy,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 12,
  },
  levelRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  levelInfo: {
    flex: 1,
    marginRight: 12,
  },
  levelName: {
    color: COLORS.appNavy,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },
  levelTrack: {
    backgroundColor: COLORS.appBorder,
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  levelFill: {
    backgroundColor: COLORS.appOrange,
    borderRadius: 999,
    height: "100%",
  },
  levelScore: {
    color: COLORS.appOrange,
    fontSize: 14,
    fontWeight: "900",
    minWidth: 44,
    textAlign: "right",
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  summaryItem: {
    backgroundColor: COLORS.appCoralSoft,
    borderRadius: 18,
    flex: 1,
    padding: 14,
  },
  summaryValue: {
    color: COLORS.appOrange,
    fontSize: 24,
    fontWeight: "900",
  },
  summaryLabel: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
  bestLabel: {
    color: COLORS.gray,
    fontSize: 13,
    marginBottom: 4,
  },
  bestValue: {
    color: COLORS.appOrange,
    fontSize: 28,
    fontWeight: "900",
  },
  restartButton: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 22,
    minHeight: 60,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  restartButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },
});
