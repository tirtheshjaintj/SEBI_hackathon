import axiosInstance from "@/src/apis/axiosInstance";
import SimulationTabs from "@/src/components/tabs/SimulationTabs";
import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";


const SimulationLayout = () => {
  const {t} = useTranslation()
  
  
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
          tabBarIcon: ({ focused }) => (
            <Image
              //   source={require(`@/src/assets/images/explore/panchang.png`)}
              source={{
                uri: "https://cdn.pixabay.com/photo/2021/10/29/21/40/phone-icon-6753051_1280.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority={"high"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t("Chat"),
          tabBarIcon: ({ focused }) => (
            <Image
              //   source={require(`@/src/assets/images/explore/rashifal.png`)}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/9171/9171503.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority={"high"}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="digital_arrest"
        options={{
          title: t("Digital Arrest"),
          tabBarIcon: ({ focused }) => (
            <Image
              //   source={require(`@/src/assets/images/explore/quotes.png`)}
              source={{
                uri: "https://res.cloudinary.com/surajgsn/image/upload/fl_preserve_transparency/v1754270957/11067664-cca5-4b13-85c1-f75154bb279f.jpg?_s=public-apps",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority={"high"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: t("Message"),
          tabBarIcon: ({ focused }) => (
            <Image
              //   source={require(`@/src/assets/images/explore/calender.png`)}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/234/234129.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority={"high"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="phishing"
        options={{
          title: t("Phishing"),
          tabBarIcon: ({ focused }) => (
            <Image
              //   source={require(`@/src/assets/images/explore/quotes.png`)}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/4615/4615955.png",
              }}
              style={styles.tab_icon_image}
              contentFit="cover"
              priority={"high"}
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
