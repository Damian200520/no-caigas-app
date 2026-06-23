import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ErrorMessage } from "./components/ErrorMessage";
import { FeedbackCard } from "./components/FeedbackCard";
import { LevelCompleteScreen } from "./components/LevelCompleteScreen";
import { QuestionCard } from "./components/QuestionCard";
import { QuizProgress } from "./components/QuizProgress";
import { ResultScreen } from "./components/ResultScreen";
import { ScoreBoard } from "./components/ScoreBoard";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { COLORS } from "./constants/colors";
import { questions } from "./data/questions";
import { getBestScore, saveBestScore } from "./services/storage";
import { LevelSummary, QuizAnswerRecord, QuizDifficulty, QuizStatus } from "./types/quiz";
import {
  countCorrectAnswers,
  getProgressPercentage,
  isValidQuestion,
} from "./utils/quizHelpers";

const FALLBACK_ERROR_MESSAGE =
  "No pudimos cargar esta parte de la aplicacion. Intenta reiniciar.";
const LEVEL_TITLES: Record<QuizDifficulty, string> = {
  basic: "Nivel facil",
  intermediate: "Nivel medio",
  advanced: "Nivel dificil",
};
const LEVEL_ORDER: QuizDifficulty[] = ["basic", "intermediate", "advanced"];

