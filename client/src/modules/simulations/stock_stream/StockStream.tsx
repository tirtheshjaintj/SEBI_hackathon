import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import TtsManager from "@/src/services/texttospeech/TtsManager";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import styles from "./styles";
import dialogues from "./speech";

const voices = {
  en: {
    streamer: "en-in-x-ene-network",
    narrator: "en-in-x-enc-local",
  },
  hi: {
    streamer: "hi-in-x-hid-network",
    narrator: "hi-in-x-hic-local",
  },
  pa: {
    streamer: "pa-in-x-pag-network",
    narrator: "pa-in-x-pag-local",
  },
};

const StreamStockScreen = ({ closeModal }: { closeModal: () => void }) => {
  const { i18n } = useTranslation();
  const locale = i18n.language as "en" | "hi" | "pa";

  const [stockData, setStockData] = useState<number[]>([100]);
  const [timeLabels, setTimeLabels] = useState<string[]>(["0s"]);
  const [seconds, setSeconds] = useState(0);

  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);


  // fake timer labels
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if(seconds%10 === 0)
        setTimeLabels((prev) => [...prev, `${seconds + 1}s`]);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  // dialogue playback
  useEffect(() => {
    let cancelled = false;
    if (currentDialogue >= dialogues[locale].length){
        cancelled = true;
        closeModal();
        return
    };

    const { speaker, text, modalText, chartDelta } = dialogues[locale][currentDialogue];

    if (chartDelta !== undefined) {
      setStockData((prev) => {
        const next = Math.max(10, prev[prev.length - 1] + chartDelta);
        return [...prev, next];
      });
    }

    const playDialogue = async () => {
      try {
        await TtsManager.stop();
        await TtsManager.setLanguage(locale);
        const voiceId = voices[locale]?.[speaker.toLowerCase() as "streamer" | "narrator"];
        if (voiceId) await TtsManager.setVoice(voiceId);

        if (speaker === "Streamer") {
          await TtsManager.setPitch(1.0);
          await TtsManager.setSpeechRate(1.1);
        } else {
          await TtsManager.setPitch(1.0);
          await TtsManager.setSpeechRate(0.95);
        }

        const onDone = () => {
          if (cancelled) return;
        if (modalText) {
            setModalContent('');
            setShowModal(false);
          }
          
          setTimeout(() => setCurrentDialogue((prev) => prev + 1), 1000);
          TtsManager.removeOnDone(onDone);
        }

        TtsManager.onDone(onDone);

        if (modalText) {
            setModalContent(modalText);
            setShowModal(true);
          }

        if (text) await TtsManager.speak(text);
        else if (modalText) await TtsManager.speak(modalText);

        
      } catch (e) {
        console.error("TTS error:", e);
        setTimeout(() => setCurrentDialogue((prev) => prev + 1), 1000);
      }
    };

    playDialogue();

    return () => {
      cancelled = true;
      TtsManager.stop();
    };
  }, [currentDialogue]);

  return (
    <View style={styles.container}>
      {/* Stock Chart */}
      <LineChart
        data={{
          labels: timeLabels,
          datasets: [{ data: stockData }],
        }}
        width={Dimensions.get("window").width - 30}
        height={250}
        chartConfig={{
          backgroundColor: "#1E1E1E",
          backgroundGradientFrom: "#1E1E1E",
          backgroundGradientTo: "#2C2C2C",
          decimalPlaces: 0,
          color: () => "#4CAF50",
          labelColor: () => "#9e9e9e",
          propsForBackgroundLines: {
            strokeDasharray: "", // solid grid lines
            stroke: "#444",
          },
          propsForLabels: {
            fontSize: 10,
          },
        }}
        bezier
        withInnerLines
        withVerticalLabels
        withHorizontalLabels
        style={{ borderRadius: 24, marginVertical: 16, alignSelf: "center", borderColor: "grey", borderWidth: 1 }}
      />

      {/* Streamer bubble */}
      {
        dialogues[locale][currentDialogue]?.speaker === "Streamer" && (
            
      <View style={styles.dialogueBox}>
        <Text style={styles.speakerText}>{dialogues[locale][currentDialogue]?.speaker}</Text>
        <Text style={styles.dialogueText}>{dialogues[locale][currentDialogue]?.text || dialogues[locale][currentDialogue]?.modalText  ||  "..."}</Text>
      </View>
        )
      }
    <View style={{ width: "100%", alignItems: "center" }}>
    <Image
        source={{
        uri: "https://imgs.search.brave.com/PYdAZkvHIfFte1QkzTH7RzI28abCdg8wBJSOBbbKuRo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/OTg3NDQ3NS9waG90/by9zdHJlYW1lci1n/YW1lci1wbGF5aW5n/LWF0LXN0cmF0ZWd5/LWdhbWUtaW4tYnJv/YWRjYXN0LWJyb3dz/ZXIteW91bmctbWFu/LWhhdmluZy1mdW4t/Z2FtaW5nLWFuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZVdWbFhmamVTRlJm/cmxKMm1sWjlSU3gz/eDB4MXRaSGVGa3ZW/dUJYS1daaz0",
        }}
        style={[
        styles.streamerAvatar,
        dialogues[locale][currentDialogue]?.speaker === "Streamer" && styles.activeStreamer,
        ]}
    />
    </View>

      {/* Bottom section with streamer */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.controlButton, styles.endCall]} onPress={() => closeModal()}>
          <Ionicons name="call" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Narration modal */}
      <ModalWrapper visible={showModal} onClose={() => setShowModal(false)}>
        <View style={{ padding: 20, borderRadius: 12, backgroundColor: "#222" }}>
          <Text style={{ fontSize: 16, color: "#fff", textAlign: "center" }}>{modalContent}</Text>
        </View>
      </ModalWrapper>
    </View>
  );
};

export default StreamStockScreen;
