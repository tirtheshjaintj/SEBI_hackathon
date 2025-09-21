import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import SideDrawer from "@/src/components/drawer/SideDrawer";
import { StatusBar } from "expo-status-bar";

const MainLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />

      <Drawer
        screenOptions={{
          headerShown: false,
          drawerPosition: "left",
          drawerType: "front",
          drawerStyle: { width: 300 },
        }}
        drawerContent={(props) => <SideDrawer {...props} />}
      />
    </GestureHandlerRootView>
  );
};

export default MainLayout;
