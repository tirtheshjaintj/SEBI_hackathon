import TtsManager from '@/src/services/texttospeech/TtsManager';
import { languageType } from '@/src/types/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dialoguesByStories from './dialogues';

interface dialogueType {
  speaker: string;
  text: string;
  modalText: string;
}

const voices: Record<
  string,
  { scammer: string; victim: string; narrator: string }
> = {
  en: {
    scammer: 'en-in-x-ene-network',
    victim: 'en-in-x-ena-local',
    narrator: 'en-in-x-enc-local',
  },
  hi: {
    scammer: 'hi-in-x-hid-network',
    victim: 'hi-in-x-hia-local',
    narrator: 'hi-in-x-hic-local',
  },
  pa: {
    scammer: "pa-in-x-pag-network",
    victim: "pa-in-x-pae-local",
    narrator: "pa-in-x-pag-local",
  },
};

interface CallOngoingScreenProps {
  onClose: () => void;
  storyNumber: number;
}

export async function isLanguageSupported(langCode: string): Promise<boolean> {
  try {
    const voicesAvailable = await TtsManager.getAvailableVoices();
    // Defensive check for null voices or missing language property
    return voicesAvailable.some(
      //@ts-ignore
      (v) => v?.language && v.language.startsWith(langCode)
    );
  } catch (e) {
    console.error('Failed to fetch TTS voices:', e);
    return false;
  }
}

