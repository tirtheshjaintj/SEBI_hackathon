const emails: Record<Locale, EmailItem[]> = {
  en: [
    {
      id: '1',
      sender: 'Bank Alert',
      subject: 'Urgent: Verify your account immediately!',
      preview: 'Your account will be blocked. Click here to verify now.',
      time: '9:11 AM',
      color: '#ea4335',
      initials: 'B',
      isScam: true
    },
    {
      id: '2',
      sender: 'DigitalOcean',
      subject: 'GradientAI Platform is now GA: B…',
      preview: 'Say hello to GradientAI—DigitalOcean…',
      time: '4:42 AM',
      color: '#34a853',
      initials: 'D',
      isScam: false
    },
    {
      id: '3',
      sender: 'Internshala',
      subject: 'Atlas Guild is hiring React Native Dev…',
      preview: 'Suraj, earn high stipend in your pref…',
      time: 'Jul 9',
      color: '#4285f4',
      initials: 'IS',
      isScam: false
    },
  ],
  hi: [
    {
      id: '1',
      sender: 'बैंक अलर्ट',
      subject: 'जरूरी: तुरंत अपना खाता सत्यापित करें!',
      preview: 'आपका खाता ब्लॉक हो जाएगा। अभी सत्यापित करने के लिए यहाँ क्लिक करें।',
      time: '9:11 AM',
      color: '#ea4335',
      initials: 'ब',
      isScam: true
    },
    {
      id: '2',
      sender: 'डिजिटलओशन',
      subject: 'GradientAI प्लेटफ़ॉर्म अब GA: B…',
      preview: 'GradientAI से मिलें—DigitalOcean…',
      time: '4:42 AM',
      color: '#34a853',
      initials: 'ड',
      isScam: false
    },
    {
      id: '3',
      sender: 'Internshala',
      subject: 'Atlas Guild React Native डेवलपर हायर…',
      preview: 'सुरज, अपनी पसंदीदा फील्ड में उच्च वजीफा…',
      time: 'Jul 9',
      color: '#4285f4',
      initials: 'I',
      isScam: false
    },
  ],
  pa: [
    {
      id: '1',
      sender: 'ਬੈਂਕ ਅਲਰਟ',
      subject: 'ਤੁਰੰਤ ਆਪਣਾ ਖਾਤਾ ਵੈਰੀਫਾਈ ਕਰੋ!',
      preview: 'ਤੁਹਾਡਾ ਖਾਤਾ ਬਲੌਕ ਹੋ ਜਾਵੇਗਾ। ਹੁਣੇ ਵੈਰੀਫਾਈ ਕਰਨ ਲਈ ਇੱਥੇ ਕਲਿੱਕ ਕਰੋ।',
      time: '9:11 AM',
      color: '#ea4335',
      initials: 'ਬ',
      isScam: true
    },
    {
      id: '2',
      sender: 'DigitalOcean',
      subject: 'GradientAI ਪਲੇਟਫਾਰਮ ਹੁਣ GA: B…',
      preview: 'GradientAI ਨਾਲ ਮਿਲੋ—DigitalOcean…',
      time: '4:42 AM',
      color: '#34a853',
      initials: 'D',
      isScam: false
    },
    {
      id: '3',
      sender: 'Internshala',
      subject: 'Atlas Guild React Native ਡਿਵੈਲਪਰ ਦੀ ਭਰਤੀ…',
      preview: 'ਸੁਰਜ, ਆਪਣੀ ਪਸੰਦੀਦਾ ਫੀਲਡ ਵਿੱਚ ਵੱਡੀ ਵਜ਼ੀਫਾ…',
      time: 'Jul 9',
      color: '#4285f4',
      initials: 'I',
      isScam: false
    },
  ],
};


