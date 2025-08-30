import { Text, View } from "react-native";
import React, { Component } from "react";
import SupportBot from "@/src/modules/supportBot/SupportBot";
import { StatusBar } from "expo-status-bar";

export default class support_bot extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="dark" />

        <SupportBot />
      </View>
    );
  }
}
