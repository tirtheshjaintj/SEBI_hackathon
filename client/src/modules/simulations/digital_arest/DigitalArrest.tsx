import ModalWrapper from "@/src/components/modal/ModalWrapper";
import TtsManager from "@/src/services/texttospeech/TtsManager";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AllLanguageDialogues from "./speech";
import styles from "./styles";

const voices: Record<string, { scammer: string; victim: string; narrator: string }> = {
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

const StaticArrestCallScreen = ({ closeModal }: { closeModal: () => void }) => {
  const [callTime, setCallTime] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [active, setActive] = useState<"scammer" | "victim">("victim");
  const { t, i18n } = useTranslation();

  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSpeakingLoading, setIsSpeakingLoading] = useState(false);

  const locale = i18n.language as string;
  const supportedLocales = ["en", "hi", "pa"] as const;
  type SupportedLocale = typeof supportedLocales[number];

  const isSupportedLocale = (loc: string): loc is SupportedLocale => {
    return supportedLocales.includes(loc as SupportedLocale);
  };

  const dialogues = isSupportedLocale(locale)
    ? AllLanguageDialogues[locale]
    : AllLanguageDialogues["en"];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (currentDialogue >= dialogues.length) {
      closeModal();
      return;
    }

    const { speaker, text, modalText } = dialogues[currentDialogue];

    if (speaker === "Scammer") setActive("scammer");
    else if (speaker === "Victim") setActive("victim");

    const playDialogue = async () => {
      setIsSpeakingLoading(true);

      try {
        const voiceId = voices[locale]?.[speaker.toLowerCase() as "scammer" | "victim" | "narrator"];

        await TtsManager.stop();
        await TtsManager.setLanguage(locale);
        if (voiceId) await TtsManager.setVoice(voiceId);
        await TtsManager.setPitch(speaker === "Victim" ? 1.2 : speaker === "Scammer" ? 0.8 : 1.0);
        await TtsManager.setSpeechRate(speaker === "Scammer" ? 1.2 : 1.0);

        const onStartMain = () => {
          if (cancelled) return;
          setIsSpeakingLoading(false);
        };

        const onDoneMain = async () => {
          if (cancelled) return;

          if (modalText && modalText.trim()) {
            setModalContent(modalText);
            setShowModal(true);

            // Remove main listeners
            TtsManager.removeOnStart(onStartMain);
            TtsManager.removeOnDone(onDoneMain);
            TtsManager.removeOnError(onErrorMain);

            // Play modal narrator
            await TtsManager.setVoice(voices[locale]?.narrator || voices.en.narrator);
            await TtsManager.setPitch(1.0);
            await TtsManager.setSpeechRate(0.95);

            const onStartModal = () => {
              if (cancelled) return;
              setIsSpeakingLoading(false);
            };
            const onDoneModal = () => {
              if (cancelled) return;
              setShowModal(false);
              setCurrentDialogue((prev) => prev + 1);
              TtsManager.removeOnStart(onStartModal);
              TtsManager.removeOnDone(onDoneModal);
              TtsManager.removeOnError(onErrorModal);
            };
            const onErrorModal = () => {
              if (cancelled) return;
              setShowModal(false);
              setCurrentDialogue((prev) => prev + 1);
              TtsManager.removeOnStart(onStartModal);
              TtsManager.removeOnDone(onDoneModal);
              TtsManager.removeOnError(onErrorModal);
            };

            TtsManager.onStart(onStartModal);
            TtsManager.onDone(onDoneModal);
            TtsManager.onError(onErrorModal);

            await TtsManager.speak(modalText);
          } else {
            setTimeout(() => setCurrentDialogue((prev) => prev + 1), 1000);
          }
        };

        const onErrorMain = () => {
          if (cancelled) return;
          setIsSpeakingLoading(false);
          setTimeout(() => setCurrentDialogue((prev) => prev + 1), 1000);
        };

        TtsManager.onStart(onStartMain);
        TtsManager.onDone(onDoneMain);
        TtsManager.onError(onErrorMain);

        await TtsManager.speak(text);
      } catch (err) {
        console.error("TTS Error:", err);
        setIsSpeakingLoading(false);
        setTimeout(() => setCurrentDialogue((prev) => prev + 1), 1000);
      }
    };

    playDialogue();

    return () => {
      cancelled = true;
      TtsManager.stop();
    };
  }, [currentDialogue, locale]);

  return (
    <View style={styles.container}>
      {/* Scammer Box */}
      <View style={[styles.avatarBox, active === "scammer" ? styles.activeBox : { borderColor: "white" }]}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://thumbs.dreamstime.com/b/indian-police-officer-front-view-vector-illustration-design-218774757.jpg?w=768" }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          {active === "scammer" && (
            <View style={styles.dialogueBox}>
              <Text style={styles.speakerText}>{t("Scammer")}:</Text>
              <Text style={styles.dialogueText}>
                {isSpeakingLoading ? t("Thinking") + "..." : dialogues[currentDialogue]?.text}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.avatarLabel}>{t("Scammer")}</Text>
      </View>

      {/* Victim Box */}
      <View style={[styles.avatarBox, active === "victim" ? styles.activeBox : { borderColor: "white" }]}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://imgs.search.brave.com/jcL9oTTmjKQ4so41TdkYu7A-m1AtxPJ8iBzwLQ_Xy2k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDYv/OTI5LzUxOC9zbWFs/bC9hYnN0cmFjdC1m/YWNlbGVzcy15b3Vu/Zy13b21hbi13aXRo/LWJhbmdzLWhhaXJz/dHlsZS1hYnN0cmFj/dC1hdmF0YXItaWxs/dXN0cmF0aW9uLWZy/ZWUtdmVjdG9yLmpw/Zw",
            }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          {active === "victim" && (
            <View style={styles.dialogueBox}>
              <Text style={styles.speakerText}>You:</Text>
              <Text style={styles.dialogueText}>
                {isSpeakingLoading ? t("Thinking") + "..." : dialogues[currentDialogue]?.text}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.avatarLabel}>{t("You")}</Text>
      </View>

      {/* Timer */}
      <Text style={styles.timer}>{formatTime(callTime)}</Text>

      {/* Call Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={() => setMicOn(!micOn)}>
          <Ionicons name={micOn ? "mic" : "mic-off"} size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.endCall]} onPress={() => closeModal()}>
          <Ionicons name="call" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => setCamOn(!camOn)}>
          <Ionicons name={camOn ? "videocam" : "videocam-off"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <ModalWrapper visible={showModal} onClose={() => setShowModal(false)}>
        <View style={{ padding: 20, borderRadius: 12, backgroundColor: "#222", maxWidth: "90%", alignSelf: "center" }}>
          <Text style={{ fontSize: 16, color: "#fff", textAlign: "center" }}>{modalContent}</Text>
        </View>
      </ModalWrapper>
    </View>
  );
};

export default StaticArrestCallScreen;
