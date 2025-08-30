import axiosInstance from "@/src/apis/axiosInstance";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ScannerButton from "../../security/components/ScannerButton";
import OrDivider from "../components/OrDivider";
import ResultModal from "../components/ResultModal";
import styles from "../styles";
import { StatusBar } from "expo-status-bar";

export const getLanguageName = (code: string) => {
  switch (code) {
    case "hi":
      return "Hindi";
    case "en":
      return "English";
    case "pa":
      return "Punjabi";
    default:
      return "English";
  }
};

export default function SpamScreen() {
  const {
    i18n: { language: locale },
    t,
  } = useTranslation();

  const textInputRef = useRef(null);

  const [message, setMessage] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const [scanResult, setScanResult] = useState({
    label: "",
    reason: "",
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      Toast.show({
        type: "success",
        text1: "Image Added Successfully",
        position: "bottom",
      });
    }
  };
  const handleScan = async () => {
    if (!message && !imageUri) {
      Toast.show({
        type: "error",
        text1: "Please enter a message or pick an image",
        position: "bottom",
      });
      return;
    }

    setLoading(true);
    setProgressValue(0);
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 70);
    try {
      const formdata = new FormData();
      formdata.append("prompt", message);
      formdata.append("language", getLanguageName(locale));

      if (imageUri) {
        const filename = imageUri.split("/").pop() || `photo.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formdata.append("file", {
          uri: imageUri,
          name: filename,
          type: type,
        } as any);
      }

      const response = await axiosInstance.post("/ai/detect", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Toast.show({
        type: "success",
        text1: `It is ${response.data.result.label}`,
        position: "bottom",
      });
      setScanResult(response.data.result);
      setShowResult(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong. Try again.",
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };
  // const handleScan = async () => {
  //     if (!message && !imageUri) {
  //         Toast.show({
  //             type: "error",
  //             text1: t("Please enter a message or pick an image"),
  //             position: "bottom",
  //         });
  //         return;
  //     }

  //     setLoading(true);
  //     setProgressValue(0);
  //     const interval = setInterval(() => {
  //         setProgressValue((prev) => {
  //             if (prev >= 100) {
  //                 clearInterval(interval);
  //                 return 100;
  //             }
  //             return prev + 1;
  //         });
  //     }, 70);
  //     try {
  //         const formdata = new FormData();
  //         formdata.append("prompt", message);
  //         formdata.append("language", getLanguageName(locale));

  //         if (imageUri) {
  //             const filename = imageUri.split('/').pop() || `photo.jpg`;
  //             const match = /\.(\w+)$/.exec(filename);
  //             const type = match ? `image/${match[1]}` : `image`;

  //             formdata.append("file", {
  //                 uri: imageUri,
  //                 name: filename,
  //                 type: type,
  //             } as any);
  //         }

  //         function detectMajorityLanguage(text:string) {
  //             const patterns : { [key: string]: RegExp } = {
  //                 hi: /[\u0900-\u097F]/g,   // Devanagari (Hindi)
  //                 pa: /[\u0A00-\u0A7F]/g,   // Gurmukhi (Punjabi)
  //                 en: /[A-Za-z]/g           // English
  //             };

  //             const counts : { [key: string]: number } = {
  //                 hi: 0,
  //                 pa: 0,
  //                 en: 0
  //             };

  //             for (const lang in patterns) {
  //                 const matches = text.match(patterns[lang]);
  //                 counts[lang] = matches ? matches.length : 0;
  //             }

  //             const total = counts.hi + counts.pa + counts.en;

  //             if (total === 0) return 'unknown';

  //             // Find language with max count
  //             let maxLang = 'unknown';
  //             let maxCount = 0;

  //             for (const lang in counts) {
  //                 if (counts[lang] > maxCount) {
  //                 maxCount = counts[lang];
  //                 maxLang = lang;
  //                 }
  //             }

  //             return maxLang;
  //             }

  //         const language = detectMajorityLanguage(message);

  //         const urlMap: Record<string, string | undefined> = {
  //         hi: process.env.EXPO_PUBLIC_SPAM_DETECTION_URL_HI,
  //         pa: process.env.EXPO_PUBLIC_SPAM_DETECTION_URL_PA,
  //         default: process.env.EXPO_PUBLIC_SPAM_DETECTION_URL_EN,
  //         };

  //         const selectedUrl = urlMap[language] ?? urlMap.default;

  //         if (!selectedUrl) {
  //         throw new Error("No spam detection URL configured.");
  //         }

  //         const response: { data: { isSpam: boolean } } = await axios.post(selectedUrl, { text: message });

  //         const isSpam = response?.data?.isSpam;
  //         if (isSpam) {
  //             Toast.show({
  //                 type: "error",
  //                 text1: "Spam Detected",
  //                 position: "bottom",
  //             });
  //         }else{
  //             Toast.show({
  //                 type: "success",
  //                 text1: "Not a Spam",
  //                 position: "bottom",
  //             });
  //         }

  //         setScanResult({
  //             label: isSpam ? "Spam" : "Not a Spam",
  //             reason: isSpam ? "Spam Detected" : "Not a Spam"});
  //         setShowResult(true);
  //     } catch (error) {
  //         Toast.show({
  //             type: "error",
  //             text1: t("Something went wrong Try again"),
  //             position: "bottom",
  //         });
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const handleReset = () => {
    setMessage("");
    setImageUri(null);
    Toast.show({
      type: "success",
      text1: t("Ready for next Detection"),
      position: "bottom",
    });
  };

  useEffect(() => {
    //@ts-ignore
    textInputRef.current?.blur();
  }, [imageUri]);
  const buttonScale = new Animated.Value(1);
  const inputFocusAnim = new Animated.Value(0);

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleInputFocus = () => {
    Animated.timing(inputFocusAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleInputBlur = () => {
    Animated.timing(inputFocusAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const borderColor = inputFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e0e0e0", Colors.primaryCyanColor],
  });

  const shadowOpacity = inputFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.3],
  });
  return (
    <AppSafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <CommonToolbar title={t("AI Spam Detector")} />

      <ScannerButton
        apps={[]}
        scanApps={handleScan}
        loading={loading}
        progressValue={progressValue}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Message Input */}
          <View style={styles.inputContainer}>
            <Animated.View
              style={[
                styles.inputWrapper,
                {
                  borderColor,
                  shadowOpacity,
                },
              ]}
            >
              <TextInput
                value={message}
                ref={textInputRef}
                autoFocus={false}
                onChangeText={setMessage}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder={t("Type your received message here") + "..."}
                placeholderTextColor={Colors.textSecondaryDark}
                multiline
                style={styles.textInput}
              />
              {message.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setMessage("");
                    Toast.show({
                      type: "info",
                      text1: t("Message box Cleared"),
                      position: "bottom",
                    });
                  }}
                >
                  <Ionicons
                    name="close-circle"
                    size={24}
                    color={Colors.textSecondaryDark}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.inputLabelContainer}>
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={20}
                  color={Colors.textSecondaryDark}
                />
                <Text style={styles.inputLabel}>{t("Message Content")}</Text>
              </View>
            </Animated.View>
          </View>
          <OrDivider />
          {/* Image Upload Section */}
          <Animated.View
            style={[
              styles.imageButton,
              { transform: [{ scale: buttonScale }] },
            ]}
          >
            <TouchableOpacity
              disabled={loading}
              onPress={pickImage}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
              activeOpacity={0.8}
              style={styles.imageButtonInner}
            >
              {imageUri ? (
                <>
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.previewImage}
                  />
                  <View style={styles.imageOverlay}>
                    <Ionicons name="camera-reverse" size={32} color="white" />
                    <Text style={styles.imageButtonText}>
                      {t("Change Image")}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Ionicons
                    name="image-outline"
                    size={48}
                    color={Colors.primaryCyanColor}
                    style={styles.imageIcon}
                  />
                  <Text style={styles.imageButtonText}>{t("Add Image")}</Text>
                  <Text style={styles.imageSubText}>{t("Optional")}</Text>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
      {/* Result Modal */}
      <ResultModal
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
        showResult={showResult}
        handleReset={handleReset}
        scanResult={scanResult}
        setShowResult={setShowResult}
      />
    </AppSafeAreaView>
  );
}
