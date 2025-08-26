import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

import Colors from "@/src/theme/colors";
import {
  scale,
  verticalScale
} from "@/src/utils/responsiveness/responsiveness";
import { useTranslation } from "react-i18next";
import CommunityCard from "./CommunityCard";
import TrendingCard from "./TrendingCard";

const CommunityScreen = ({ data }: { data: any }) => {
  const [selectedTag, setSelectedTag] = useState<string>("");
  
  const { t  } = useTranslation();
  // console.log({ data });
  return (
    <View style={styles.wrapper}>
      {/* <Scroller
        horizontal
        data={FILTER_TAGS}
        containerStyle={styles.tagList}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.tagButton,
              {
                backgroundColor:
                  selectedTag === item ? Colors.darkYellow : Colors.whiteDim,
              },
            ]}
            onPress={() => setSelectedTag(item)}
          >
            <Text
              style={{
                fontFamily: "Quicksand-SemiBold",
                color:
                  selectedTag === item
                    ? Colors.white
                    : Colors.textGraySecondary,
                fontSize: normalize(13),
              }}
            >
              {t(item.charAt(0).toUpperCase() + item.slice(1))}
            </Text>
          </TouchableOpacity>
        )}
      /> */}

      <View style={{ flex: 1, paddingHorizontal: scale(16) }}>
        {/* Trending  */}
        <TrendingCard />

        {/* Posts */}
        <FlatList
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: Colors.textGraySecondary }}>
                No posts found
              </Text>
            </View>
          )}
          data={data?.slice().sort((a:any, b:any) => b.votes.length - a.votes.length)}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CommunityCard
              post={item.post}
              votes={item?.votes}
              comments={item?.comments}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: verticalScale(12),
  },
  tagList: {
    paddingBottom: verticalScale(12),
    gap: scale(10),
  },
  tagButton: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    backgroundColor: Colors.whiteDim,
  },
});

export default CommunityScreen;
