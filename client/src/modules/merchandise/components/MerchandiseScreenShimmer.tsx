import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Colors from "@/src/theme/colors";
import Shimmer from "@/src/components/shimmer/Shimmer";

const shimmerItems = Array.from({ length: 5 }, (_, i) => i);

const MerchandiseScreenShimmer = () => {
  const renderShimmerCard = () => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Shimmer style={styles.imageShimmer} />
        <View style={{ flex: 1 }}>
          <Shimmer style={styles.titleShimmer} />
          <Shimmer style={styles.descriptionShimmer} />
          <Shimmer style={styles.pointsShimmer} />
        </View>
      </View>
      <Shimmer style={styles.buttonShimmer} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shimmerItems}
        keyExtractor={(item) => item.toString()}
        renderItem={renderShimmerCard}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  cardContent: {
    flexDirection: "row",
    marginBottom: 15,
  },
  imageShimmer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  titleShimmer: {
    height: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: "60%",
  },
  descriptionShimmer: {
    height: 14,
    borderRadius: 5,
    marginBottom: 10,
    width: "80%",
  },
  pointsShimmer: {
    height: 16,
    borderRadius: 5,
    width: "40%",
  },
  buttonShimmer: {
    height: 40,
    borderRadius: 8,
    width: "100%",
  },
});

export default MerchandiseScreenShimmer;
