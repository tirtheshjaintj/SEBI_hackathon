import Loader from "@/src/components/loaders/Loader";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import { formatTimeAgo } from "@/src/utils/datetime/datetime";
import {
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { userAvatar } from "@/src/utils/user/user";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { upVote } from "../services/community";
import { languageType } from "@/src/types/constants";
const CommunityCard = ({
  post,
  votes,
  comments,
}: {
  post: any;
  votes: any;
  comments: any;
}) => {
  const [isImage, setIsImage] = useState(null);
  const [votesCount, setVotesCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const { user } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);
  
  const { t, i18n } = useTranslation();
  const locale: languageType = i18n.language as languageType;

  useEffect(() => {
    setVotesCount(votes.length);
    const isVoted = votes?.some((vote: any) => vote.userid?._id === user._id);
    setIsVoted(isVoted);
  }, [votes]);

  const handleUpvote = async () => {
    try {
      setLoading(true);
      const res = await upVote({ postId: post._id });
      console.log({ res });
      if (res && res.success) {
        if (res.vote) {
          setIsVoted(true);
          setVotesCount(votesCount + 1);
        } else {
          setIsVoted(false);
          setVotesCount(votesCount - 1);
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      const message = post.content;

      const result = await Share.share({
        title: "Check out this post!",
        message: post.photos?.length
          ? `${message}\n\nImage: ${post.photos[0]}`
          : message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log("Shared with activity type:", result.activityType);
        } else {
          // console.log("Post shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log("Share dismissed");
      }
    } catch (error) {
      // console.error("Error sharing post:", error);
      Toast.show({
        type: "error",
        text1: "Failed to share post",
      });
    }
  };

  return (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: post?.avatar || userAvatar }}
          style={styles.avatar}
        />
        <View style={{}}>
          <Text style={styles.name}>
            {post?.user?.name}{" "}
            <Text style={styles.grayText}>{t("shared a post")}</Text>
          </Text>
          <Text style={styles.grayText}>
            {formatTimeAgo(
              post?.createdAt,
              locale              
            )}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={styles.postTextBody}
          numberOfLines={isExpanded ? undefined : 3}
        >
          {post.content}
        </Text>

        {post.content.length > 100 && (
          <TouchableOpacity onPress={() => setIsExpanded((prev) => !prev)}>
            <Text style={styles.readMoreText}>
              {isExpanded ? t("Read less") : t("...Read more")}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Images */}
      {post.photos && post.photos.length > 0 && (
        <FlatList
          horizontal
          data={post.photos}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsImage(item)}
            >
              <Image source={{ uri: item }} style={styles.postImage} />
            </TouchableOpacity>
          )}
          keyExtractor={(uri, index) => uri + index}
          showsHorizontalScrollIndicator={false}
          style={styles.imageList}
        />
      )}

      {/* Reactions */}
      <View style={styles.reactionRow}>
        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: isVoted ? Colors.lightPink : "transparent",
              borderColor: isVoted ? Colors.darkPink : "transparent",
              borderWidth: isVoted ? 0.5 : 0,
              borderRadius: isVoted ? 16 : 0,
              paddingHorizontal: isVoted ? 4 : 0,
            },
          ]}
          onPress={handleUpvote}
          disabled={loading}
        >
          {!isVoted ? (
            <Ionicons name="arrow-up" size={18} color="#888" />
          ) : (
            <Entypo name="arrow-bold-up" size={18} color={Colors.darkPink} />
          )}
          {loading ? (
            <Loader size="small" loaderColor="#888" />
          ) : (
            <Text
              style={[
                styles.iconText,
                {
                  color: !isVoted ? "#888" : Colors.textSecondaryDark,
                },
              ]}
            >
              {votesCount} {isVoted ? t("Upvoted") : t("Upvote")}
            </Text>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart-outline" size={18} color="#888" />
          <Text style={styles.iconText}>Like</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chatbubble-outline" size={18} color="#888" />
          <Text style={styles.iconText}>{t("Comment")}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            handleShare();
          }}
          style={styles.iconButton}
        >
          <Feather name="share-2" size={18} color="#888" />
          <Text style={styles.iconText}>{t("Share")}</Text>
        </TouchableOpacity>
      </View>

      <ModalWrapper visible={isImage !== null} onClose={() => setIsImage(null)}>
        <AppSafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          {isImage && (
            <Image
              source={{ uri: isImage }}
              style={{
                width: scale(300),
                minHeight: verticalScale(700),
                alignSelf: "center",
                resizeMode: "contain",
              }}
            />
          )}
        </AppSafeAreaView>
      </ModalWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(10),
  },
  postText: {
    color: Colors.primaryCyanColor,
    fontWeight: "600",
    fontFamily: "Quicksand-Medium",
  },
  postCard: {
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(14),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(8),
    gap: 2,
  },
  name: {
    fontWeight: "600",
    fontSize: normalize(14),
    color: Colors.textSecondaryDark,
  },
  grayText: {
    fontSize: normalize(12),
    color: Colors.textSecondaryLight,
  },
  postTextBody: {
    fontSize: normalize(14),
    color: Colors.textSecondaryLight,
    marginVertical: verticalScale(8),
    fontFamily: "Quicksand-Medium",
  },
  postImage: {
    width: scale(120),
    height: scale(100),
    borderRadius: scale(8),
    marginRight: scale(10),
  },
  imageList: {
    marginVertical: verticalScale(6),
  },
  reactionRow: {
    flexDirection: "row",
    // justifyContent: "",
    gap: scale(12),
    marginTop: verticalScale(10),
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  iconText: {
    fontSize: normalize(12),
    color: "#666",
  },
  readMoreText: {
    color: Colors.primaryCyanColor,
    fontSize: normalize(13),
    fontWeight: "500",
    marginTop: verticalScale(2),
    fontFamily: "Quicksand-SemiBold",
  },
});

export default CommunityCard;