const phishingIntroText: Record<Locale, string> = {
  en: "I will explain how phishing happens. First of all, there will be a mail in your inbox. (follow → click on the first mail)",
  hi: "मैं आपको बताऊँगा कि फ़िशिंग कैसे होती है। सबसे पहले, आपके इनबॉक्स में एक मेल आएगा। (पहले मेल पर क्लिक करें)",
  pa: "ਮੈਂ ਦੱਸਾਂਗਾ ਕਿ ਫਿਸ਼ਿੰਗ ਕਿਵੇਂ ਹੁੰਦੀ ਹੈ। ਸਭ ਤੋਂ ਪਹਿਲਾਂ, ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ ਇੱਕ ਮੇਲ ਆਵੇਗੀ। (ਪਹਿਲੇ ਮੇਲ 'ਤੇ ਕਲਿਕ ਕਰੋ)"
};

import TtsManager from "@/src/services/texttospeech/TtsManager";
import { languageType } from "@/src/types/constants";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Locale = "en" | "hi" | "pa";

type EmailItem = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  color: string;
  initials: string;
  isScam: boolean;
};

interface GmailSimulationProps {
  next: () => void;
  onClose: () => void;
}

const GmailSimulation: React.FC<GmailSimulationProps> = ({ next, onClose }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const locale = i18n.language as languageType;

  useEffect(() => {
    const timer = setTimeout(async () => {
      setShowModal(true);

      // Select voice & langCode based on locale
      let langCode: string;
      let voice: string;

      switch (locale) {
        case "hi":
          langCode = "hi-IN";
          voice = "hi-in-x-hia-network"; // Example Hindi Google voice
          break;
        case "pa":
          langCode = "pa-IN";
          voice = "pa-in-x-pag-local"; // Example Punjabi Google voice
          break;
        case "en":
        default:
          langCode = "en-US";
          voice = "en-us-x-sfg-network"; // Example US English voice
          break;
      }

      // Configure TTS before speaking
      await TtsManager.setVoice(voice);
      await TtsManager.setLanguage(langCode);
      TtsManager.speak(phishingIntroText[locale]);
    }, 0);

    return () => {
      clearTimeout(timer);
      TtsManager.stop();
    };
  }, [locale]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="#000" style={{ marginHorizontal: 10 }} />
        <Text style={styles.searchText}>{t("Search in mail")}</Text>
        <View style={styles.unreadCount}>
          <Text style={styles.unreadText}>17</Text>
        </View>
      </View>

      <Text style={styles.primaryText}>{t("Primary")}</Text>

      {/* Email list */}
      <FlatList
        data={emails[locale]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.emailItem}
            onPress={() => (item.isScam ? next() : null)}
          >
            <View style={[styles.avatar, { backgroundColor: item.color }]}>
              <Text style={styles.avatarText}>{item.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.senderText}>{item.sender}</Text>
              <Text style={styles.subjectText}>{item.subject}</Text>
              <Text style={styles.previewText}>{item.preview}</Text>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modal}>
          <Text style={styles.modalText}>{phishingIntroText[locale]}</Text>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.okText}>{t("OK")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: '100%' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    padding: 8,
    backgroundColor: '#eee',
  },
  searchText: { flex: 1, fontSize: 16, color: '#555' },
  unreadCount: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 10,
  },
  unreadText: { color: '#fff', fontSize: 12 },
  primaryText: { margin: 10, fontSize: 16, color: '#555' },
  emailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 10
  },
  avatarText: { color: '#fff', fontWeight: 'bold' },
  senderText: { fontWeight: 'bold', fontSize: 14, color: '#000' },
  subjectText: { fontSize: 13, color: '#333' },
  previewText: { fontSize: 12, color: '#777' },
  timeText: { fontSize: 12, color: '#333', marginLeft: 4 },
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalText: { color: '#fff', fontSize: 16, marginBottom: 20, textAlign: 'center' },
  okButton: { backgroundColor: '#4CAF50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  okText: { color: '#fff', fontWeight: 'bold' },
});

export default GmailSimulation;
