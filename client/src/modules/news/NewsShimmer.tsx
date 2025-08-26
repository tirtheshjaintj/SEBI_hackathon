import Shimmer from "@/src/components/shimmer/Shimmer";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

const NewsShimmer = () => {
  const placeholderItems = Array.from({ length: 5 });

  const renderItem = () => (
    <View style={styles.card}>
      <Shimmer style={styles.image} />
      <View style={styles.textContainer}>
        <Shimmer style={styles.title} />
        <Shimmer style={styles.subtitle} />
        <Shimmer style={styles.subtitleShort} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={placeholderItems}
      keyExtractor={(_, i) => i.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    // padding: 16,
  },
  card: {
     marginBottom: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    overflow: "hidden",
    padding: 12,
    gap: 8,
  },
  image: {
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    height: 16,
    width: "70%",
    borderRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    height: 14,
    width: "90%",
    borderRadius: 4,
    marginBottom: 6,
  },
  subtitleShort: {
    height: 14,
    width: "50%",
    borderRadius: 4,
  },
});

export default NewsShimmer;
