import axiosInstance from "@/src/apis/axiosInstance";
import TtsManager from "@/src/services/texttospeech/TtsManager";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  NativeModules,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Toast from "react-native-toast-message";
import NewsShimmer from "../../news/NewsShimmer";
import styles from "../styles";
import { StatusBar } from "expo-status-bar";
const { DeviceSecurity } = NativeModules;

interface Chat {
  message: string;
  response: string;
  image?: string;
}

export default function ChatBotScreen() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(true);
  const [prompt, setPrompt] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mute, setMute] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [listeningModalVisible, setListeningModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const InputBoxRef = useRef<TextInput>(null);
  const [voiceMode, setVoiceMode] = useState(true);

  const {
    i18n: { language: locale },
    t,
  } = useTranslation();

  async function isLanguageSupported(langCode: string): Promise<boolean> {
    try {
      const voices = await TtsManager.getAvailableVoices(); // returns array of voices with language properties
      // Check if any voice has language starting with langCode (e.g. "en", "hi", "pa")
      //@ts-ignore
      return voices.some((voice) => voice.language?.startsWith(langCode));
    } catch (error) {
      console.error("Failed to fetch TTS voices:", error);
      return false;
    }
  }

  const animateFade = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const voicesConfig = {
    hi: { lang: "hi-IN", voice: "hi-in-x-hia-network" },
    pa: { lang: "pa-IN", voice: "pa-in-x-pag-local" },
    en: { lang: "en-US", voice: "en-us-x-sfg-network" },
  };

  const speak = async (text: string) => {
    if (!mute) {
      try {
        const langToUse = locale || "en";
        //@ts-ignore
        const voiceConfig = voicesConfig[langToUse];

        // set language & voice (if available in your TtsManager API)
        await TtsManager.setLanguage(voiceConfig.lang);
        if (TtsManager.setVoice) {
          await TtsManager.setVoice(voiceConfig.voice);
        }

        // setup callback
        const onDoneCallback = () => {
          if (voiceMode) {
            startSpeechToText();
          }
          console.log("Speech has finished.");
          TtsManager.removeOnDone(onDoneCallback);
        };
        TtsManager.onDone(onDoneCallback);

        // speak
        await TtsManager.speak(text);
      } catch (error) {
        console.error("TTS speak error:", error);
      }
    }
  };

  const getChats = async () => {
    try {
      setIsLoading(true);
      setChatLoading(true);
      const response = await axiosInstance.get("/ai/chats");
      setChats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setChatLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChats();
    return () => {
      stopSpeechToText();
    };
  }, []);

  const handleImagePick = async () => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    })();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const sendChat = async (message: string) => {
    if (!message.trim()) return;
    const sendingMessage = message;
    const sendingImage = imageUri;
    setPrompt("");
    setImageUri(null);
    animateFade();
    const tempChat: Chat = {
      message: sendingMessage,
      response: "", // temporary placeholder
      image: sendingImage || undefined,
    };
    setChats((prev) => [...prev, tempChat]);

    setIsLoading(true);
    InputBoxRef.current?.blur();
    try {
      const formdata = new FormData();
      formdata.append("prompt", sendingMessage);
      if (sendingImage) {
        const filename = sendingImage.split("/").pop() || "image.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formdata.append("file", {
          uri: sendingImage,
          name: filename,
          type,
        } as any);
      }
      console.log("Sending", message);
      const response = await axiosInstance.post("/ai/chat", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setChats((prev) => {
        const updated = [...prev];
        updated[prev.length - 1] = {
          message: sendingMessage,
          response: response.data.response,
          image: sendingImage || undefined,
        };
        return updated;
      });
      speak(response.data.response);
      //@ts-ignore
      circularProgressRef.current?.animate(100); // Optional: reset when not loading
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to send message",
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startSpeechToText = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "This app needs access to your microphone for speech input.",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show({
          type: "error",
          text1: "Microphone permission is required",
        });
        return;
      }
    }
    await TtsManager.stop();
    setListeningModalVisible(true); // show c
    try {
      const result = await DeviceSecurity.startListening();
      if (result?.trim()) {
        console.log("Result", result);
        setPrompt(result);
        setVoiceMode(true);
        setListeningModalVisible(false);
        await sendChat(result);
      } else {
        Toast.show({ type: "info", text1: "No voice input detected" });
      }
    } catch (error) {
      console.log(error);
      // Toast.show({ type: 'error', text1: 'Speech recognition failed' });
    } finally {
      setListeningModalVisible(false);
    }
  };

  const stopSpeechToText = async () => {
    try {
      await DeviceSecurity.stopListening();
      await TtsManager.stop();
      setVoiceMode(false);
      setMute(true);
      setListeningModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    if (mute) {
      (async () => {
        try {
          await TtsManager.stop();
        } catch (e) {
          console.error("Error stopping TTS:", e);
        }
      })();
    }
  }, [mute]);

  const renderItem = ({ item, index }: { item: Chat; index: number }) => (
    <Animated.View style={[styles.chatBubbleWrapper]}>
      <View style={styles.userBubble}>
        <Text style={styles.userText}>{item.message}</Text>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.chatImage} />
        )}
      </View>
      {item.response == "" ? (
        <View style={styles.aiBubble}>
          <Text style={styles.aiText}>💬 {t("Thinking..")}</Text>
          <View style={styles.loadingDotContainer}>
            <View style={styles.loadingDot} />
            <View style={[styles.loadingDot]} />
            <View style={[styles.loadingDot]} />
          </View>
        </View>
      ) : (
        <View style={styles.aiBubble}>
          <Text style={styles.aiText}>{item.response}</Text>
        </View>
      )}
    </Animated.View>
  );

  const circularProgressRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      //@ts-ignore
      circularProgressRef.current?.animate(70, 200); // Animate to 100% in 2s
    } else {
      //@ts-ignore
      circularProgressRef.current?.animate(0); // Optional: reset when not loading
    }
  }, [isLoading]);

  return (
    <View style={[styles.container]}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.loaderWrapper}>
          <AnimatedCircularProgress
            ref={circularProgressRef}
            size={120}
            width={6}
            fill={0} // percent fill (can be animated)
            tintColor="#4A90E2"
            backgroundColor="#eee"
            rotation={0} // top start
          >
            {() => (
              <TouchableOpacity
                onPress={() => {
                  setMute(false);
                  setVoiceMode(true);
                  startSpeechToText();
                }}
              >
                <Image
                  source={{
                    uri: "https://img.freepik.com/premium-vector/ai-bot-vector_986045-32.jpg",
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
          </AnimatedCircularProgress>
          <Text>{t("DhanRakshak AI")}</Text>
        </View>

        {chatLoading ? (
          <NewsShimmer />
        ) : (
          <FlatList
            ref={flatListRef}
            data={chats}
            renderItem={renderItem}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ padding: 10 }}
            style={{ flex: 1 }}
          />
        )}

        {imageUri && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <TouchableOpacity
              onPress={() => setImageUri(null)}
              style={styles.closePreviewBtn}
            >
              <MaterialIcons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputBar}>
          <TouchableOpacity onPress={handleImagePick}>
            <MaterialIcons name="image" size={28} color="#6200EE" />
          </TouchableOpacity>

          <TextInput
            ref={InputBoxRef}
            value={prompt}
            onChangeText={setPrompt}
            placeholder={t("Ask your Financial AI advisor") + "..."}
            style={styles.inputField}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity onPress={startSpeechToText}>
            <MaterialIcons name="keyboard-voice" size={28} color="#6200EE" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => sendChat(prompt)}
            style={styles.sendButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <MaterialIcons name="send" size={22} color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.muteBtn, { opacity: 0.7 }]}
            onPress={() => {
              setMute(!mute);
            }}
          >
            <MaterialIcons
              name={mute ? "volume-off" : "volume-up"}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomBtn, { opacity: 0.5 }]}
            onPress={scrollToBottom}
          >
            <MaterialIcons name="arrow-downward" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={listeningModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setListeningModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 24,
                borderRadius: 16,
                alignItems: "center",
                elevation: 10,
              }}
            >
              <MaterialIcons name="hearing" size={40} color="#6200EE" />
              <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
                {t("Listening")}...
              </Text>
              <Text style={{ fontSize: 18, color: "#666", marginVertical: 20 }}>
                {t("Please Speak Clearly into your microphone")}
              </Text>
              <TouchableOpacity onPress={stopSpeechToText}>
                <Text style={[styles.sendButton, { color: "white" }]}>
                  {t("Turn Off Voice Mode")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
      <Toast />
    </View>
  );
}
