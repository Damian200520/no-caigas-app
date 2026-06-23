import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

import { COLORS } from "../constants/colors";
import { OptionButtonProps } from "../types/quiz";

export const OptionButton = ({
  id,
  text,
  isSelected,
  isCorrect,
  answered,
  onPress,
}: OptionButtonProps) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const getBaseColor = (): string => {
    if (id === "a") {
      return COLORS.answerRed;
    }

    if (id === "b") {
      return COLORS.answerBlue;
    }

    if (id === "c") {
      return COLORS.answerYellow;
    }

    return COLORS.answerGreen;
  };

  const animateScale = (toValue: number): void => {
    Animated.spring(scaleAnimation, {
      friction: 6,
      tension: 120,
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const getButtonStyle = (): ViewStyle => {
    if (!answered && isSelected) {
      return styles.selected;
    }

    if (answered && isCorrect) {
      return styles.correct;
    }

    if (answered && isSelected && !isCorrect) {
      return styles.incorrect;
    }

    if (answered) {
      return styles.disabled;
    }

    return styles.normal;
  };

  const getStatusText = (): string => {
    if (answered && isCorrect) {
      return "Correcta";
    }

    if (answered && isSelected && !isCorrect) {
      return "Incorrecta";
    }

    if (isSelected) {
      return "Seleccionada";
    }

    return "Opcion";
  };

  const textColor = answered
    ? isCorrect || isSelected
      ? COLORS.white
      : COLORS.gray
    : isSelected
      ? COLORS.white
      : COLORS.appNavy;
  const optionLetter = id.toUpperCase();
  const indicatorColor = answered && isCorrect
    ? COLORS.correctGreen
    : answered && isSelected
      ? COLORS.incorrectRed
      : isSelected
        ? COLORS.lightBlue
        : answered
          ? COLORS.lightGray
          : getBaseColor();
  const indicatorTextColor = answered && !isCorrect && !isSelected ? COLORS.gray : COLORS.white;

  return (
    <Animated.View
      style={[
        styles.animatedWrapper,
        {
          transform: [{ scale: scaleAnimation }],
        },
      ]}
    >
      <Pressable
        style={[styles.button, getButtonStyle()]}
        onPress={() => onPress(id)}
        onPressIn={() => animateScale(0.98)}
        onPressOut={() => animateScale(1)}
        disabled={answered}
        accessibilityRole="button"
        accessibilityState={{ disabled: answered, selected: isSelected }}
        accessibilityLabel={`${getStatusText()}: ${text}`}
        accessibilityHint="Selecciona esta alternativa como respuesta"
      >
        <View style={[styles.indicator, { backgroundColor: indicatorColor }]}>
          <Text style={[styles.indicatorText, { color: indicatorTextColor }]}>{optionLetter}</Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={[styles.status, { color: textColor }]}>{getStatusText()}</Text>
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedWrapper: {
    marginBottom: 14,
  },
  button: {
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 62,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  normal: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
  },
  selected: {
    backgroundColor: COLORS.appOrange,
    borderColor: COLORS.appOrange,
  },
  correct: {
    backgroundColor: COLORS.appMint,
    borderColor: COLORS.appMint,
  },
  incorrect: {
    backgroundColor: COLORS.answerRed,
    borderColor: COLORS.answerRed,
  },
  disabled: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
  },
  status: {
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 14.5,
    fontWeight: "800",
    lineHeight: 22,
  },
  indicator: {
    alignItems: "center",
    borderRadius: 8,
    height: 34,
    justifyContent: "center",
    marginRight: 12,
    width: 34,
  },
  indicatorText: {
    fontSize: 14,
    fontWeight: "900",
  },
  textGroup: {
    flex: 1,
  },
});
