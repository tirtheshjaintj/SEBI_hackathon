import axiosInstance from "@/src/apis/axiosInstance";
import Scroller from "@/src/components/scroller/Scroller";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import SearchBarInput from "@/src/components/shared/SearchBarInput";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import { languageType } from "@/src/types/constants";
import { moderateScale } from "@/src/utils/responsiveness/responsiveness";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import dictionaryJson from "../data/dictionary.json";

const { width } = Dimensions.get("window");

type EntryType = {
  word: string;
  definition: {
    en: string;
    hi: string;
    pa: string;
  };
  category: string;
};

type DictionaryType = {
  [key: string]: EntryType[];
};

const dictionary: DictionaryType = dictionaryJson;

const DictionaryScreen = () => {
  const [searchedText, setSearchedText] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");
  const { t, i18n } = useTranslation();
  const locale = i18n.language as languageType;
  const [apiResult, setApiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef<any>(null);
  const dictionaryKeys = Object.keys(dictionary);

  const nextLetter = useCallback(() => {
    const currentIndex = dictionaryKeys.indexOf(selectedLetter);
    const nextIndex = (currentIndex + 1) % dictionaryKeys.length;
    setSelectedLetter(dictionaryKeys[nextIndex]);
  }, [selectedLetter, dictionaryKeys]);


  const getDefinitionFromAPI = async (word: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/ai/dictionary",
        { word: word.trim() },
        { headers: { language: locale } }
      );

      if (response.data?.result) {
        setApiResult({
          //@ts-ignore
          word,
          definition: { [locale]: response.data.result.definition },
          category: "AI"
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWords = useMemo(() => {
    if (searchedText.trim()) {
      const localMatches = Object.values(dictionary)
        .flat()
        .filter((item) =>
          item.word.toLowerCase().includes(searchedText.toLowerCase())
        );

      return localMatches.length > 0
        ? localMatches
        : apiResult
          ? [apiResult]
          : [];
    } else {
      return dictionary[selectedLetter] || [];
    }
  }, [searchedText, selectedLetter, apiResult, locale]);

  useEffect(() => {
    if (!searchedText.trim()) {
      setApiResult(null);
      return;
    }

    const localMatches = Object.values(dictionary)
      .flat()
      .filter((item) =>
        item.word.toLowerCase().includes(searchedText.toLowerCase())
      );

    if (localMatches.length > 0) {
      setApiResult(null); // Reset API result
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      getDefinitionFromAPI(searchedText);
    }, 500); // 500ms delay

  }, [searchedText, locale]);


  return (
    <AppLinearGradient
      colors={[Colors.primaryCyanColor, Colors.textGraySecondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.8]}
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <AppSafeAreaView style={{ flex: 1 }}>
        <CommonToolbar
          title={t("Dictionary")}
          backgroundColor={"transparent"}
          textColor={"white"}
          shadow={false}
        />
        <View>
          <Scroller
            horizontal
            data={dictionaryKeys}
            containerStyle={styles.tagList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedLetter(item)}>
                <Text
                  style={[
                    styles.tag,
                    item === selectedLetter && styles.selectedTag,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.container}>
          <SearchBarInput
            placeholder={t("Search keyword")}
            handleOnChange={setSearchedText}
          />

          {loading && searchedText.trim() && filteredWords.length === 0 ? (
            <View
              style={[
                styles.card,
                { backgroundColor: Colors.primaryCyanColor }
              ]}
            >
              <View style={styles.content}>
                <Text style={styles.word}>⌛ {t("Loading...")}</Text>
                <Text style={styles.definition}>
                  {t("Fetching definition from AI dictionary...")}
                </Text>
              </View>
            </View>
          ) : filteredWords.length > 0 ? (
            <Swiper
              key={selectedLetter + searchedText}
              cards={filteredWords}
              renderCard={(card) => (
                <View
                  style={[
                    styles.card,
                    {
                      backgroundColor: Colors.primaryCyanColor,
                    },
                  ]}
                >
                  <View style={styles.content}>
                    <Text style={styles.word}>{card?.word}</Text>
                    <Text style={styles.definition}>
                      {card.definition[locale] || card?.definition["en"]}
                    </Text>
                    <Text style={styles.category}>{t(card?.category)}</Text>
                  </View>
                </View>
              )}
              onSwipedAll={nextLetter}
              cardIndex={0}
              backgroundColor="transparent"
              stackSize={3}
            />
          ) : (
            searchedText.trim() && (
              <View
                style={[
                  styles.card,
                  { backgroundColor: Colors.primaryCyanColor }
                ]}
              >
                <View style={styles.content}>
                  <Text style={styles.word}>{t("No results found")}</Text>
                </View>
              </View>
            )
          )}
        </View>
      </AppSafeAreaView>
    </AppLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: moderateScale(16),
    // justifyContent: "center",
  },
  tagList: {
    flexDirection: "row",
    paddingHorizontal: moderateScale(16),
    // paddingTop: moderateScale(16),
    paddingBottom: moderateScale(10),
  },
  tag: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins-Medium",
    marginRight: 12,
    paddingBottom: 4,
    opacity: 0.6,
  },
  selectedTag: {
    color: Colors.darkYellow,
    opacity: 1,
    fontFamily: "Poppins-SemiBold",
    borderBottomWidth: 2,
    borderBottomColor: Colors.darkYellow,
  },
  card: {
    backgroundColor: Colors.primaryCyanColor,
    borderRadius: 10,
    padding: moderateScale(20),
    marginVertical: moderateScale(20),
    borderBottomWidth: moderateScale(20),
    // borderBottomLeftRadius: 50,
    borderBottomColor: Colors.darkYellow,
    height: "80%",
    width: "100%",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  content: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(20),
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 130,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  word: {
    fontSize: 24,
    padding: 4,
    fontFamily: "Quicksand-Bold",
    color: Colors.textSecondaryDark,
    marginBottom: 8,
  },
  definition: {
    fontSize: 16,
    color: Colors.textSecondaryLight,
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  category: {
    fontSize: 14,
    color: Colors.darkYellow,
    fontStyle: "italic",
    fontFamily: "Quicksand-SemiBold",
  },
  noResult: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaa",
    marginTop: 50,
  },
});

export default DictionaryScreen;
