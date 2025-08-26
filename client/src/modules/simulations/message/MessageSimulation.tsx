const scamMessages = [{
  en: {
    sender: "VM-ADHAAR",
    text: "Your Aadhar KYC is pending. Verify now at https://bit.ly/kyc-update to avoid service suspension.",
    introSpeech:
      "Now I will tell you how SMS scams happen. Firstly, an SMS will arrive on your number like this.Kindly CLick on the notification to open the message.",
    linkSpeech:
      "Now if you click on this message, a phishing link will open which tries to steal your data.",
  },
  hi: {
    sender: "VM-ADHAAR",
    text: "आपकी आधार KYC लंबित है। सेवा निलंबन से बचने के लिए https://bit.ly/kyc-update पर अभी सत्यापित करें।",
    introSpeech:
      "अब मैं आपको बताऊंगा कि एस एम एस स्कैम कैसे होते हैं। सबसे पहले, आपके नंबर पर ऐसा मैसेज आएगा। कृपया अधिसूचना पर क्लिक करें।",
    linkSpeech:
      "अब अगर आप इस मैसेज पर क्लिक करेंगे, तो एक फिशिंग लिंक खुलेगा जो आपका डेटा चुराने की कोशिश करेगा।",
  },
  pa: {
    sender: "VM-ADHAAR",
    text: "ਤੁਹਾਡੀ ਆਧਾਰ KYC ਬਕਾਇਆ ਹੈ। ਸੇਵਾ ਰੋਕਣ ਤੋਂ ਬਚਣ ਲਈ ਹੁਣੇ https://bit.ly/kyc-update ਤੇ ਸਤਿਆਪਨ ਕਰੋ।",
    introSpeech:
      "ਹੁਣ ਮੈਂ ਦੱਸਾਂਗਾ ਕਿ SMS ਧੋਖਾਧੜੀ ਕਿਵੇਂ ਹੁੰਦੀ ਹੈ। ਸਭ ਤੋਂ ਪਹਿਲਾਂ, ਤੁਹਾਡੇ ਨੰਬਰ ਤੇ ਇਹ ਜਿਹਾ ਮੈਸੇਜ ਆਉਂਦਾ ਹੈ। ਕੁਝ ਸੂਚਨਾ ਪਰ ਕਲਿੱਕ ਕਰੋ।",
    linkSpeech:
      "ਹੁਣ ਜੇ ਤੁਸੀਂ ਇਸ ਮੈਸੇਜ ਨੂੰ ਕਲਿੱਕ ਕਰੋਗੇ, ਤਾਂ ਇੱਕ ਫਿਸ਼ਿੰਗ ਲਿੰਕ ਖੁਲਦਾ ਹੈ ਜੋ ਤੁਹਾਡਾ ਡਾਟਾ ਚੋਰੀ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦਾ ਹੈ।",
  },
}]

import TtsManager from "@/src/services/texttospeech/TtsManager";
import { languageType } from "@/src/types/constants";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


// ✅ Your voices mapping from ChatSimulation
const voices: Record<
  string,
  { scammer: string; victim: string; narrator: string }
> = {
  en: {
    scammer: "en-in-x-ene-network",
    victim: "en-in-x-ena-local",
    narrator: "en-in-x-enc-local",
  },
  hi: {
    scammer: "hi-in-x-hid-network",
    victim: "hi-in-x-hia-local",
    narrator: "hi-in-x-hic-local",
  },
  pa: {
    scammer: "pa-in-x-pag-network",
    victim: "pa-in-x-pae-local",
    narrator: "pa-in-x-pag-local",
  },
};

interface PhoneScreenProps {
  onClose: () => void;
}

const PhoneScreen: React.FC<PhoneScreenProps> = ({ onClose }) => {
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [time, setTime] = useState(new Date());
  const translateY = useRef(new Animated.Value(-100)).current;
  const { t, i18n } = useTranslation();
  const locale = i18n.language as languageType;

  const { sender, text, introSpeech, linkSpeech } =
    scamMessages[(Math.random() * scamMessages.length) | 0][locale];

  // 🎯 Helper: speak text with correct role & locale
  const speakWithRole = async (
    content: string,
    role: "scammer" | "victim" | "narrator"
  ) => {
    await TtsManager.stop();
    await TtsManager.setLanguage(locale);
    await TtsManager.setVoice(voices[locale][role]);

    // Slight variation for roles
    if (role === "narrator") {
      await TtsManager.setPitch(1.1);
      await TtsManager.setSpeechRate(1.0);
    } else if (role === "scammer") {
      await TtsManager.setPitch(1.0);
      await TtsManager.setSpeechRate(1.05);
    } else {
      await TtsManager.setPitch(1.0);
      await TtsManager.setSpeechRate(1.0);
    }

    await TtsManager.speak(content);
  };

  useEffect(() => {
    if (showIntroModal) {
      speakWithRole(introSpeech, "narrator");
    }
  }, [showIntroModal]);

  useEffect(() => {
    if (showLinkModal) {
      speakWithRole(linkSpeech, "narrator");
    }
  }, [showLinkModal]);

  useEffect(() => {
    if (!showIntroModal) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showIntroModal]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
      TtsManager.stop();
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80",
      }}
      style={styles.background}
    >
      {/* Intro Modal */}
      {showIntroModal && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>📢 {introSpeech}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setShowIntroModal(false)}
          >
            <Text style={styles.modalButtonText}>{t("OK, show me")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notification */}
      {showNotification && (
        <Animated.View
          style={[
            styles.notification,
            { transform: [{ translateY }] },
            notificationClicked && {
              opacity: 0.5,
              transform: [{ scale: 0.98 }],
            },
          ]}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "flex-start" }}
            onPress={() => {
              setNotificationClicked(true);
              setTimeout(() => setShowLinkModal(true), 300);
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubble-ellipses" size={24} color="#333" />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.smsSender}>{sender}</Text>
              <Text style={styles.smsText}>{text}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>🔗 {linkSpeech}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => onClose()}
          >
            <Text style={styles.modalButtonText}>{t("Got it")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Clock */}
      <View style={styles.centerContainer}>
        <Text style={styles.timeText}>{formattedTime}</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      {/* Dock */}
      <View style={styles.dock}>
        <TouchableOpacity style={styles.appIcon}>
          <Ionicons name="call" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.appIcon}>
          <Ionicons name="chatbubble" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.appIcon}>
          <Ionicons name="images" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.appIcon}>
          <Ionicons name="camera" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    width: "100%",
  },
  centerContainer: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  timeText: {
    color: "#fff",
    fontSize: 54,
    fontWeight: "200",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  dateText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 6,
    opacity: 0.9,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  dock: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingBottom: 20,
  },
  appIcon: {
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  notification: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  smsSender: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    color: "#000",
  },
  smsText: { fontSize: 13, color: "#333", lineHeight: 18 },
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
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default PhoneScreen;
