import { useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";
import { WelcomeScreenProps } from "../types/quiz";

const featuredCategories = [
  { id: "phishing", label: "Phishing", color: COLORS.appOrange },
  { id: "accounts", label: "Cuentas", color: COLORS.appMint },
  { id: "shopping", label: "Compras", color: COLORS.answerBlue },
  { id: "privacy", label: "Privacidad", color: COLORS.quizPurpleLight },
];

export const WelcomeScreen = ({
  totalQuestions,
  totalCategories,
  bestScore,
  onStart,
}: WelcomeScreenProps) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animateButton = (toValue: number): void => {
    Animated.spring(buttonScale, {
      friction: 6,
      tension: 120,
      toValue,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.profileRow}>
          <Image source={require("../assets/icon.png")} style={styles.avatar} />
          <View>
            <Text style={styles.greeting}>Hola, estudiante</Text>
            <Text style={styles.subtitle}>Listo para entrenar?</Text>
          </View>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsValue}>{bestScore}</Text>
          <Text style={styles.pointsLabel}>BEST</Text>
        </View>
      </View>

      <View style={styles.quickGrid}>
        <View style={[styles.quickCard, styles.quickCardOrange]}>
          <Text style={styles.quickIcon}>+</Text>
          <Text style={styles.quickText}>Crear habito</Text>
        </View>
        <View style={[styles.quickCard, styles.quickCardPurple]}>
          <Text style={styles.quickIcon}>30</Text>
          <Text style={styles.quickText}>Preguntas</Text>
        </View>
        <View style={[styles.quickCard, styles.quickCardMint]}>
          <Text style={styles.quickIcon}>3</Text>
          <Text style={styles.quickText}>Niveles</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categorias destacadas</Text>
        <View style={styles.smallAddButton}>
          <Text style={styles.smallAddText}>+</Text>
        </View>
      </View>

      <View style={styles.categoryGrid}>
        {featuredCategories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
            <Text style={styles.categoryText}>{category.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.rewardCard}>
        <View style={styles.rewardTextGroup}>
          <Text style={styles.rewardTitle}>Sube de nivel</Text>
          <Text style={styles.rewardDescription}>
            Completa 3 fases: fácil, medio y difícil. Cada respuesta desbloquea una explicación útil.
          </Text>
        </View>
        <View style={styles.rewardCoinStack}>
          <View style={styles.coinLarge} />
          <View style={styles.coinSmall} />
        </View>
      </View>

      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Quiz principal</Text>
        <Text style={styles.totalText}>{`${totalCategories} categorías`}</Text>
      </View>

      <View style={styles.mainQuizCard}>
        <View style={styles.mainQuizIcon}>
          <Text style={styles.mainQuizIconText}>!</Text>
        </View>
        <View style={styles.mainQuizTextGroup}>
          <Text style={styles.mainQuizTitle}>No Caigas</Text>
          <Text style={styles.mainQuizDescription}>
            {`${totalQuestions} desafíos sobre estafas, phishing y seguridad digital.`}
          </Text>
        </View>
      </View>

      <View style={styles.leaderboardCard}>
        <View style={styles.leaderboardHeader}>
          <Text style={styles.sectionTitle}>Ranking local</Text>
          <Text style={styles.totalText}>Demo visual</Text>
        </View>
        <View style={styles.leaderboardRowFeatured}>
          <View style={styles.rankAvatarFeatured}>
            <Text style={styles.rankAvatarText}>TU</Text>
          </View>
          <View style={styles.rankInfo}>
            <Text style={styles.rankName}>Tu mejor marca</Text>
            <Text style={styles.rankSubtitle}>Guardado en este dispositivo</Text>
          </View>
          <Text style={styles.rankScore}>{bestScore}</Text>
        </View>
        <View style={styles.leaderboardRow}>
          <View style={styles.rankAvatar}><Text style={styles.rankAvatarText}>A</Text></View>
          <View style={styles.rankInfo}><Text style={styles.rankName}>Ana</Text><Text style={styles.rankSubtitle}>Practica segura</Text></View>
          <Text style={styles.rankScoreMuted}>24</Text>
        </View>
        <View style={styles.leaderboardRow}>
          <View style={styles.rankAvatar}><Text style={styles.rankAvatarText}>L</Text></View>
          <View style={styles.rankInfo}><Text style={styles.rankName}>Luis</Text><Text style={styles.rankSubtitle}>Nivel medio</Text></View>
          <Text style={styles.rankScoreMuted}>18</Text>
        </View>
      </View>

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <Pressable
          style={styles.startButton}
          onPress={onStart}
          onPressIn={() => animateButton(0.98)}
          onPressOut={() => animateButton(1)}
          accessibilityRole="button"
          accessibilityLabel="Comenzar desafío"
          accessibilityHint="Inicia el quiz educativo de seguridad digital"
        >
          <Text style={styles.startButtonText}>Comenzar desafío</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 22,
    height: 44,
    marginRight: 12,
    width: 44,
  },
  greeting: {
    color: COLORS.appNavy,
    fontSize: 18,
    fontWeight: "900",
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  pointsBadge: {
    alignItems: "center",
    backgroundColor: COLORS.quizPurple,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pointsValue: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },
  pointsLabel: {
    color: COLORS.answerYellow,
    fontSize: 10,
    fontWeight: "900",
  },
  quickGrid: {
    flexDirection: "row",
    gap: 12,
  },
  quickCard: {
    borderRadius: 18,
    flex: 1,
    minHeight: 96,
    padding: 14,
  },
  quickCardOrange: {
    backgroundColor: COLORS.appOrange,
  },
  quickCardPurple: {
    backgroundColor: COLORS.quizPurpleLight,
  },
  quickCardMint: {
    backgroundColor: COLORS.appMint,
  },
  quickIcon: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 14,
  },
  quickText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "900",
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: COLORS.appNavy,
    fontSize: 17,
    fontWeight: "900",
  },
  smallAddButton: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 8,
    height: 24,
    justifyContent: "center",
    width: 28,
  },
  smallAddText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: "48%",
  },
  categoryDot: {
    borderRadius: 5,
    height: 10,
    marginRight: 10,
    width: 10,
  },
  categoryText: {
    color: COLORS.appNavy,
    fontSize: 13,
    fontWeight: "800",
  },
  rewardCard: {
    backgroundColor: COLORS.quizPurple,
    borderRadius: 20,
    flexDirection: "row",
    minHeight: 128,
    overflow: "hidden",
    padding: 18,
  },
  rewardTextGroup: {
    flex: 1,
    paddingRight: 10,
  },
  rewardTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },
  rewardDescription: {
    color: COLORS.lightGray,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },
  rewardCoinStack: {
    justifyContent: "flex-end",
    width: 76,
  },
  coinLarge: {
    backgroundColor: COLORS.answerYellow,
    borderRadius: 34,
    height: 68,
    width: 68,
  },
  coinSmall: {
    backgroundColor: COLORS.appOrange,
    borderRadius: 18,
    bottom: 8,
    height: 36,
    position: "absolute",
    right: 0,
    width: 36,
  },
  recentHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: "800",
  },
  mainQuizCard: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    padding: 16,
  },
  mainQuizIcon: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    marginRight: 14,
    width: 40,
  },
  mainQuizIconText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
  },
  mainQuizTextGroup: {
    flex: 1,
  },
  mainQuizTitle: {
    color: COLORS.appNavy,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4,
  },
  mainQuizDescription: {
    color: COLORS.gray,
    fontSize: 13,
    lineHeight: 18,
  },
  startButton: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 58,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
  },
  leaderboardCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.appBorder,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  leaderboardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  leaderboardRowFeatured: {
    alignItems: "center",
    backgroundColor: COLORS.appCoralSoft,
    borderRadius: 14,
    flexDirection: "row",
    marginBottom: 10,
    padding: 12,
  },
  leaderboardRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  rankAvatarFeatured: {
    alignItems: "center",
    backgroundColor: COLORS.appOrange,
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    marginRight: 12,
    width: 36,
  },
  rankAvatar: {
    alignItems: "center",
    backgroundColor: COLORS.appMint,
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    marginRight: 12,
    width: 32,
  },
  rankAvatarText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "900",
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    color: COLORS.appNavy,
    fontSize: 13,
    fontWeight: "900",
  },
  rankSubtitle: {
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  rankScore: {
    color: COLORS.appOrange,
    fontSize: 18,
    fontWeight: "900",
  },
  rankScoreMuted: {
    color: COLORS.gray,
    fontSize: 15,
    fontWeight: "900",
  },
});
