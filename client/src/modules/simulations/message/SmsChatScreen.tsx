// Localized content
const content = {
  en: {
    scamText:
      "Dear user, your account will be suspended soon. Please verify immediately at https://bit.ly/verify-now",
    olderMessages: [
      "Your OTP for login is 456789.",
      "Welcome to our service! We hope you enjoy it.",
      "Reminder: Recharge your plan to continue enjoying services.",
    ],
    modal: {
      title: "⚠️ Warning",
      text: "If you click on this link, your phone can get malware or virus attack and that’s how SMS scams happen.",
    },
    inputPlaceholder: "Type a message...",
  },
  hi: {
    scamText:
      "प्रिय उपयोगकर्ता, आपका खाता जल्द ही निलंबित किया जाएगा। कृपया तुरंत https://bit.ly/verify-now पर सत्यापित करें।",
    olderMessages: [
      "लॉगिन के लिए आपका OTP है 456789।",
      "हमारी सेवा में आपका स्वागत है! हमें आशा है कि आपको पसंद आएगी।",
      "याद दिलाना: सेवाओं का लाभ लेने के लिए अपना प्लान रिचार्ज करें।",
    ],
    modal: {
      title: "⚠️ चेतावनी",
      text: "यदि आप इस लिंक पर क्लिक करते हैं, तो आपके फोन में मालवेयर या वायरस आ सकता है और ऐसे ही SMS स्कैम होते हैं।",
    },
    inputPlaceholder: "संदेश लिखें...",
  },
  pa: {
    scamText:
      "ਪਿਆਰੇ ਉਪਭੋਗਤਾ, ਤੁਹਾਡਾ ਖਾਤਾ ਜਲਦੀ ਹੀ ਨਿਲੰਬਿਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ https://bit.ly/verify-now 'ਤੇ ਸਤਿਆਪਿਤ ਕਰੋ।",
    olderMessages: [
      "ਲਾਗਇਨ ਲਈ ਤੁਹਾਡਾ OTP ਹੈ 456789.",
      "ਸਾਡੀ ਸੇਵਾ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! ਅਸੀਂ ਆਸ਼ਾ ਕਰਦੇ ਹਾਂ ਤੁਹਾਨੂੰ ਪਸੰਦ ਆਏਗੀ।",
      "ਯਾਦ ਦਿਵਾਉਣਾ: ਸੇਵਾਵਾਂ ਜਾਰੀ ਰੱਖਣ ਲਈ ਆਪਣਾ ਪਲਾਨ ਰੀਚਾਰਜ ਕਰੋ।",
    ],
    modal: {
      title: "⚠️ ਚੇਤਾਵਨੀ",
      text: "ਜੇ ਤੁਸੀਂ ਇਸ ਲਿੰਕ 'ਤੇ ਕਲਿੱਕ ਕਰਦੇ ਹੋ, ਤਾਂ ਤੁਹਾਡੇ ਫੋਨ ਵਿੱਚ ਮਾਲਵੇਅਰ ਜਾਂ ਵਾਇਰਸ ਆ ਸਕਦਾ ਹੈ ਅਤੇ ਐਸੇ ਹੀ SMS ਧੋਖਾਧੜੀ ਹੁੰਦੀ ਹੈ।",
    },
    inputPlaceholder: "ਇੱਕ ਸੁਨੇਹਾ ਲਿਖੋ...",
  },
};

import TtsManager from "@/src/services/texttospeech/TtsManager";
import { languageType } from "@/src/types/constants";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SmsChatScreenProps {
  onClose: () => void;
}

const SmsChatScreen: React.FC<SmsChatScreenProps> = ({ onClose }) => {
  const unknownNumber = "+91 98765 43210";

  // set locale here: 'en', 'hi', 'pa'
  const { t, i18n } = useTranslation();
  const locale = i18n.language as languageType;

  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    const configureTTSAndSpeak = async () => {
      // Select voice & langCode based on locale
      let langCode: string;
      let voice: string;

      switch (locale) {
        case "hi":
          langCode = "hi-IN";
          voice = "hi-in-x-hia-network";
          break;
        case "pa":
          langCode = "pa-IN";
          voice = "pa-in-x-pag-local";
          break;
        case "en":
        default:
          langCode = "en-US";
          voice = "en-us-x-sfg-network";
          break;
      }

      // Configure TTS
      await TtsManager.setVoice(voice);
      await TtsManager.setLanguage(langCode);

      // Delay showing modal and speaking
      const timer = setTimeout(() => {
        setShowWarningModal(true);
        TtsManager.speak(content[locale].modal.text);
      }, 1000);

      return () => {
        clearTimeout(timer);
        TtsManager.stop();
      };
    };

    configureTTSAndSpeak();
  }, [locale]);


  useEffect(() => {
    return () => {
      TtsManager.stop();
    }
  },[])


  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1597759893284-48b4e7eb2d44?auto=format&fit=crop&w=800&q=80",
      }}
      style={styles.background}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          onPress={onClose}
          name="arrow-back"
          size={24}
          color="#fff"
          style={{ marginRight: 12 }}
        />
        <Text style={styles.headerText}>{unknownNumber}</Text>
      </View>

      {/* Chat area */}
      <View style={styles.chatArea}>
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {content[locale].olderMessages.map((msg, index) => (
            <View key={index} style={styles.messageBubble}>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{content[locale].scamText}</Text>
          </View>
        </ScrollView>

        {/* Input box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={content[locale].inputPlaceholder}
            placeholderTextColor="#888"
          />
          <TouchableOpacity>
            <Ionicons
              name="send"
              size={24}
              color="#4CAF50"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Warning Modal */}
      {showWarningModal && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{content[locale].modal.title}</Text>
          <Text style={styles.modalText}>{content[locale].modal.text}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>{t("Got it")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  messageBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 10,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    color: "#000",
  },
  divider: {
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
    alignSelf: "stretch",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  modal: {
    position: "absolute",
    top: "30%",
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.85)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    zIndex: 9999,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    color: "#ddd",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SmsChatScreen;
