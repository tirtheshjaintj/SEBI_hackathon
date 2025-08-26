

import TtsManager from "@/src/services/texttospeech/TtsManager";
import { languageType } from "@/src/types/constants";
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import speech from "./speech";

type DialogueItem = {
  scammer?: string;
  you?: string;
  modalText?: string;
};

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
    scammer: "pa-in-x-pag-local",
    victim: "pa-in-x-pac-network",
    narrator: "pa-in-x-pae-local",
  },
};
export default function ChatSimulation({ onClose , story_num }: { onClose: () => void , story_num: number}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<DialogueItem[]>([]);
  const [isSpeakingLoading, setIsSpeakingLoading] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  console.log({story_num})

  const { t, i18n } = useTranslation();
  const locale: languageType = i18n.language as languageType;

  const dialoguesRef = useRef<DialogueItem[]>(speech[story_num - 1][locale]);
  const dialogues = dialoguesRef.current;

  const getSpeechOptions = (type: 'scammer' | 'victim' | 'narrator', lang: string) => {
    if (type === 'scammer') {
      return { voice: voices[lang]?.scammer || voices['en'].scammer, pitch: 1.0, rate: 1.0 };
    } else if (type === 'victim') {
      return { voice: voices[lang]?.victim || voices['en'].victim, pitch: 1.3, rate: 1.05 };
    } else {
      return { voice: voices[lang]?.narrator || voices['en'].narrator, pitch: 1.0, rate: 0.95 };
    }
  };

  useEffect(() => {
    if (currentIndex >= dialogues.length) {
      setTimeout(onClose, 3000);
      return;
    }

    let cancelled = false;

    async function speakDialogue() {
      const currentDialogue = dialogues[currentIndex];
      if (!currentDialogue) return;

      // Add message to chat
      const newMessage: DialogueItem =
        currentDialogue.scammer
          ? { scammer: currentDialogue.scammer }
          : currentDialogue.you
            ? { you: currentDialogue.you }
            : {};
      if (Object.keys(newMessage).length > 0) {
        setChatMessages((prev) => [...prev, newMessage]);
      }

      setIsSpeakingLoading(true);

      try {
        const type: 'scammer' | 'victim' = currentDialogue.scammer ? 'scammer' : 'victim';
        const opts = getSpeechOptions(type, locale);

        await TtsManager.stop();
        await TtsManager.setLanguage(locale);
        if (opts.voice) await TtsManager.setVoice(opts.voice);
        if (opts.pitch !== undefined) await TtsManager.setPitch(opts.pitch);
        if (opts.rate !== undefined) await TtsManager.setSpeechRate(opts.rate);

        const onStartMain = () => {
          if (cancelled) return;
          setIsSpeakingLoading(false);
        };

        const onDoneMain = async () => {
          if (cancelled) return;

          if (currentDialogue.modalText?.trim()) {
            setChatMessages((prev) => [...prev, { modalText: currentDialogue.modalText }]);
            setShowModal(true);

            TtsManager.removeOnStart(onStartMain);
            TtsManager.removeOnDone(onDoneMain);
            TtsManager.removeOnError(onErrorMain);

            const onStartModal = () => {
              if (cancelled) return;
              setIsSpeakingLoading(false);
            };
            const onDoneModal = () => {
              if (cancelled) return;
              setShowModal(false);
              setCurrentIndex((d) => d + 1);
              TtsManager.removeOnStart(onStartModal);
              TtsManager.removeOnDone(onDoneModal);
              TtsManager.removeOnError(onErrorModal);
            };
            const onErrorModal = () => {
              if (cancelled) return;
              setIsSpeakingLoading(false);
              setShowModal(false);
              setCurrentIndex((d) => d + 1);
              TtsManager.removeOnStart(onStartModal);
              TtsManager.removeOnDone(onDoneModal);
              TtsManager.removeOnError(onErrorModal);
            };

            await TtsManager.setVoice(
              voices[locale]?.narrator || voices['en'].narrator
            );
            await TtsManager.setPitch(1.0);
            await TtsManager.setSpeechRate(0.95);

            TtsManager.onStart(onStartModal);
            TtsManager.onDone(onDoneModal);
            TtsManager.onError(onErrorModal);

            await TtsManager.speak(currentDialogue.modalText);
          } else {
            setTimeout(() => {
              if (!cancelled) setCurrentIndex((d) => d + 1);
            }, 1000);
          }
        };

        const onErrorMain = () => {
          if (cancelled) return;
          setIsSpeakingLoading(false);
          setTimeout(() => {
            if (!cancelled) setCurrentIndex((d) => d + 1);
          }, 1000);
        };

        TtsManager.onStart(onStartMain);
        TtsManager.onDone(onDoneMain);
        TtsManager.onError(onErrorMain);

        await TtsManager.speak(currentDialogue.scammer || currentDialogue.you || '');
      } catch (e) {
        console.error('Error in speakDialogue:', e);
        setIsSpeakingLoading(false);
        setTimeout(() => {
          if (!cancelled) setCurrentIndex((d) => d + 1);
        }, 1000);
      }
    }

    const timer = setTimeout(speakDialogue, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      TtsManager.stop();
    };
  }, [currentIndex, locale]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [chatMessages]);

  const renderItem = ({ item }: { item: DialogueItem }) => {
    if (item.scammer) {
      return (
        <View style={[styles.messageRow, { justifyContent: 'flex-start' }]}>
          <View style={[styles.bubble, styles.scammerBubble]}>
            <Text style={styles.messageText}>{item.scammer}</Text>
          </View>
        </View>
      );
    } else if (item.you) {
      return (
        <View style={[styles.messageRow, { justifyContent: 'flex-end' }]}>
          <View style={[styles.bubble, styles.youBubble]}>
            <Text style={[styles.messageText, { color: '#fff' }]}>{item.you}</Text>
          </View>
        </View>
      );
    } else if (item.modalText) {
      return (
        <View style={[styles.messageRow, { justifyContent: 'center' }]}>
          <View style={[styles.bubble, styles.narratorBubble]}>
            <Text style={styles.messageText}>{item.modalText}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { TtsManager.stop(); onClose(); }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("Scammer")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        ref={flatListRef}
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />

      {!isSpeakingLoading && (
        <View style={[styles.messageRow, { justifyContent: 'center' }]}>
          <View style={styles.typingBubble}>
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
          </View>
        </View>
      )}
      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={t("Type a message...")}
          placeholderTextColor="#999"
          style={styles.textInput}
        />
        <TouchableOpacity>
          <Ionicons name="send" size={24} color="#3797ef" />
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>⚠ {t("Alert")}</Text>
            <Text style={styles.modalText}>{dialogues[currentIndex]?.modalText}</Text>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => {
                setShowModal(false);
                setCurrentIndex((d) => d + 1);
              }}
            >
              <Text style={styles.continueText}>{t("Continue")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fafafa', width: "100%", paddingTop: 30 },
  header: {
    height: 50, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  headerTitle: { flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 18 },
  listContent: { paddingHorizontal: 12, paddingVertical: 8, flexGrow: 1, justifyContent: 'flex-end' },
  messageRow: { flexDirection: 'row', marginVertical: 4 },
  bubble: {
    maxWidth: '75%', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2, elevation: 1,
  },
  scammerBubble: { backgroundColor: '#f0f2f5' },
  youBubble: { backgroundColor: '#3797ef' },
  narratorBubble: {
    backgroundColor: '#fff8e1',
    borderWidth: 1,
    borderColor: '#ffd54f',
    alignSelf: 'center'
  },
  messageText: { fontSize: 16 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', padding: 8, paddingHorizontal: 12,
    borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff',
  },
  textInput: {
    flex: 1, height: 40, backgroundColor: '#f0f2f5', borderRadius: 20,
    paddingHorizontal: 14, fontSize: 16, marginRight: 8,
    color: "#999",
  },
  modalBackdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalBox: {
    width: '80%', backgroundColor: '#fff', borderRadius: 16,
    padding: 24, alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 16 },
  continueBtn: {
    backgroundColor: '#3797ef', paddingVertical: 10,
    paddingHorizontal: 24, borderRadius: 8,
  },
  continueText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  typingBubble: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',   // light gray, looks neutral
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#757575',
    marginHorizontal: 2,
    opacity: 0.6,
  },

});