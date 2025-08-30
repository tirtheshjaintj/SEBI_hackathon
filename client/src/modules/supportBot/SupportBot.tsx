import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import { moderateScale } from "@/src/utils/responsiveness/responsiveness";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import RenderMessage from "./components/RenderMessage";
import { banks, issues } from "./constants";
import jsonData from "./main.json";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";

export type Message = {
  id: number;
  text?: string;
  value?: string | string[];
  action?: {
    type: string;
    value?: string | string[];
  };
  type: string;
  sender: string;
  step?: string;
  content?: string;
  options?: string[];
  isBank?: boolean;
};

type Step = {
  step: string;
  type: string;
  content?: string;
  value?: string | string[];
  options?: string[];
};

type BankData = {
  [issue: string]: {
    [bank: string]: {
      steps: Step[];
    };
  };
};

const SupportBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIssue, setCurrentIssue] = useState<string | null>(null);
  const [currentBank, setCurrentBank] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);
  const flatListRef = useRef<FlatList<Message>>(null);
  const messageIdRef = useRef(3);
  const { t } = useTranslation();

  const bankData: BankData = jsonData;

  // ------------------ Reset Chat ------------------
  const resetChat = () => {
    setCurrentIssue(null);
    setCurrentBank(null);
    setCurrentStep(0);
    setMessages([
      {
        id: 1,
        content: t("Hello! How can I help you?"),
        type: "message",
        sender: "bot",
      },
      {
        id: 2,
        content: t("Please select your issue:"),
        type: "message",
        sender: "bot",
        options: issues,
      },
    ]);
    setCurrentMessageId(2);
    messageIdRef.current = 3; // reset ID generator
  };

  useEffect(() => {
    resetChat();
  }, []);

  // ------------------ Scroll to Bottom ------------------
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // ------------------ Handle Option Selection ------------------
  const handleOptionSelect = (option: string, messageId: number) => {
    if (messageId !== currentMessageId) return; // prevent clicking inactive options

    if (!currentIssue) {
      setCurrentIssue(option);
      const userMsgId = messageIdRef.current++;
      const botMsgId = messageIdRef.current++;

      setMessages((prev) => [
        ...prev,
        { id: userMsgId, content: option, type: "message", sender: "user" },
        {
          id: botMsgId,
          content: t("Please select your bank:"),
          type: "options",
          sender: "bot",
          options: banks,
          isBank: true,
        },
      ]);
      setCurrentMessageId(botMsgId);
    } else if (!currentBank) {
      setCurrentBank(option);
      const userMsgId = messageIdRef.current++;
      setMessages((prev) => [
        ...prev,
        { id: userMsgId, content: option, type: "message", sender: "user" },
      ]);
      startSteps(currentIssue, option);
    } else if (option === "Continue") {
      nextStep();
    } else if (option === "Back to Home") {
      router.replace("/home");
    }
  };

  // ------------------ Start Steps ------------------
  const startSteps = (issue: string, bank: string) => {
    const steps = bankData[issue]?.[bank]?.steps || [];
    if (steps.length > 0) {
      showStep(0, steps);
    }
  };

  // ------------------ Show Step ------------------
  const showStep = (index: number, steps: Step[]) => {
    const step = steps[index];
    if (!step) return;

    const newMessageId = messageIdRef.current++;
    setMessages((prev) => [
      ...prev,
      {
        id: newMessageId,
        content: step.content ?? "",
        type: step.type,
        sender: "bot",
        step: step.step,
        options:
          index < steps.length - 1
            ? step.options ?? ["Continue"]
            : ["Back to Home"],
        value: step.value,
        action: { value: step.value ?? "", type: step.type },
      },
    ]);
    setCurrentStep(index);
    setCurrentMessageId(newMessageId);
  };

  // ------------------ Next Step ------------------
  const nextStep = () => {
    if (currentIssue && currentBank) {
      const steps = bankData[currentIssue]?.[currentBank]?.steps || [];
      setCurrentStep((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex < steps.length) {
          showStep(nextIndex, steps);
        }
        return nextIndex;
      });
    }
  };

  // ------------------ Render ------------------
  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />

      {/* Bot Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.primaryCyanColor,
          padding: 10,
          marginBottom: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <Image
              source={require("@/assets/images/bot.png")}
              contentFit="cover"
              style={{
                width: moderateScale(40),
                height: moderateScale(40),
                borderRadius: moderateScale(30),
              }}
            />
          </View>
          <View>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              {t("Support Bot")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#4CD137",
                  marginRight: 5,
                }}
              />
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {t("Online Now")}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={resetChat} style={{ padding: 6 }}>
          <MaterialIcons name="refresh" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RenderMessage
              item={item}
              onOptionSelect={(option) => handleOptionSelect(option, item.id)}
              nextStep={nextStep}
              currentMessageId={currentMessageId}
            />
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default SupportBot;
