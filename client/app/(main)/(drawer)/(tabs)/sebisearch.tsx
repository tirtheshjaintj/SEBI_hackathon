import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  Animated,
  FlatList,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { styles } from "@/src/modules/sebisearch/styles";
import sebiApps from "@/src/modules/security/SEBI_DATA/apps.json";
import socialData from "@/src/modules/security/SEBI_DATA/socials.json";
import { Image } from "expo-image";
import { normalize } from "@/src/utils/responsiveness/responsiveness";
import { StatusBar } from "expo-status-bar";
import CustomToolbar from "@/src/components/toolBars/mainToolBar";
import Colors from "@/src/theme/colors";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

// Color constants from your palette
const COLORS = {
  primaryCyanColor: "#113F67",
  secColor: "#10385cff",
  bgPrimary: "#ede7e3",
  secondaryCyanColor: "#113F67",
  gradientCyanPrimary: "#1d4e89",
  gradientCyanSecondary: "#113F67",
  cardBackground: "#FDF4E7",
  textGraySecondary: "#2D2C2C",
  white: "#ffffff",
  textPrimary: "#00072d",
  textSecondaryLight: "#6F7D83",
  purpleGrayTint: "#eef0f2",
};

// ✅ Enhanced Animation wrapper component
const AnimatedCard = ({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) => {
  const anim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      delay: index * 100,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [anim, index]);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [70, 0],
            }),
          },
          {
            scale: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.97, 1],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));
  const [activeFilter, setActiveFilter] = useState("all");
  const { t } = useTranslation();

  // ✅ Prepare combined data once
  const combinedData = useMemo(() => {
    return [
      ...socialData.map((s: any) => ({
        type: "social",
        id: `social-${s["Member Code"]}`,
        name: s["Member Name"] || "",
        memberCode: s["Member Code"] || "",
        facebook: s["Facebook"] || "",
        instagram: s["Instagram"] || "",
        twitter: s["X (formerly Twitter)"] || s["Twitter"] || "",
        youtube: s["Youtube"] || "",
        linkedin: s["LinkedIn"] || "",
        searchableText: `${s["Member Name"]} ${s["Member Code"]} ${s["Facebook"]
          } ${s["Instagram"]} ${s["X (formerly Twitter)"] || s["Twitter"] || ""
          } ${s["Youtube"]} ${s["LinkedIn"]}`.toLowerCase(),
      })),
      ...sebiApps.map((a: any) => ({
        type: "app",
        id: `app-${a.row_id}`,
        name: a.app_product_name || a.app_name || "",
        company: a.company_name || "",
        developer: a.developer_name || "",
        playStore: a.play_store_link || "",
        appStore: a.app_store_link || "",
        searchableText: `${a.app_product_name || a.app_name || ""} ${a.company_name || ""
          } ${a.developer_name || ""}`.toLowerCase(),
      })),
    ];
  }, []);

  // ✅ Proper search filtering across all attributes
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    let filteredResults = combinedData.filter((item) =>
      item.searchableText.includes(q)
    );

    // Apply type filter if needed
    if (activeFilter !== "all") {
      filteredResults = filteredResults.filter(
        (item) => item.type === activeFilter
      );
    }

    return filteredResults;
  }, [query, combinedData, activeFilter]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <AnimatedCard index={index}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: COLORS.primaryCyanColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
            borderLeftWidth: 4,
            borderLeftColor:
              item.type === "app"
                ? COLORS.gradientCyanPrimary
                : COLORS.primaryCyanColor,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor:
                  item.type === "app"
                    ? "rgba(29, 78, 137, 0.1)"
                    : "rgba(17, 63, 103, 0.1)",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Ionicons
                name={item.type === "app" ? "phone-portrait" : "business"}
                size={20}
                color={
                  item.type === "app"
                    ? COLORS.gradientCyanPrimary
                    : COLORS.primaryCyanColor
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: COLORS.textPrimary,
                  marginBottom: 4,
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  alignSelf: "flex-start",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                  backgroundColor:
                    item.type === "app"
                      ? "rgba(29, 78, 137, 0.1)"
                      : "rgba(17, 63, 103, 0.1)",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color:
                      item.type === "app"
                        ? COLORS.gradientCyanPrimary
                        : COLORS.primaryCyanColor,
                  }}
                >
                  {item.type === "app" ? t("App") : t("Broker")}
                </Text>
              </View>
            </View>
          </View>

          {item.type === "app" ? (
            <>
              {item.company && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Ionicons
                    name="business"
                    size={16}
                    color={COLORS.primaryCyanColor}
                  />
                  <Text
                    style={{
                      color: COLORS.textGraySecondary,
                      marginLeft: 8,
                      fontSize: 14,
                    }}
                  >
                    {item.company}
                  </Text>
                </View>
              )}
              {item.developer && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ionicons
                    name="person"
                    size={16}
                    color={COLORS.primaryCyanColor}
                  />
                  <Text
                    style={{
                      color: COLORS.textGraySecondary,
                      marginLeft: 8,
                      fontSize: 14,
                    }}
                  >
                    {item.developer}
                  </Text>
                </View>
              )}
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                {!!item.playStore && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryCyanColor,
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 12,
                      shadowColor: COLORS.primaryCyanColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    onPress={() => Linking.openURL(item.playStore)}
                  >
                    <FontAwesome5
                      name="google-play"
                      size={14}
                      color={COLORS.white}
                    />
                    <Text
                      style={{
                        color: COLORS.white,
                        marginLeft: 6,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {t("Play Store")}
                    </Text>
                  </TouchableOpacity>
                )}
                {!!item.appStore && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryCyanColor,
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      shadowColor: COLORS.primaryCyanColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    onPress={() => Linking.openURL(item.appStore)}
                  >
                    <Ionicons
                      name="logo-apple"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text
                      style={{
                        color: COLORS.white,
                        marginLeft: 6,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {t("App Store")}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <MaterialIcons
                  name="qr-code"
                  size={16}
                  color={COLORS.primaryCyanColor}
                />
                <Text
                  style={{
                    color: COLORS.textGraySecondary,
                    marginLeft: 8,
                    fontSize: 14,
                  }}
                >
                  {t("Member Code")}: {item.memberCode}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {item.facebook && item.facebook !== "NIL" && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryCyanColor,
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 8,
                      marginBottom: 8,
                      shadowColor: COLORS.primaryCyanColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    onPress={() => Linking.openURL(item.facebook)}
                  >
                    <FontAwesome5
                      name="facebook"
                      size={16}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                )}
                {item.instagram && item.instagram !== "NIL" && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryCyanColor,
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 8,
                      marginBottom: 8,
                      shadowColor: COLORS.primaryCyanColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    onPress={() => Linking.openURL(item.instagram)}
                  >
                    <FontAwesome5
                      name="instagram"
                      size={16}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                )}
                {item.twitter && item.twitter !== "NIL" && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryCyanColor,
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 8,
                      marginBottom: 8,
                      shadowColor: COLORS.primaryCyanColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    onPress={() => Linking.openURL(item.twitter)}
                  >
                    <FontAwesome5
                      name="twitter"
                      size={16}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                )}
                {item.youtube && item.youtube !== "NIL" && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryCyanColor,
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 8,
                      marginBottom: 8,
                      shadowColor: COLORS.primaryCyanColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    onPress={() => Linking.openURL(item.youtube)}
                  >
                    <FontAwesome5
                      name="youtube"
                      size={16}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                )}
                {item.linkedin && item.linkedin !== "NIL" && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryCyanColor,
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 8,
                      marginBottom: 8,
                      shadowColor: COLORS.primaryCyanColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    onPress={() => Linking.openURL(item.linkedin)}
                  >
                    <FontAwesome5
                      name="linkedin"
                      size={16}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
      </AnimatedCard>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AppLinearGradient
        colors={[
          Colors.primaryCyanColor,
          Colors.gradientCyanSecondary,
          Colors.white,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.2, 0.3]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <AppSafeAreaView style={{ paddingBottom: 0 }}>
        <CustomToolbar textColor="white" rightIcon={true} streak={true} />
      </AppSafeAreaView>
      <StatusBar style="light" />

      <View
        style={{
          paddingHorizontal: 16,
          flex: 1,
          backgroundColor: COLORS.white,
          gap: normalize(16),
          paddingTop: normalize(16),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {/* ✅ Enhanced Search box */}
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              //   marginBottom: 20,
            },
          ]}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 14,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: COLORS.primaryCyanColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
              borderWidth: 1,
              borderColor: "rgba(17, 63, 103, 0.1)",
            }}
          >
            <Ionicons
              name="search"
              size={20}
              color={COLORS.primaryCyanColor}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder={t("Search SEBI registered apps or brokers...")}
              placeholderTextColor={COLORS.textSecondaryLight}
              value={query}
              onChangeText={setQuery}
              style={{
                flex: 1,
                paddingVertical: 12,
                fontSize: 16,
                color: COLORS.textPrimary,
              }}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={COLORS.textSecondaryLight}
                />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              backgroundColor: "rgba(17, 63, 103, 0.05)",
              // margin: 16,
              borderRadius: 14,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(17, 63, 103, 0.08)",
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "rgba(17, 63, 103, 0.1)",
                width: 32,
                height: 32,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Ionicons
                name="shield-checkmark"
                size={18}
                color={COLORS.primaryCyanColor}
              />
            </View>
            <Text
              style={{
                color: COLORS.textGraySecondary,
                fontSize: 14,
                flex: 1,
                lineHeight: 20,
              }}
            >
              {t("Verified data sourced from")}{" "}
              <Text
                style={{ color: COLORS.primaryCyanColor, fontWeight: "600" }}
                onPress={() => Linking.openURL("https://investor.sebi.gov.in")}
              >
                investor.sebi.gov.in
              </Text>
            </Text>
          </View>
        </Animated.View>
        {/* ✅ Enhanced Filter buttons */}
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: COLORS.textPrimary,
              marginBottom: 12,
            }}
          >
            {t("Filter Results")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "rgba(17, 63, 103, 0.05)",
              borderRadius: 12,
              padding: 4,
              borderWidth: 1,
              borderColor: "rgba(17, 63, 103, 0.08)",
            }}
          >
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 10,
                  alignItems: "center",
                },
                activeFilter === "all" && {
                  backgroundColor: COLORS.primaryCyanColor,
                  shadowColor: COLORS.primaryCyanColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 3,
                },
              ]}
              onPress={() => setActiveFilter("all")}
            >
              <Text
                style={[
                  {
                    fontSize: 14,
                    fontWeight: "600",
                    color: COLORS.textSecondaryLight,
                  },
                  activeFilter === "all" && {
                    color: COLORS.white,
                  },
                ]}
              >
                {t("All")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 10,
                  alignItems: "center",
                },
                activeFilter === "app" && {
                  backgroundColor: COLORS.primaryCyanColor,
                  shadowColor: COLORS.primaryCyanColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 3,
                },
              ]}
              onPress={() => setActiveFilter("app")}
            >
              <Text
                style={[
                  {
                    fontSize: 14,
                    fontWeight: "600",
                    color: COLORS.textSecondaryLight,
                  },
                  activeFilter === "app" && {
                    color: COLORS.white,
                  },
                ]}
              >
                {t("Apps")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 10,
                  alignItems: "center",
                },
                activeFilter === "social" && {
                  backgroundColor: COLORS.primaryCyanColor,
                  shadowColor: COLORS.primaryCyanColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 3,
                },
              ]}
              onPress={() => setActiveFilter("social")}
            >
              <Text
                style={[
                  {
                    fontSize: 14,
                    fontWeight: "600",
                    color: COLORS.textSecondaryLight,
                  },
                  activeFilter === "social" && {
                    color: COLORS.white,
                  },
                ]}
              >
                {t("Brokers")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ✅ Enhanced Results count */}
        {query.length > 0 && (
          <Text
            style={{
              color: COLORS.textSecondaryLight,
              fontSize: 14,
              marginBottom: 16,
              fontWeight: "500",
            }}
          >
            {results.length} result{results.length !== 1 ? "s" : ""} found
            {activeFilter !== "all" &&
              ` in ${activeFilter === "app" ? t("Apps") : t("Brokers")}`}
          </Text>
        )}

        <FlatList
          data={results}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            query ? (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 60,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(17, 63, 103, 0.08)",
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ionicons
                    name="search-outline"
                    size={40}
                    color={COLORS.primaryCyanColor}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: COLORS.textPrimary,
                    marginBottom: 8,
                  }}
                >
                  No results found
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.textSecondaryLight,
                    fontSize: 14,
                    paddingHorizontal: 40,
                    lineHeight: 20,
                  }}
                >
                  Try different keywords or check the official SEBI website
                </Text>
              </Animated.View>
            ) : (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 60,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(17, 63, 103, 0.08)",
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ionicons
                    name="search-outline"
                    size={40}
                    color={COLORS.primaryCyanColor}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: COLORS.textPrimary,
                    marginBottom: 8,
                  }}
                >
                  Search SEBI Database
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.textSecondaryLight,
                    fontSize: 14,
                    paddingHorizontal: 40,
                    lineHeight: 20,
                  }}
                >
                  {t("Enter keywords to find SEBI registered apps and brokers")}
                </Text>
              </Animated.View>
            )
          }
        />
      </View>
    </View>
  );
}