const CallOngoingScreen: React.FC<CallOngoingScreenProps> = ({ onClose , storyNumber }) => {
  const { t, i18n } = useTranslation();
  const localeObj = i18n.language as languageType;
  const locale: languageType = localeObj;

  const dialoguesRef = useRef<dialogueType[]>(
    dialoguesByStories[
    Math.floor(storyNumber-1)
    ][locale] || []
  );
  const dialogues = dialoguesRef.current;

  const [callTime, setCallTime] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isSpeakingLoading, setIsSpeakingLoading] = useState(true);
  const [loadingDots, setLoadingDots] = useState('.');

  // Increment call timer
  useEffect(() => {
    const interval = setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const getSpeechOptions = (speaker: string, lang: string) => {
    if (speaker === 'Victim') {
      return {
        voice: voices[lang]?.victim || voices['en'].victim,
        pitch: 1.3,
        rate: 1.05,
      };
    } else if (speaker === 'Scammer') {
      return {
        voice: voices[lang]?.scammer || voices['en'].scammer,
        pitch: 1.0,
        rate: 1.0,
      };
    } else {
      return {
        voice: voices[lang]?.narrator || voices['en'].narrator,
        pitch: 1.0,
        rate: 0.95,
      };
    }
  };

  // Main effect: speak current dialogue
  useEffect(() => {
    if (currentDialogue >= dialogues.length) {
      const timeout = setTimeout(() => onClose(), 2000);
      return () => clearTimeout(timeout);
    }

    let cancelled = false;

    async function speakDialogue() {
      setIsSpeakingLoading(true);
      try {
        const { speaker, text, modalText } = dialogues[currentDialogue];
        const options = getSpeechOptions(speaker, locale);

        await TtsManager.stop(); // stop any ongoing speech before starting new
        await TtsManager.setLanguage(locale);
        if (options.voice) await TtsManager.setVoice(options.voice);
        if (options.pitch !== undefined) await TtsManager.setPitch(options.pitch);
        if (options.rate !== undefined) await TtsManager.setSpeechRate(options.rate);

        const onStartMain = () => {
          if (cancelled) return;
          setIsSpeakingLoading(false);
        };

        const onDoneMain = async () => {
          if (cancelled) return;

          if (modalText?.trim()) {
            setModalContent(modalText);
            setShowModal(true);

            // Remove main handlers before speaking modal text
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
              setModalContent('');
              setCurrentDialogue((d) => d + 1);
              TtsManager.removeOnStart(onStartModal);
              TtsManager.removeOnDone(onDoneModal);
              TtsManager.removeOnError(onErrorModal);
            };
            const onErrorModal = () => {
              if (cancelled) return;
              setIsSpeakingLoading(false);
              setShowModal(false);
              setModalContent('');
              setCurrentDialogue((d) => d + 1);
              TtsManager.removeOnStart(onStartModal);
              TtsManager.removeOnDone(onDoneModal);
              TtsManager.removeOnError(onErrorModal);
            };

            try {
              await TtsManager.setVoice(
                voices[locale]?.narrator || voices['en'].narrator
              );
              await TtsManager.setPitch(1.0);
              await TtsManager.setSpeechRate(0.95);

              TtsManager.onStart(onStartModal);
              TtsManager.onDone(onDoneModal);
              TtsManager.onError(onErrorModal);

              await TtsManager.speak(modalText);
            } catch (e) {
              console.error('Error speaking modal text:', e);
              if (!cancelled) setCurrentDialogue((d) => d + 1);
            }
          } else {
            setTimeout(() => {
              if (!cancelled) setCurrentDialogue((d) => d + 1);
            }, 1000);
          }
        };

        const onErrorMain = () => {
          if (cancelled) return;
          setIsSpeakingLoading(false);
          setTimeout(() => {
            if (!cancelled) setCurrentDialogue((d) => d + 1);
          }, 1000);
        };

        TtsManager.onStart(onStartMain);
        TtsManager.onDone(onDoneMain);
        TtsManager.onError(onErrorMain);

        await TtsManager.speak(text);

      } catch (e) {
        console.error('Error in speakDialogue:', e);
        setIsSpeakingLoading(false);
        setTimeout(() => {
          if (!cancelled) setCurrentDialogue((d) => d + 1);
        }, 1000);
      }
    }

    speakDialogue();

    return () => {
      cancelled = true;
      TtsManager.stop();
    };
  }, [currentDialogue, dialogues, locale, onClose]);

  // Loading dots animation
  useEffect(() => {
    if (!isSpeakingLoading) return;
    const interval = setInterval(() => {
      setLoadingDots((dots) => (dots === '...' ? '.' : dots + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, [isSpeakingLoading]);

  // Stop TTS on component unmount
  useEffect(() => {
    return () => {
      TtsManager.stop();
    };
  }, []);

  const handleContinue = () => {
    setShowModal(false);
    setModalContent('');
    setCurrentDialogue((d) => d + 1);
  };

  const handleHangUp = () => {
    TtsManager.stop();
    onClose();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Defensive fallback in case dialogues array is empty or out of range
  const currentDialogueObj = dialogues[currentDialogue] || null;

  const options = [
    { label: t('Mute'), icon: 'mic-off' as const },
    { label: t('Keypad'), icon: 'keypad' as const },
    { label: t('Speaker'), icon: 'volume-high' as const },
    { label: t('Add Call'), icon: 'person-add' as const },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.avatarsContainer}>
          <View style={styles.avatarBlock}>
            <Image
              source={{
                uri:
                  'https://imgs.search.brave.com/jatQSzhi8N_NLLXpFzlOF6LM-sADAUy1VmVaAyA7Tnc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3IvaGFja2Vy/LWN5YmVyLWNyaW1p/bmFsLWxhcHRvcC1z/dGVhbGluZy0yNjBu/dy0yMTUzNTMyMDY3/LmpwZw',
              }}
              style={styles.avatar}
            />
            <Text style={styles.avatarLabel}>{t('Scammer')}</Text>
          </View>
          <View style={styles.avatarBlock}>
            <Image
              source={{
                uri:
                  'https://imgs.search.brave.com/ixVLK84hg8O43WKE4tsuy_KtyUGqA9IKw3eX3T7VUEQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9wZW9wbGVz/LWF2YXRhcnMvd29t/YW4tdXNlci1jaXJj/bGUtaWNvbi5zdmc',
              }}
              style={styles.avatar}
            />
            <Text style={styles.avatarLabel}>{t('You')}</Text>
          </View>
        </View>
        <Text style={styles.timer}>{formatTime(callTime)}</Text>
        {currentDialogueObj && (
          <View style={styles.dialogueBox}>
            {isSpeakingLoading ? (
              <Text style={styles.loadingText}>
                {t('Thinking')}
                {loadingDots}
              </Text>
            ) : (
              <>
                <Text style={styles.speakerText}>{t(currentDialogueObj.speaker)}:</Text>
                <Text style={styles.dialogueText}>{t(currentDialogueObj.text)}</Text>
              </>
            )}
          </View>
        )}
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.optionsContainer}>
          {options.map(({ label, icon }) => (
            <View style={styles.optionContainer} key={label}>
              <TouchableOpacity style={styles.optionButton}>
                <Ionicons name={icon} size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.optionText}>{label}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.hangUpButton} onPress={handleHangUp}>
          <Text style={styles.hangUpText}>{t('Hang Up')}</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleContinue}>
              <Text style={styles.modalButtonText}>{t('Continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CallOngoingScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 70,
    backgroundColor: 'black',
    width: '100%'
  },
  timer: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    marginVertical: 10,
  },
  avatarsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginVertical: 20,
  },
  upperContainer: {
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  avatarBlock: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  avatarLabel: {
    color: "#fff",
    fontSize: 16,
  },
  dialogueBox: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    maxWidth: "90%",
  },
  speakerText: {
    color: "#ccc",
    fontWeight: "700",
    marginBottom: 4,
  },
  dialogueText: {
    color: "#fff",
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginVertical: 20,
    maxWidth: 400,
  },
  optionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
  },
  hangUpButton: {
    backgroundColor: "#E53935",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 20,
  },
  hangUpText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  lowerContainer: {
    alignItems: "center",
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 12,
    // maxWidth: '80%',
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingText: {
    color: "#ccc",
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },

});