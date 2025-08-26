// Change locale to see different language

const phishingSpeakText: Record<Locale, string> = {
  en: "Now you will enter your credentials, thinking the website is real, but in reality, your data will be stolen and misused. So always check the URL carefully before entering any details.",
  hi: "अब आप अपनी जानकारी दर्ज करेंगे, यह सोचकर कि वेबसाइट असली है, लेकिन वास्तव में, आपका डेटा चोरी हो जाएगा और गलत इस्तेमाल होगा। इसलिए कोई भी जानकारी दर्ज करने से पहले हमेशा यूआरएल को ध्यान से जांचें। ",
  pa: "ਹੁਣ ਤੁਸੀਂ ਸੋਚ ਕੇ ਆਪਣੀਆਂ ਜਾਣਕਾਰੀਆਂ ਦਾਖਲ ਕਰੋਗੇ ਕਿ ਇਹ ਵੈਬਸਾਈਟ ਅਸਲੀ ਹੈ, ਪਰ ਹਕੀਕਤ ਵਿੱਚ ਤੁਹਾਡਾ ਡਾਟਾ ਚੋਰੀ ਹੋ ਜਾਵੇਗਾ ਅਤੇ ਗਲਤ ਤਰੀਕੇ ਨਾਲ ਵਰਤਿਆ ਜਾਵੇਗਾ। ਇਸ ਲਈ ਕੋਈ ਵੀ ਜਾਣਕਾਰੀ ਦਿੰਦੇ ਸਮੇਂ ਹਮੇਸ਼ਾ URL ਧਿਆਨ ਨਾਲ ਦੇਖੋ। "
};
import TtsManager from "@/src/services/texttospeech/TtsManager";
import { languageType } from "@/src/types/constants";
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Animated, Easing, InteractionManager, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Locale = 'en' | 'hi' | 'pa';

interface WebsiteSimulationProps {
  onClose: () => void;
}


// Voice + language configuration
const voicesConfig: Record<Locale, { lang: string; voice: string }> = {
  hi: { lang: "hi-IN", voice: "hi-in-x-hia-network" },
  pa: { lang: "pa-IN", voice: "pa-in-x-pag-local" },
  en: { lang: "en-US", voice: "en-us-x-sfg-network" }
};

const WebsiteSimulation: React.FC<WebsiteSimulationProps> = ({ onClose }) => {
  const [progress] = useState(new Animated.Value(0));
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { t, i18n } = useTranslation();
  const locale = i18n.language as languageType;

  const maliciousWebsiteUrl = "https://malicious-verify-login.com";
  const stolenText = t("⚠️ Your credentials have been stolen!");

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => setLoaded(true));
  }, []);

  useEffect(() => {
  let openTimer: number;
  let closeTimer: number;
  let cancelled = false;

  openTimer = setTimeout(() => {
    InteractionManager.runAfterInteractions(() => {
      if (cancelled) return; // prevent setState on unmounted
      setShowModal(true);

      const { lang, voice } = voicesConfig[locale] || voicesConfig.en;
      TtsManager.setLanguage(lang)
        .then(() => TtsManager.setVoice(voice))
        .then(() => {
          if (!cancelled) {
            TtsManager.speak(phishingSpeakText[locale]);
          }
        })
        .catch((err) => console.error("TTS error:", err));
    });
  }, 5000);

  closeTimer = setTimeout(() => {
    if (!cancelled) {
      onClose();
    }
  }, 20000);

  return () => {
    cancelled = true;
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    TtsManager.stop();
  };
}, [locale, onClose]);


  
  useEffect(() => {
    return () => {
      TtsManager.stop();
    }
  },[])
  


  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Browser Top Bar */}
      <View style={styles.browserBar}>
        <Ionicons name="arrow-back" onPress={onClose} size={22} color="#333" style={styles.icon} />
        <Ionicons name="arrow-forward" size={22} color="#333" style={styles.icon} />
        <Ionicons name="refresh" size={22} color="#333" style={styles.icon} />
        <View style={styles.urlBox}>
          <Ionicons name="lock-closed-outline" size={16} color="#4CAF50" style={{ marginRight: 4 }} />
          <Text style={styles.urlText} numberOfLines={1}>{maliciousWebsiteUrl}</Text>
        </View>
        <MaterialIcons name="more-vert" size={24} color="#333" style={{ marginLeft: 6 }} />
      </View>

      {/* Progress Bar */}
      {!loaded && <Animated.View style={[styles.progressBar, { width: progressWidth }]} />}

      {/* Fake Website */}
      <View style={styles.webContent}>
        {loaded ? (
          <>
            <Text style={styles.siteLogo}>🔒 {t("Secure Portal")}</Text>
            <Text style={styles.siteSubtitle}>{t("Sign in to verify your account")}</Text>
            <TextInput style={styles.input} placeholder={t("Email or phone")} placeholderTextColor="#aaa" />
            <TextInput style={styles.input} placeholder={t("Password")} placeholderTextColor="#aaa" secureTextEntry />
            <TouchableOpacity onPress={onClose} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t("Continue")}</Text>
            </TouchableOpacity>
            <Text style={styles.noteText}>{t("By continuing, you agree to our terms and conditions.")}</Text>
            <TouchableOpacity>
              <Text style={styles.maliciousLink}>{t("Verify Now")} → http://bit.ly/verify-now</Text>
            </TouchableOpacity>
            <Text style={styles.stolenText}>{stolenText}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>{t("Loading website...")}</Text>
        )}
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Ionicons name="home-outline" size={24} color="#333" style={styles.icon} />
        <Ionicons name="search-outline" size={24} color="#333" style={styles.icon} />
        <Ionicons name="star-outline" size={24} color="#333" style={styles.icon} />
        <Entypo name="dots-three-horizontal" size={20} color="#333" style={styles.icon} />
      </View>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modal}>
          <Text style={styles.modalText}>{phishingSpeakText[locale]}</Text>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => {
              TtsManager.stop();
              setShowModal(false);
            }}
          >
            <Text style={styles.okText}>{t("OK")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', width: '100%' },
  browserBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 40,
  },
  icon: { marginHorizontal: 6 },
  urlBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  urlText: { fontSize: 13, color: '#555', flexShrink: 1 },
  progressBar: { height: 2, backgroundColor: '#4CAF50' },
  webContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  siteLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#222',
  },
  siteSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  loginButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  noteText: { fontSize: 11, color: '#777', marginBottom: 12, textAlign: 'center' },
  maliciousLink: {
    color: '#d32f2f',
    textDecorationLine: 'underline',
    marginBottom: 16,
    fontSize: 13,
  },
  loadingText: { fontSize: 16, color: '#555', marginTop: 50 },
  stolenText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalText: { color: '#fff', fontSize: 16, marginBottom: 20, textAlign: 'center' },
  okButton: { backgroundColor: '#4CAF50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  okText: { color: '#fff', fontWeight: 'bold' },
});

export default WebsiteSimulation;
