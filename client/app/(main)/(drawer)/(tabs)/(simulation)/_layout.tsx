import SimulationTabs from "@/src/components/tabs/SimulationTabs";
import Colors from "@/src/theme/colors";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const SimulationLayout = () => {
  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="call"
      tabBar={(props) => <SimulationTabs {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.yellowPrimary,
        tabBarInactiveTintColor: Colors.textSecondaryDark,
        tabBarPosition: "top",
      }}
    >
      <Tabs.Screen
        name="call"
        options={{
          title: t("Phone Call"),
          tabBarIcon: () => (
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2021/10/29/21/40/phone-icon-6753051_1280.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority="high"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: t("Chat"),
          tabBarIcon: () => (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/9171/9171503.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority="high"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="influencer_stock"
        options={{
          title: t("Influencer Stock"),
          tabBarIcon: () => (
            <Image
              source={{
                uri: "https://img.icons8.com/stickers/100/candle-sticks.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority="high"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="message"
        options={{
          title: t("Message"),
          tabBarIcon: () => (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/234/234129.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority="high"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ponzi_scheme"
        options={{
          title: t("Ponzi Scheme"),
          tabBarIcon: () => (
            <Image
              source={{
                uri: "https://img.icons8.com/external-filled-outline-wichaiwi/64/external-ponzinomic-gamefi-filled-outline-wichaiwi.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority="high"
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tab_icon_image: {
    width: 32,
    height: 32,
    alignSelf: "center",
  },
});

export default SimulationLayout;
