import TtsManager from '@/src/services/texttospeech/TtsManager';
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export function useTTSInitializer(ready: boolean, delayDone: boolean) {
    const [voiceId, setVoiceId] = useState<string | null>(null);
    const [ttsReady, setTtsReady] = useState(false);
    const isInitializing = useRef(false);
    const lastInitTime = useRef(0);

    // Try to init and warm up TTS
    const tryInit = async (attempt = 1): Promise<boolean> => {
        try {
            await TtsManager.stop(); // stop any ongoing speech

            const voices = await TtsManager.getAvailableVoices();
            if (!voices?.length) throw new Error("No voices found");

            // Pick random voice (you can customize your selection logic)
            const chosenVoice = voices[Math.floor(Math.random() * voices.length)]?.name || null;

            if (chosenVoice) {
                await TtsManager.setVoice(chosenVoice);
            }

            setVoiceId(chosenVoice);

            // Small delay before speaking
            await new Promise((resolve) => setTimeout(resolve, 150));

            // Speak empty or silent text to warm-up TTS engine
            // Since native TtsManager.speak may not support volume=0, just speak very short text
            // TtsManager.setLanguage("en-US");
            // TtsManager.setVoice("en-us-x-sfg-networ");
            // await TtsManager.speak(".");

            return true;
        } catch (err) {
            console.warn(`TTS init attempt ${attempt} failed:`, err);
            return false;
        }
    };

    const initTTSWithRetry = async () => {
        const now = Date.now();
        if (isInitializing.current || now - lastInitTime.current < 1500) return;
        isInitializing.current = true;
        lastInitTime.current = now;

        let success = false;
        for (let i = 1; i <= 10; i++) {
            if (i > 1) await new Promise((r) => setTimeout(r, i * 400));
            success = await tryInit(i);
            if (success) break;
        }

        if (success) {
            setTtsReady(true);
            // Toast.show({
            //     text1: "TTS Warmed Up ✅",
            //     text2: voiceId || "Default voice",
            //     type: "success",
            //     visibilityTime: 1500,
            // });
        } else {
            setTtsReady(false);
            // Toast.show({
            //     text1: "TTS init failed ❌",
            //     text2:
            //         Platform.OS === "android"
            //             ? "Check device TTS settings or install Google TTS"
            //             : "Check Siri/VoiceOver settings",
            //     type: "error",
            //     visibilityTime: 2500,
            // });
        }

        isInitializing.current = false;
    };

    useEffect(() => {
        if (!ready || !delayDone) return;

        initTTSWithRetry();

        const sub = AppState.addEventListener("change", (state) => {
            if (state === "inactive" || state === "background") {
                TtsManager.stop();
            }
            if (state === "active") {
                setTimeout(initTTSWithRetry, 1200); // longer delay for stability
            }
        });

        return () => {
            sub.remove();
            TtsManager.stop();
        };
    }, [ready, delayDone]);

    return { voiceId, ttsReady };
}
