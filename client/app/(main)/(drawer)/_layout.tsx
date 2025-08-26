import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import SideDrawer from "@/src/components/drawer/SideDrawer";

const MainLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
