import { QuizAnswerRecord, QuizQuestion, SecurityLevel } from "../types/quiz";

export const calculatePercentage = (score: number, totalQuestions: number): number => {
  if (totalQuestions <= 0) {
    return 0;
  }

  return Math.round((score / totalQuestions) * 100);
};

export const getSecurityLevel = (percentage: number): SecurityLevel => {
  if (percentage >= 90) {
    return {
      title: "Guardian Digital",
      message: "Excelente. Reconoces muy bien las senales de una estafa.",
    };
  }

  if (percentage >= 70) {
    return {
      title: "Cibernauta Precavido",
      message: "Tienes buenas practicas, aunque todavia puedes mejorar.",
    };
  }

  if (percentage >= 40) {
    return {
      title: "Usuario en Entrenamiento",
      message: "Reconoces algunos riesgos, pero debes reforzar tus habitos.",
    };
  }

  return {
    title: "Alerta de Seguridad",
    message: "Necesitas aprender mas antes de confiar en mensajes y enlaces.",
  };
};

export const getProgressPercentage = (
  currentQuestionNumber: number,
  totalQuestions: number,
): number => {
  if (totalQuestions <= 0) {
    return 0;
  }

  return Math.round((currentQuestionNumber / totalQuestions) * 100);
};

export const isValidQuestion = (question: QuizQuestion | undefined): question is QuizQuestion => {
  if (!question) {
    return false;
  }

  const correctOptions = question.options.filter(
    (option) => option.id === question.correctOptionId,
  );
  const optionIds = question.options.map((option) => option.id);
  const uniqueOptionIds = new Set(optionIds);

  return (
    question.id > 0 &&
    question.category.trim().length > 0 &&
    question.learningGoal.trim().length > 0 &&
    question.title.trim().length > 0 &&
    question.situation.trim().length > 0 &&
    question.options.length === 4 &&
    uniqueOptionIds.size === question.options.length &&
    correctOptions.length === 1 &&
    question.explanation.trim().length > 0 &&
    question.safetyTip.trim().length > 0 &&
    question.redFlags.length >= 2
  );
};

export const countCorrectAnswers = (answers: QuizAnswerRecord[]): number =>
  answers.reduce(
    (correctCount, answer) => (answer.isCorrect ? correctCount + 1 : correctCount),
    0,
  );
