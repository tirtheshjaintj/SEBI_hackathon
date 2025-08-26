import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { submitAnswer } from "../services/quiz";
import Toast from "react-native-toast-message";
import { saveItem } from "@/src/utils/storage/expo_storage";
import useAuthStore from "@/src/store/authSlice";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import LoaderFullScreen from "@/src/components/loaders/LoaderFullScreen";
import ScoreInfo from "../components/modals/ScoreInfo";
import Confirmation from "@/src/components/alerts/Confirmation";
import LevelUpModal from "../components/modals/LevelUpModal";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

 
const QuizScreen = ({ quizzes }: { quizzes: any[] }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [levelUpgraded, setLevelUpgraded] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation()

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submission, setSubmission] = useState<
    Record<
      string,
      {
        selectedOption: number | null;
        isCorrect: boolean;
        points: number;
        quizId: string;
        level:number
      }
    >
  >({});

  const currentQuiz = quizzes[currentIndex];

  const handleOptionPress = (optionIndex: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === currentQuiz.answer;

    setSubmission((prev) => ({
      ...prev,
      [currentQuiz._id]: {
        selectedOption: optionIndex,
        isCorrect,
        points: isCorrect ? currentQuiz.points : 0,
        quizId: currentQuiz._id,
        level:currentQuiz.level
      
      },
    }));
  };

  const goToNext = () => {
    if (currentIndex < quizzes.length - 1) {
      const nextIndex = currentIndex + 1;
      const saved = submission[quizzes[nextIndex]._id];
      setCurrentIndex(nextIndex);
      setSelectedOption(saved?.selectedOption ?? null);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const saved = submission[quizzes[prevIndex]._id];
      setCurrentIndex(prevIndex);
      setSelectedOption(saved?.selectedOption ?? null);
    }
  };

  const handleSubmit = async () => {
    const allSubmissions = Object.values(submission);

    // const totalPoints = allSubmissions.reduce((sum, s) => sum + s.points, 0);
    // const correctAnswers = allSubmissions.filter((s) => s.isCorrect).length;
    setConfirmSubmit(false);

    // console.log({ totalPoints });
    // console.log({ correctAnswers });

    try {
      setLoading(true);
      const res = await submitAnswer(allSubmissions);

      if (res) {
        setRes(res);
        if (res?.user) {
          await saveItem("session", JSON.stringify(res.user));
          setUser({ user: res.user });
        }
        setScoreModalOpen(true);
        Toast.show({
          type: "success",
          text1: "Answers submitted successfully",
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "While submitting answers, something went wrong",
      });
    } finally {
      setLoading(false);
      setConfirmSubmit(false);
    }
  };

  const getOptionStyle = (index: number) => {
    if (selectedOption === null) return styles.option;
    if (index === currentQuiz.answer) return styles.optionCorrect;
    if (index === selectedOption) return styles.optionIncorrect;
    return styles.option;
  };

  const attemptedBadge = currentQuiz.history ? (
    <View style={styles.attemptedBadge}>
      <Text style={styles.attemptedText}>{t("Attempted")}</Text>
    </View>
  ) : null;


  console.log({ res });
  return (
    <View style={styles.container}>
      <AppLinearGradient
        colors={[Colors.secondaryCyanColor, Colors.primaryCyanColor]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <AppSafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          {/* Top Nav */}
          <View style={styles.navRow}>
            <TouchableOpacity onPress={goToPrev} disabled={currentIndex === 0}>
              <Ionicons name="chevron-back-circle" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.indexText}>
              {currentIndex + 1}/{quizzes.length}
            </Text>
            <TouchableOpacity
              onPress={goToNext}
              disabled={currentIndex === quizzes.length - 1}
            >
              <Ionicons name="chevron-forward-circle" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {/* Question Box */}
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{currentQuiz.question}</Text>
            {attemptedBadge}
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuiz.options.map((opt: string, idx: number) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={idx}
                style={getOptionStyle(idx)}
                onPress={() => handleOptionPress(idx)}
              >
                <Text style={styles.optionText}>{opt}</Text>
                <View style={styles.iconContainer}>
                  {selectedOption !== null && idx === currentQuiz.answer && (
                    <FontAwesome6
                      name="circle-check"
                      size={20}
                      color={Colors.green}
                    />
                  )}
                  {selectedOption === idx &&
                    selectedOption !== currentQuiz.answer && (
                      <Entypo
                        name="circle-with-cross"
                        size={20}
                        color={Colors.pinkLight}
                      />
                    )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Question Dots */}
          <FlatList
            data={quizzes}
            keyExtractor={(item) => item._id}
            horizontal
            contentContainerStyle={{ gap: 8, marginBottom: 12 }}
            renderItem={({ item, index }) => {
              const answered = submission[item._id]?.selectedOption !== null;
              const isActive = currentIndex === index;

              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setCurrentIndex(index);
                    setSelectedOption(
                      submission[item._id]?.selectedOption ?? null
                    );
                  }}
                  style={[
                    styles.dot,
                    answered && styles.dotAnswered,
                    isActive && styles.dotActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.dotText,
                      isActive && { color: Colors.textSecondaryDark },
                    ]}
                  >
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* Submit Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setConfirmSubmit(true)}
            style={styles.submitBtn}
          >
            <Text style={styles.submitText}>{t("Submit")}</Text>
          </TouchableOpacity>
        </View>
      </AppSafeAreaView>

      <ModalWrapper
        visible={scoreModalOpen}
        onClose={() => {
          setLevelUpgraded(res.isLevelUp);
          setScoreModalOpen(false);
          router.replace("/quiz");
        }}
        animationType="fade"
      >
        <ScoreInfo
          correct={res?.correctAnswers}
          points={res?.newlyAcceptedPoints}
          levelUp={res?.isLevelUp}
          total={quizzes?.length}
        />
      </ModalWrapper>

      <ModalWrapper
        visible={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        animationType="fade"
      >
        <Confirmation
          title={t("Are you sure to submit?")}
          onCancel={() => setConfirmSubmit(false)}
          onConfirm={handleSubmit}
        />
      </ModalWrapper>

      {res && (
        <LevelUpModal
          level={res?.level}
          onClose={() => setLevelUpgraded(false)}
          visible={levelUpgraded}
        />
      )}

      {loading && <LoaderFullScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: moderateScale(16),
    justifyContent: "space-between",
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indexText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(16),
  },
  questionBox: {
    backgroundColor: Colors.primaryCyanColor,
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginVertical: verticalScale(10),
  },
  questionText: {
    color: "#fff",
    fontSize: moderateScale(18),
    fontFamily: "Poppins-SemiBold",
    lineHeight: moderateScale(24),
    marginBottom: 4,
  },
  attemptedBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.darkYellow,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  attemptedText: {
    fontSize: 10,
    color: "#fff",
    fontFamily: "Quicksand-Medium",
  },
  optionsContainer: {
    marginVertical: verticalScale(10),
  },
  option: {
    padding: moderateScale(12),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  optionCorrect: {
    backgroundColor: "#80bf82ff",
    borderColor: "#4CAF50",
    borderWidth: 1,
    padding: moderateScale(12),
    borderRadius: 12,
    marginBottom: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  optionIncorrect: {
    backgroundColor: "#e07a95ff",
    borderColor: "#F44336",
    borderWidth: 1,
    padding: moderateScale(12),
    borderRadius: 12,
    marginBottom: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Quicksand-Medium",
    flex: 1,
  },
  iconContainer: {
    marginLeft: "auto",
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  dotText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Quicksand-SemiBold",
  },
  dotActive: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#fff",
  },
  dotAnswered: {
    backgroundColor: Colors.darkYellow,
  },
  submitBtn: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: moderateScale(12),
    alignItems: "center",
  },
  submitText: {
    color: Colors.primaryCyanColor,
    fontFamily: "Poppins-SemiBold",
  },
});

export default QuizScreen;
