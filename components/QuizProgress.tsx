import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";
import { QuizProgressProps } from "../types/quiz";

export const QuizProgress = ({
  currentQuestionNumber,
  totalQuestions,
  currentLevelTitle,
  currentLevelQuestionNumber,
  totalLevelQuestions,
  levelProgressPercentage,
  progressPercentage,
}: QuizProgressProps) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const animatedLevelProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedProgress, {
        duration: 450,
        toValue: progressPercentage,
        useNativeDriver: false,
      }),
      Animated.timing(animatedLevelProgress, {
        duration: 450,
        toValue: levelProgressPercentage,
        useNativeDriver: false,
      }),
    ]).start();
  }, [animatedLevelProgress, animatedProgress, levelProgressPercentage, progressPercentage]);

  const progressWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  const levelProgressWidth = animatedLevelProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  const isBasicLevel = currentLevelTitle === "Nivel fácil";
  const isMediumLevel = currentLevelTitle === "Nivel medio";
  const isAdvancedLevel = currentLevelTitle === "Nivel difícil";

  return (
    <View style={styles.container}>
      <View style={styles.phaseRow}>
        <View style={[styles.phaseChip, isBasicLevel ? styles.phaseChipActive : styles.phaseChipMuted]}>
          <Text style={[styles.phaseChipText, isBasicLevel ? styles.phaseChipTextActive : styles.phaseChipTextMuted]}>Facil</Text>
        </View>
        <View style={[styles.phaseLine, isMediumLevel || isAdvancedLevel ? styles.phaseLineActive : styles.phaseLineMuted]} />
        <View style={[styles.phaseChip, isMediumLevel ? styles.phaseChipActive : styles.phaseChipMuted]}>
          <Text style={[styles.phaseChipText, isMediumLevel ? styles.phaseChipTextActive : styles.phaseChipTextMuted]}>Medio</Text>
        </View>
        <View style={[styles.phaseLine, isAdvancedLevel ? styles.phaseLineActive : styles.phaseLineMuted]} />
        <View style={[styles.phaseChip, isAdvancedLevel ? styles.phaseChipActive : styles.phaseChipMuted]}>
          <Text style={[styles.phaseChipText, isAdvancedLevel ? styles.phaseChipTextActive : styles.phaseChipTextMuted]}>Dificil</Text>
        </View>
      </View>
      <View style={styles.levelHeader}>
        <View>
          <Text style={styles.levelLabel}>Fase actual</Text>
          <Text style={styles.levelTitle}>{currentLevelTitle}</Text>
        </View>
        <View style={styles.levelPill}>
          <Text style={styles.levelPillText}>{`${currentLevelQuestionNumber}/${totalLevelQuestions}`}</Text>
        </View>
      </View>
      <View style={styles.track} accessibilityLabel={`Progreso del nivel ${levelProgressPercentage} por ciento`}>
        <Animated.View style={[styles.levelFill, { width: levelProgressWidth }]} />
      </View>
      <View style={styles.header}>
        <Text style={styles.label}>{`Desafio ${currentQuestionNumber} de ${totalQuestions}`}</Text>
        <Text style={styles.percentage}>{`${progressPercentage}%`}</Text>
      </View>
      <View style={styles.track} accessibilityLabel={`Progreso ${progressPercentage} por ciento`}>
        <Animated.View style={[styles.fill, { width: progressWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  phaseRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
  phaseChip: {
    alignItems: "center",
    borderRadius: 999,
    minWidth: 62,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  phaseChipActive: {
    backgroundColor: COLORS.appOrange,
  },
  phaseChipMuted: {
    backgroundColor: COLORS.appCoralSoft,
  },
  phaseChipText: {
    fontSize: 12,
    fontWeight: "900",
  },
  phaseChipTextActive: {
    color: COLORS.white,
  },
  phaseChipTextMuted: {
    color: COLORS.gray,
  },
  phaseLine: {
    flex: 1,
    height: 3,
    marginHorizontal: 6,
  },
  phaseLineActive: {
    backgroundColor: COLORS.appOrange,
  },
  phaseLineMuted: {
    backgroundColor: COLORS.appBorder,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 14,
  },
  levelHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  levelLabel: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  levelTitle: {
    color: COLORS.appNavy,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },
  levelPill: {
    backgroundColor: COLORS.appOrange,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  levelPillText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
  },
  label: {
    color: COLORS.appNavy,
    fontSize: 15,
    fontWeight: "700",
  },
  percentage: {
    color: COLORS.appOrange,
    fontSize: 14,
    fontWeight: "700",
  },
  track: {
    backgroundColor: COLORS.appBorder,
    borderRadius: 999,
    height: 12,
    overflow: "hidden",
  },
  fill: {
    backgroundColor: COLORS.appMint,
    borderRadius: 999,
    height: "100%",
  },
  levelFill: {
    backgroundColor: COLORS.appOrange,
    borderRadius: 999,
    height: "100%",
  },
});
