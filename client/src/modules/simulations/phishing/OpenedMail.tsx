// Change locale here
const scamTexts: Record<Locale, string> = {
  en: "Dear user,\n\nWe've noticed suspicious activity on your account. To secure your account, please verify your identity immediately by clicking the link below.",
  hi: "प्रिय उपयोगकर्ता,\n\nहमने आपके खाते पर संदिग्ध गतिविधि देखी है। कृपया अपने खाते की सुरक्षा के लिए नीचे दिए गए लिंक पर क्लिक करके तुरंत अपनी पहचान सत्यापित करें।",
  pa: "ਪਿਆਰੇ ਯੂਜ਼ਰ,\n\nਅਸੀਂ ਤੁਹਾਡੇ ਖਾਤੇ 'ਤੇ ਸੰਦੇਹਾਸਪਦ ਸਰਗਰਮੀ ਦੇਖੀ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਖਾਤੇ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਹੇਠਾਂ ਦਿੱਤੇ ਲਿੰਕ 'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਤੁਰੰਤ ਆਪਣੀ ਪਹਿਚਾਣ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।"
};

const modalTexts: Record<Locale, string> = {
  en: "And that's how a spam mail looks like, which usually has a link. If you click on that, it can direct you to a malware website. (follow → click on the link)",
  hi: "और इस तरह स्पैम मेल दिखती है, जिसमें आमतौर पर एक लिंक होता है। अगर आप उस पर क्लिक करते हैं, तो यह आपको एक मालवेयर वेबसाइट पर ले जा सकता है। (फॉलो → लिंक पर क्लिक करें)",
  pa: "ਇਸ ਤਰ੍ਹਾਂ ਇੱਕ ਸਪੈਮ ਮੇਲ ਦਿੱਖਦੀ ਹੈ, ਜਿਸ ਵਿੱਚ ਆਮ ਤੌਰ 'ਤੇ ਇੱਕ ਲਿੰਕ ਹੁੰਦਾ ਹੈ। ਜੇ ਤੁਸੀਂ ਉਸ 'ਤੇ ਕਲਿੱਕ ਕਰੋ, ਤਾਂ ਇਹ ਤੁਹਾਨੂੰ ਮਾਲਵੇਅਰ ਵੈੱਬਸਾਈਟ 'ਤੇ ਲੈ ਜਾ ਸਕਦਾ ਹੈ। (ਫਾਲੋ → ਲਿੰਕ 'ਤੇ ਕਲਿੱਕ ਕਰੋ)"
};

import TtsManager from "@/src/services/texttospeech/TtsManager";
import { languageType } from "@/src/types/constants";
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Locale = 'en' | 'hi' | 'pa';

const maliciousLink = "https://bit.ly/verify-account-now";

interface OpenedMailProps {
  next: () => void
}

const voicesConfig: Record<Locale, { lang: string; voice: string }> = {
  hi: { lang: "hi-IN", voice: "hi-in-x-hia-network" },
  pa: { lang: "pa-IN", voice: "pa-in-x-pag-local" },
  en: { lang: "en-US", voice: "en-us-x-sfg-network" }
};

const OpenedScamMail: React.FC<OpenedMailProps> = ({ next }) => {
  const [showModal, setShowModal] = useState(false);

  const { t, i18n } = useTranslation();
  const locale = i18n.language as languageType;

  useEffect(() => {
    const startTTS = async () => {
      setShowModal(true);
      const { lang, voice } = voicesConfig[locale] || voicesConfig.en;

      try {
        await TtsManager.setLanguage(lang);
        await TtsManager.setVoice(voice);
        TtsManager.speak(modalTexts[locale]);
      } catch (err) {
        console.error("TTS Error:", err);
      }
    };

    startTTS();

    return () => {
      TtsManager.stop();
    };
  }, [locale]);

  const closeModal = () => {
    TtsManager.stop();
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#000" style={{ marginHorizontal: 10 }} />
        <Text style={styles.subjectText}>{t("Important: Verify your account")}</Text>
        <Ionicons name="star-outline" size={24} color="#000" style={{ marginHorizontal: 10 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Sender Info */}
        <View style={styles.senderRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{t("B")}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.senderName}>{t("Bank Alert")}</Text>
            <Text style={styles.toText}>{t("to me")}</Text>
          </View>
          <Text style={styles.timeText}>{t("Yesterday")}</Text>
        </View>

        {/* Scam Message */}
        <Text style={styles.bodyText}>{scamTexts[locale]}</Text>

        {/* Malicious Link */}
        <TouchableOpacity onPress={next} style={styles.linkContainer}>
          <Text style={styles.linkText}>{maliciousLink}</Text>
        </TouchableOpacity>

        {/* Fake Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>{t("Reply")}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>{t("Reply all")}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>{t("Forward")}</Text></TouchableOpacity>
        </View>
      </ScrollView>

      {/* Speaking Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modal}>
          <Text style={styles.modalText}>{modalTexts[locale]}</Text>
          <TouchableOpacity style={styles.okButton} onPress={closeModal}>
            <Text style={styles.okText}>{t("OK")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 50, paddingVertical: 8, borderBottomColor: '#ddd', borderBottomWidth: 1, backgroundColor: '#f9f9f9' },
  subjectText: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#000' },
  content: { padding: 16 },
  senderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ea4335', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatarText: { color: '#fff', fontWeight: 'bold' },
  senderName: { fontWeight: 'bold', fontSize: 14 },
  toText: { fontSize: 12, color: '#555' },
  timeText: { fontSize: 12, color: '#555' },
  bodyText: { fontSize: 14, color: '#000', lineHeight: 22, marginVertical: 12 },
  linkContainer: { backgroundColor: '#fbeaea', padding: 8, borderRadius: 6, marginBottom: 16 },
  linkText: { color: '#d93025', fontWeight: 'bold', textDecorationLine: 'underline' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 24 },
  button: { backgroundColor: '#eee', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  buttonText: { color: '#333', fontSize: 14 },
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalText: { color: '#fff', fontSize: 16, marginBottom: 20, textAlign: 'center' },
  okButton: { backgroundColor: '#4CAF50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  okText: { color: '#fff', fontWeight: 'bold' },
});

export default OpenedScamMail;
