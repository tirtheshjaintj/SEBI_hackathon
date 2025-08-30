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
                uri: "https://imgs.search.brave.com/SMgg1khnA9KEV96_WWjAKWmwugXY23Lkm9GS72BTsUM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/aW5mbHVlbmNlci1y/ZWNvcmRpbmctbmV3/LXZpZGVvXzIzLTIx/NDg1MjYyMzYuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw",
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
                uri: "https://imgs.search.brave.com/7rN86xdIWq4-tWE92XVUsRcWxe6b-wGbl-t90EdQMro/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9weXJhbWlk/LXNjaGVtZS1pY29u/LWRvd25sb2FkLWlu/LXN2Zy1wbmctZ2lm/LWZpbGUtZm9ybWF0/cy0taGllcmFyY2h5/LW5ldHdvcmstc2Nh/bS1wb256aS1qdXN0/aWNlLWFuZC1jb3Vy/dC1wYWNrLWNyaW1l/LXNlY3VyaXR5LWlj/b25zLTExNDI0MzMz/LnBuZz9mPXdlYnAm/dz0xMjg",
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