export default function App() {
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [answerHistory, setAnswerHistory] = useState<QuizAnswerRecord[]>([]);
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(18)).current;
  const glowScale = useRef(new Animated.Value(1)).current;

  const validQuestionCount = questions.filter(isValidQuestion).length;
  const totalQuestions = questions.length;
  const totalCategories = new Set(questions.map((question) => question.category)).size;
  const hasValidQuestions = totalQuestions > 0 && validQuestionCount === totalQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1;
  const isLastQuestion = currentQuestionNumber === totalQuestions;
  const progressPercentage = getProgressPercentage(currentQuestionNumber, totalQuestions);
  const currentDifficulty = currentQuestion?.difficulty ?? "basic";
  const currentLevelTitle = LEVEL_TITLES[currentDifficulty];
  const totalLevelQuestions = questions.filter(
    (question) => question.difficulty === currentDifficulty,
  ).length;
  const currentLevelQuestionNumber = questions
    .slice(0, currentQuestionIndex + 1)
    .filter((question) => question.difficulty === currentDifficulty).length;
  const levelProgressPercentage = getProgressPercentage(
    currentLevelQuestionNumber,
    totalLevelQuestions,
  );

  const getLevelSummaries = (): LevelSummary[] =>
    LEVEL_ORDER.map((difficulty) => {
      const levelQuestions = questions.filter((question) => question.difficulty === difficulty);
      const levelQuestionIds = new Set(levelQuestions.map((question) => question.id));
      const levelAnswers = answerHistory.filter((answer) => levelQuestionIds.has(answer.questionId));

      return {
        difficulty,
        title: LEVEL_TITLES[difficulty],
        score: countCorrectAnswers(levelAnswers),
        total: levelQuestions.length,
      };
    });

  const levelSummaries = getLevelSummaries();
  const currentLevelSummary = levelSummaries.find(
    (summary) => summary.difficulty === currentDifficulty,
  ) ?? levelSummaries[0];
  const currentLevelIndex = LEVEL_ORDER.indexOf(currentDifficulty);
  const nextLevelDifficulty = LEVEL_ORDER[currentLevelIndex + 1] ?? "advanced";
  const nextLevelTitle = LEVEL_TITLES[nextLevelDifficulty];

  const loadBestScore = async (): Promise<void> => {
    try {
      // Load the saved best score when the application starts.
      const savedBestScore = await getBestScore();
      setBestScore(savedBestScore);
      setStorageError(null);
    } catch {
      setStorageError("No se pudo cargar el mejor puntaje guardado.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateBestScore = async (newScore: number): Promise<void> => {
    if (newScore <= bestScore) {
      return;
    }

    try {
      await saveBestScore(newScore);
      setBestScore(newScore);
      setStorageError(null);
    } catch {
      setStorageError("No se pudo guardar el nuevo mejor puntaje.");
    }
  };

  useEffect(() => {
    void loadBestScore();
  }, []);

  useEffect(() => {
    contentOpacity.setValue(0);
    contentTranslateY.setValue(18);

    Animated.parallel([
      Animated.timing(contentOpacity, {
        duration: 320,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateY, {
        duration: 320,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [contentOpacity, contentTranslateY, currentQuestionIndex, quizStatus]);

  useEffect(() => {
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowScale, {
          duration: 1800,
          toValue: 1.12,
          useNativeDriver: true,
        }),
        Animated.timing(glowScale, {
          duration: 1800,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    );

    glowAnimation.start();

    return () => {
      glowAnimation.stop();
    };
  }, [glowScale]);

  const clearStorageError = (): void => {
    setStorageError(null);
  };

  const resetCurrentQuestionState = (): void => {
    // Reset the current question state.
    setSelectedOptionId(null);
    setAnswered(false);
  };

  const startQuiz = (): void => {
    if (!hasValidQuestions) {
      setStorageError(FALLBACK_ERROR_MESSAGE);
      return;
    }

    setQuizStatus("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerHistory([]);
    resetCurrentQuestionState();
  };

  const handleAnswer = (optionId: string): void => {
    if (answered) {
      // Prevent multiple answers for the same question.
      return;
    }

    if (!isValidQuestion(currentQuestion)) {
      setStorageError(FALLBACK_ERROR_MESSAGE);
      return;
    }

    const selectedOption = currentQuestion.options.find((option) => option.id === optionId);

    if (!selectedOption) {
      setStorageError("La opcion seleccionada no existe para este desafio.");
      return;
    }

    const isCorrect = optionId === currentQuestion.correctOptionId;
    const answerRecord: QuizAnswerRecord = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      isCorrect,
    };

    setSelectedOptionId(optionId);
    setAnswered(true);
    setAnswerHistory((previousAnswers) => [
      ...previousAnswers.filter((answer) => answer.questionId !== currentQuestion.id),
      answerRecord,
    ]);

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const finishQuiz = (): void => {
    // Calculate the final score before updating persistent storage.
    const finalScore = countCorrectAnswers(answerHistory);
    setScore(finalScore);
    setQuizStatus("finished");
    void updateBestScore(finalScore);
  };

  const goToNextQuestion = (): void => {
    if (!answered) {
      setStorageError("Primero debes responder el desafio actual.");
      return;
    }

    if (isLastQuestion) {
      finishQuiz();
      return;
    }

    if (currentQuestionIndex + 1 >= totalQuestions) {
      setStorageError(FALLBACK_ERROR_MESSAGE);
      return;
    }

    const nextQuestion = questions[currentQuestionIndex + 1];

    if (nextQuestion?.difficulty !== currentQuestion.difficulty) {
      setQuizStatus("levelComplete");
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
    resetCurrentQuestionState();
  };

  const continueToNextLevel = (): void => {
    if (currentQuestionIndex + 1 >= totalQuestions) {
      finishQuiz();
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
    resetCurrentQuestionState();
    setQuizStatus("playing");
  };

  const restartQuiz = (): void => {
    // Keep the previous best score when restarting the quiz.
    startQuiz();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingCard}>
          <ActivityIndicator color={COLORS.lightBlue} size="large" />
          <Text style={styles.loadingText}>Cargando puntaje guardado...</Text>
        </View>
      );
    }

    if (!hasValidQuestions) {
      return <ErrorMessage message={FALLBACK_ERROR_MESSAGE} />;
    }

    if (quizStatus === "welcome") {
      return (
        <WelcomeScreen
          totalQuestions={totalQuestions}
          totalCategories={totalCategories}
          bestScore={bestScore}
          onStart={startQuiz}
        />
      );
    }

    if (quizStatus === "finished") {
      return (
        <ResultScreen
          score={score}
          totalQuestions={totalQuestions}
          bestScore={bestScore}
          levelSummaries={levelSummaries}
          onRestart={restartQuiz}
        />
      );
    }

    if (quizStatus === "levelComplete") {
      return (
        <LevelCompleteScreen
          levelTitle={currentLevelTitle}
          levelScore={currentLevelSummary.score}
          levelTotal={currentLevelSummary.total}
          nextLevelTitle={nextLevelTitle}
          onContinue={continueToNextLevel}
        />
      );
    }

    if (!isValidQuestion(currentQuestion)) {
      return <ErrorMessage message={FALLBACK_ERROR_MESSAGE} />;
    }

    return (
      <>
        <QuizProgress
          currentQuestionNumber={currentQuestionNumber}
          totalQuestions={totalQuestions}
          currentLevelTitle={currentLevelTitle}
          currentLevelQuestionNumber={currentLevelQuestionNumber}
          totalLevelQuestions={totalLevelQuestions}
          levelProgressPercentage={levelProgressPercentage}
          progressPercentage={progressPercentage}
        />
        <ScoreBoard score={score} bestScore={bestScore} />
        <QuestionCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          answered={answered}
          onSelectOption={handleAnswer}
        />
        {answered ? (
          <FeedbackCard
            isCorrect={selectedOptionId === currentQuestion.correctOptionId}
            explanation={currentQuestion.explanation}
            safetyTip={currentQuestion.safetyTip}
            redFlags={currentQuestion.redFlags}
            isLastQuestion={isLastQuestion}
            onNext={goToNextQuestion}
          />
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.appSurface} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {quizStatus !== "welcome" ? (
          <View style={styles.header}>
            <Animated.View style={[styles.headerGlow, { transform: [{ scale: glowScale }] }]} />
            <View style={styles.topBar}>
              <View style={styles.brandMark}>
                <Text style={styles.brandMarkText}>NC</Text>
              </View>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveBadgeText}>Quiz activo</Text>
              </View>
            </View>
            <Text style={styles.appName}>No Caigas</Text>
            <Text style={styles.appTagline}>Elige la accion mas segura.</Text>
          </View>
        ) : null}
        <View style={[styles.contentCard, quizStatus === "welcome" ? styles.welcomeContentCard : styles.quizContentCard]}>
          {storageError ? (
            <ErrorMessage message={storageError} onDismiss={clearStorageError} />
          ) : null}
          <Animated.View
            style={{
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslateY }],
            }}
          >
            {renderContent()}
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.appSurface,
    flex: 1,
  },
  scrollContent: {
    backgroundColor: COLORS.appSurface,
    flexGrow: 1,
  },
  header: {
    backgroundColor: COLORS.appSurface,
    overflow: "hidden",
    paddingBottom: 18,
    paddingHorizontal: 22,
    paddingTop: Platform.OS === "android" ? 22 : 18,
  },
  headerGlow: {
    backgroundColor: "rgba(255, 107, 53, 0.14)",
    borderRadius: 120,
    height: 240,
    position: "absolute",
    right: -96,
    top: -88,
    width: 240,
  },
  headerGlowSecondary: {
    backgroundColor: "rgba(242, 201, 76, 0.22)",
    borderRadius: 90,
    bottom: -70,
    height: 180,
    left: -80,
    position: "absolute",
    width: 180,
  },
  headerOrbit: {
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 70,
    borderWidth: 1,
    height: 140,
    position: "absolute",
    right: -34,
    top: -18,
    width: 140,
  },
  headerDot: {
    backgroundColor: COLORS.answerYellow,
    borderRadius: 8,
    height: 16,
    position: "absolute",
    right: 28,
    top: 34,
    width: 16,
  },
  headerEyebrow: {
    color: COLORS.answerYellow,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  appName: {
    color: COLORS.appNavy,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1.4,
  },
  appTagline: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 320,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 18,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  brandMarkText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },
  liveBadge: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  liveDot: {
    backgroundColor: COLORS.appMint,
    borderRadius: 5,
    height: 10,
    marginRight: 8,
    width: 10,
  },
  liveBadgeText: {
    color: COLORS.appNavy,
    fontSize: 12,
    fontWeight: "800",
  },
  contentCard: {
    flex: 1,
    paddingHorizontal: 16,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: COLORS.darkBlue,
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
    }),
  },
  welcomeContentCard: {
    paddingBottom: 24,
    paddingTop: 16,
  },
  quizContentCard: {
    paddingBottom: 24,
  },
  loadingCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    justifyContent: "center",
    minHeight: 240,
    padding: 24,
  },
  loadingText: {
    color: COLORS.gray,
    fontSize: 15,
    marginTop: 12,
  },
});
