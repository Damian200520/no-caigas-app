export type QuizStatus = "welcome" | "playing" | "levelComplete" | "finished";
export type QuizDifficulty = "basic" | "intermediate" | "advanced";
export type RiskLevel = "medium" | "high" | "critical";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  difficulty: QuizDifficulty;
  riskLevel: RiskLevel;
  title: string;
  situation: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  safetyTip: string;
  learningGoal: string;
  redFlags: string[];
}

export interface SecurityLevel {
  title: string;
  message: string;
}

export interface QuizAnswerRecord {
  questionId: number;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface LevelSummary {
  difficulty: QuizDifficulty;
  title: string;
  score: number;
  total: number;
}

export interface WelcomeScreenProps {
  totalQuestions: number;
  totalCategories: number;
  bestScore: number;
  onStart: () => void;
}

export interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptionId: string | null;
  answered: boolean;
  onSelectOption: (optionId: string) => void;
}

export interface OptionButtonProps {
  id: string;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  answered: boolean;
  onPress: (optionId: string) => void;
}

export interface QuizProgressProps {
  currentQuestionNumber: number;
  totalQuestions: number;
  currentLevelTitle: string;
  currentLevelQuestionNumber: number;
  totalLevelQuestions: number;
  levelProgressPercentage: number;
  progressPercentage: number;
}

export interface ScoreBoardProps {
  score: number;
  bestScore: number;
}

export interface FeedbackCardProps {
  isCorrect: boolean;
  explanation: string;
  safetyTip: string;
  redFlags: string[];
  isLastQuestion: boolean;
  onNext: () => void;
}

export interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  bestScore: number;
  levelSummaries: LevelSummary[];
  onRestart: () => void;
}

export interface LevelCompleteScreenProps {
  levelTitle: string;
  levelScore: number;
  levelTotal: number;
  nextLevelTitle: string;
  onContinue: () => void;
}

export interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}
