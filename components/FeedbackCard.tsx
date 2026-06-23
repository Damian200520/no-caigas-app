import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";
import { FeedbackCardProps } from "../types/quiz";

export const FeedbackCard = ({
  isCorrect,
  explanation,
  safetyTip,
  redFlags,
  isLastQuestion,
  onNext,
}: FeedbackCardProps) => {
  const title = isCorrect ? "Respuesta correcta" : "Respuesta incorrecta";
  const buttonText = isLastQuestion ? "Ver resultado" : "Siguiente desafío";
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        duration: 260,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnimation, {
        damping: 14,
        stiffness: 140,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnimation, slideAnimation]);

  return (
    <Animated.View
      style={[
        styles.container,
        isCorrect ? styles.correctBorder : styles.incorrectBorder,
        {
          opacity: fadeAnimation,
          transform: [{ translateY: slideAnimation }],
        },
      ]}
    >
      <View style={styles.titleRow}>
        <View style={[styles.resultIcon, isCorrect ? styles.correctIcon : styles.incorrectIcon]}>
          <Text style={styles.resultIconText}>{isCorrect ? "✓" : "!"}</Text>
        </View>
        <View style={styles.titleGroup}>
          <Text style={styles.kicker}>Retroalimentacion</Text>
          <Text style={[styles.title, isCorrect ? styles.correctText : styles.incorrectText]}>
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.explanationBox}>
        <Text style={styles.explanationTitle}>Por que importa</Text>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
      <View style={styles.redFlagsBox}>
        <Text style={styles.redFlagsTitle}>Señales de alerta detectadas</Text>
        {redFlags.map((redFlag) => (
          <View key={redFlag} style={styles.redFlagItem}>
            <View style={styles.redFlagDot} />
            <Text style={styles.redFlagText}>{redFlag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>Consejo de seguridad</Text>
        <Text style={styles.tipText}>{safetyTip}</Text>
      </View>
      <Pressable
        style={styles.nextButton}
        onPress={onNext}
        accessibilityRole="button"
        accessibilityLabel={buttonText}
        accessibilityHint="Avanza despues de revisar la retroalimentacion"
      >
        <Text style={styles.nextButtonText}>{buttonText}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderLeftWidth: 0,
    borderRadius: 32,
    marginBottom: 24,
    padding: 18,
  },
  correctBorder: {
    borderLeftColor: COLORS.correctGreen,
  },
  incorrectBorder: {
    borderLeftColor: COLORS.incorrectRed,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
  },
  titleGroup: {
    flex: 1,
  },
  kicker: {
    color: COLORS.appOrange,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  resultIcon: {
    alignItems: "center",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    marginRight: 12,
    width: 48,
  },
  correctIcon: {
    backgroundColor: COLORS.correctGreen,
  },
  incorrectIcon: {
    backgroundColor: COLORS.incorrectRed,
  },
  resultIconText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
  },
  correctText: {
    color: COLORS.answerGreen,
  },
  incorrectText: {
    color: COLORS.answerRed,
  },
  explanation: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
  },
  explanationBox: {
    backgroundColor: COLORS.appCoralSoft,
    borderColor: COLORS.appBorder,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
    padding: 14,
  },
  explanationTitle: {
    color: COLORS.appOrange,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 6,
  },
  tipBox: {
    backgroundColor: "#E9FFF3",
    borderRadius: 18,
    marginBottom: 16,
    padding: 14,
  },
  tipTitle: {
    color: COLORS.answerGreen,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
  },
  tipText: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
  },
  redFlagsBox: {
    backgroundColor: "#FFF0F5",
    borderRadius: 16,
    marginBottom: 14,
    padding: 14,
  },
  redFlagsTitle: {
    color: COLORS.answerRed,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },
  redFlagItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 6,
  },
  redFlagDot: {
    backgroundColor: COLORS.incorrectRed,
    borderRadius: 4,
    height: 8,
    marginRight: 8,
    width: 8,
  },
  redFlagText: {
    color: COLORS.text,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 999,
    minHeight: 58,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },
});
