// Localized content
const content = {
  en: {
    scamText:
      "Exclusive SEBI-approved stock tip! Buy XYZ Ltd today and get 200% guaranteed profit. Join our WhatsApp group: https://bit.ly/stock-tip",
    olderMessages: [
      "Your trade for 15 shares of ABC Ltd has been executed.",
      "Reminder: Market closes at 3:30 PM. Place your orders in time.",
      "Dividend of ₹120 credited to your linked bank account.",
    ],
    modal: {
      title: "⚠️ Warning",
      text: "SEBI never gives stock tips or authorizes WhatsApp/Telegram groups. Any promise of guaranteed returns is a scam.",
    },
    inputPlaceholder: "Type a message...",
  },
  hi: {
    scamText:
      "एक्सक्लूसिव SEBI-अप्रूव्ड स्टॉक टिप! आज XYZ Ltd खरीदें और 200% गारंटीड प्रॉफिट पाएं। हमारा WhatsApp ग्रुप जॉइन करें: https://bit.ly/stock-tip",
    olderMessages: [
      "आपका 15 शेयरों का ऑर्डर सफलतापूर्वक पूरा हुआ।",
      "याद दिलाना: मार्केट 3:30 बजे बंद हो जाएगा। समय पर ऑर्डर करें।",
      "₹120 का डिविडेंड आपके बैंक खाते में क्रेडिट हुआ।",
    ],
    modal: {
      title: "⚠️ चेतावनी",
      text: "SEBI कभी भी स्टॉक टिप्स नहीं देता और न ही WhatsApp/Telegram ग्रुप को मान्यता देता है। गारंटीड रिटर्न का वादा हमेशा धोखाधड़ी है।",
    },
    inputPlaceholder: "संदेश लिखें...",
  },
  pa: {
    scamText:
      "ਖਾਸ SEBI-ਅਪ੍ਰੂਵਡ ਸਟਾਕ ਟਿਪ! ਅੱਜ XYZ Ltd ਖਰੀਦੋ ਅਤੇ 200% ਗਾਰੰਟੀਡ ਮੁਨਾਫਾ ਪ੍ਰਾਪਤ ਕਰੋ। ਸਾਡਾ WhatsApp ਗਰੁੱਪ ਜੁੜੋ: https://bit.ly/stock-tip",
    olderMessages: [
      "ਤੁਹਾਡਾ 15 ਸ਼ੇਅਰਾਂ ਦਾ ਆਰਡਰ ਸਫਲਤਾਪੂਰਵਕ ਪੂਰਾ ਹੋਇਆ।",
      "ਯਾਦ ਰੱਖੋ: ਮਾਰਕੀਟ 3:30 ਵਜੇ ਬੰਦ ਹੋ ਜਾਵੇਗੀ। ਸਮੇਂ ਤੇ ਆਰਡਰ ਕਰੋ।",
      "₹120 ਡਿਵਿਡੈਂਡ ਤੁਹਾਡੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾਂ ਹੋਇਆ।",
    ],
    modal: {
      title: "⚠️ ਚੇਤਾਵਨੀ",
      text: "SEBI ਕਦੇ ਵੀ ਸਟਾਕ ਟਿਪਸ ਨਹੀਂ ਦਿੰਦਾ ਅਤੇ ਨਾ ਹੀ WhatsApp/Telegram ਗਰੁੱਪ ਨੂੰ ਮਨਜ਼ੂਰ ਕਰਦਾ ਹੈ। ਗਾਰੰਟੀਡ ਰਿਟਰਨ ਦਾ ਵਾਅਦਾ ਹਮੇਸ਼ਾ ਠੱਗੀ ਹੁੰਦਾ ਹੈ।",
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
