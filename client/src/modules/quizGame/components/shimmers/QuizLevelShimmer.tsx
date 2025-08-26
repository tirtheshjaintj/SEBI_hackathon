import { moderateScale } from "@/src/utils/responsiveness/responsiveness";
import { FlatList, StyleSheet, View } from "react-native";
import QuizLevelShimmerCard from "./QuizLevelsCard";

const QuizLevelsShimmer = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Array.from({ length: 6 })}
        scrollEnabled={false}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{ gap: moderateScale(16) }}
        contentContainerStyle={{
          gap: moderateScale(16),
          paddingBottom: moderateScale(24),
        }}
        renderItem={() => <QuizLevelShimmerCard />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
  },
});
export default QuizLevelsShimmer;
