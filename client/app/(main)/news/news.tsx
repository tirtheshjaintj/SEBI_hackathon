import ModalWrapper from "@/src/components/modal/ModalWrapper";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import axiosInstance from "@/src/apis/axiosInstance";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import NewsShimmer from "@/src/modules/news/NewsShimmer";
import { languageType } from "@/src/types/constants";
import {
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { useTranslation } from "react-i18next";

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const { isOffline } = useNetworkStatus();

  const { t, i18n } = useTranslation();
  const localeObj = i18n.language as languageType;
  const locale: languageType = localeObj;

  async function fetchNews() {


    setLoading(true);
    try {
      // header locale 
      const res = await axiosInstance.get('/news/', { headers: { 'language': locale } });
      console.log({ locale })

      console.log({ res: res.data.news.data.articles })
      if (res.data.news.data.articles) {
        setArticles(res.data.news.data.articles);
      } else {
        console.warn("No articles found.");
        setArticles([]); // clear previous state
      }
    } catch (err) {
      console.error("❌ Failed to fetch news:", err);
      setArticles([]); // avoid stale content
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchNews().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!isOffline && articles.length === 0) {
      fetchNews();
    }
  }, [isOffline]);


  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => setSelectedArticle(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <AppSafeAreaView style={{ backgroundColor: Colors.white }}>
      <CommonToolbar title={t("Latest Updates")} />

      {loading ? (
        <NewsShimmer />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={Colors.primaryCyanColor}
              progressBackgroundColor={Colors.white}
              colors={[Colors.primaryCyanColor]}
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={styles.container}
            />
          }
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      <ModalWrapper
        visible={!!selectedArticle}
        animationType="slide"
        onClose={() => setSelectedArticle(null)}
        disableTouchClose
      >
        {selectedArticle && (
          <AppSafeAreaView style={{ backgroundColor: Colors.white }}>
            <CommonToolbar
              title={selectedArticle.title}
              onBackPress={() => setSelectedArticle(null)}
            />

            <ScrollView contentContainerStyle={styles.fullModalContent}>
              <Image
                source={{ uri: selectedArticle.image }}
                style={styles.fullModalImage}
              />
              <View style={styles.fullModalTextWrapper}>
                <Text style={styles.fullModalTitle}>
                  {selectedArticle.title}
                </Text>
                <Text style={styles.fullModalSource}>
                  Source: {selectedArticle.source.name}
                </Text>
                <Text style={styles.fullModalDescription}>
                  {selectedArticle.description}
                </Text>
                <Text style={styles.fullModalContentText}>
                  {selectedArticle.content}
                </Text>
              </View>
            </ScrollView>
          </AppSafeAreaView>
        )}
      </ModalWrapper>
    </AppSafeAreaView>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginVertical: 16,
    textAlign: "center",
  },
  listContent: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(16),
    marginBottom: 100
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "fill"
  },
  title: {
    fontSize: 16,
    color: Colors.textGraySecondary,
    fontFamily: "Poppins-SemiBold",
    padding: 12,
  },
  modalCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: "100%",
  },
  fullModalContent: {
    flexGrow: 1,
    minHeight: "100%",
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
  },
  fullModalImage: {
    width: "100%",
    height: 250,
  },
  fullModalTextWrapper: {
    padding: 16,
  },
  fullModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  fullModalSource: {
    fontSize: 12,
    color: Colors.textSecondaryDark,
    marginBottom: 12,
    textAlign: "center",
  },
  fullModalDescription: {
    fontSize: 15,
    color: Colors.textSecondaryDark,
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 20,
  },
  fullModalContentText: {
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
    textAlign: "left",
  },
});
