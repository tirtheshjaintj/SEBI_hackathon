import { getSession } from "@/src/utils/auth/auth";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";

const Layout = () => {
  const checkSession = async () => {
    const session = await getSession();
    if (session) {
      router.replace("/home");
    }
  };
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <Stack
        screenOptions={{ headerShown: false, animation: "ios_from_right" }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="details" />
      </Stack>
    </>
  );
};

export default Layout;
