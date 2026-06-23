import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";
import { QuestionCardProps, QuizOption } from "../types/quiz";
import { OptionButton } from "./OptionButton";

const difficultyLabels = {
  basic: "Basico",
  intermediate: "Intermedio",
  advanced: "Avanzado",
} as const;

const riskLabels = {
  medium: "Riesgo medio",
  high: "Riesgo alto",
  critical: "Riesgo critico",
} as const;

const getCategoryVisual = (category: string): { label: string; detail: string; color: string } => {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("banca") || normalizedCategory.includes("pagos")) {
    return { label: "$", detail: "Protege tu dinero", color: COLORS.appOrange };
  }

  if (normalizedCategory.includes("qr")) {
    return { label: "QR", detail: "Verifica antes de escanear", color: COLORS.quizPurpleLight };
  }

  if (normalizedCategory.includes("wi-fi") || normalizedCategory.includes("redes")) {
    return { label: "@", detail: "Revisa el origen", color: COLORS.answerBlue };
  }

  if (normalizedCategory.includes("dispositivos") || normalizedCategory.includes("usb")) {
    return { label: "USB", detail: "No conectes sin verificar", color: COLORS.answerGreen };
  }

  if (normalizedCategory.includes("identidad") || normalizedCategory.includes("cuentas")) {
    return { label: "ID", detail: "Cuida tus accesos", color: COLORS.appMint };
  }

  return { label: "!", detail: "Detecta la senal de alerta", color: COLORS.appOrange };
};

export const QuestionCard = ({
  question,
  selectedOptionId,
  answered,
  onSelectOption,
}: QuestionCardProps) => {
  const selectedOption = question.options.find((option) => option.id === selectedOptionId);
  const selectedOptionText = selectedOption?.text ?? "sin seleccion";
  const categoryVisual = getCategoryVisual(question.category);

  const renderOption: ListRenderItem<QuizOption> = ({ item }) => (
    <OptionButton
      id={item.id}
      text={item.text}
      isSelected={selectedOptionId === item.id}
      isCorrect={question.correctOptionId === item.id}
      answered={answered}
      onPress={onSelectOption}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.metaRow}>
        <Text style={styles.category}>{question.category}</Text>
        <Text style={[styles.riskBadge, styles[question.riskLevel]]}>
          {riskLabels[question.riskLevel]}
        </Text>
      </View>
      <Text style={styles.title}>{question.title}</Text>
      <View style={styles.learningBox}>
        <View style={styles.learningLabelRow}>
          <Text style={styles.learningLabel}>{difficultyLabels[question.difficulty]}</Text>
          <Text style={styles.learningBadge}>Objetivo</Text>
        </View>
        <Text style={styles.learningText}>{question.learningGoal}</Text>
      </View>
      <View style={styles.situationBox}>
        <View style={[styles.sceneIllustration, { backgroundColor: categoryVisual.color }]}>
          <View style={styles.sceneCircleLarge} />
          <View style={styles.sceneCircleSmall} />
          <Text style={styles.sceneTitle}>{categoryVisual.label}</Text>
          <Text style={styles.sceneSubtitle}>{categoryVisual.detail}</Text>
        </View>
        <Text style={styles.situationLabel}>Escenario</Text>
        <Text style={styles.situation}>{question.situation}</Text>
      </View>
      <View style={styles.answerHeader} accessibilityLabel={`Seleccion actual: ${selectedOptionText}`}>
        <View>
          <Text style={styles.answerTitle}>Que harias?</Text>
          <Text style={styles.helperText}>Elige la accion mas segura.</Text>
        </View>
        <Text style={styles.optionCount}>4 opciones</Text>
      </View>
      <FlatList
        data={question.options}
        keyExtractor={(item) => item.id}
        renderItem={renderOption}
        extraData={{ selectedOptionId, answered }}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    padding: 18,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  category: {
    color: COLORS.appOrange,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  riskBadge: {
    borderRadius: 999,
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textTransform: "uppercase",
  },
  medium: {
    backgroundColor: COLORS.answerYellow,
    color: COLORS.quizPurpleDark,
  },
  high: {
    backgroundColor: COLORS.appOrange,
  },
  critical: {
    backgroundColor: COLORS.incorrectRed,
  },
  title: {
    color: COLORS.appNavy,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  learningBox: {
    backgroundColor: COLORS.appCoralSoft,
    borderLeftColor: COLORS.appOrange,
    borderLeftWidth: 4,
    borderRadius: 16,
    marginBottom: 16,
    padding: 14,
  },
  learningLabelRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  learningLabel: {
    color: COLORS.appOrange,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  learningBadge: {
    backgroundColor: COLORS.white,
    borderRadius: 999,
    color: COLORS.appOrange,
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingVertical: 4,
    textTransform: "uppercase",
  },
  learningText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  situation: {
    color: COLORS.appNavy,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  situationBox: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
    padding: 0,
  },
  situationLabel: {
    color: COLORS.appOrange,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 14,
    textTransform: "uppercase",
  },
  helperText: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  answerHeader: {
    alignItems: "center",
    backgroundColor: COLORS.appNavy,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    padding: 14,
  },
  answerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
  },
  optionCount: {
    backgroundColor: COLORS.appOrange,
    borderRadius: 999,
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sceneIllustration: {
    backgroundColor: COLORS.appOrange,
    height: 138,
    justifyContent: "flex-end",
    overflow: "hidden",
    padding: 18,
  },
  sceneCircleLarge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 70,
    height: 140,
    position: "absolute",
    right: -30,
    top: -28,
    width: 140,
  },
  sceneCircleSmall: {
    backgroundColor: "rgba(255, 255, 255, 0.26)",
    borderRadius: 34,
    height: 68,
    left: 18,
    position: "absolute",
    top: 18,
    width: 68,
  },
  sceneTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
  },
  sceneSubtitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 2,
  },
});
