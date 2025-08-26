import TtsManager from '@/src/services/texttospeech/TtsManager';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import styles from '../styles';

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

interface ResultModalProps {
    showResult: boolean;
    scanResult: any;
    isSpeaking: boolean;
    setIsSpeaking: (it: boolean) => void;
    setShowResult: (it: boolean) => void;
    handleReset: () => void;
}

export default function ResultModal({
    showResult,
    scanResult,
    isSpeaking,
    setIsSpeaking,
    setShowResult,
    handleReset
}: ResultModalProps) {

    const getLabelColor = (label: string) => {
        switch (label.toLowerCase()) {
            case 'safe': return 'green';
            case 'scam': return 'red';
            default: return '#2ecc71';
        }
    };

    const { t, i18n: { language: locale } } = useTranslation();

    useEffect(() => {
        const handleDone = () => setIsSpeaking(false);
        const handleError = () => setIsSpeaking(false);

        TtsManager.onDone(handleDone);
        TtsManager.onError(handleError);

        return () => {
            TtsManager.removeOnDone(handleDone);
            TtsManager.removeOnError(handleError);
        };
    }, []);

    const handleSpeak = async () => {
        if (isSpeaking) {
            await TtsManager.stop();
            setIsSpeaking(false);
        } else {
            const lang = locale || 'en';
            const voice = voices[lang]?.narrator || voices.en.narrator;
            try {
                await TtsManager.setVoice(voice);
            } catch (err) {
                console.warn('Voice not available:', voice, err);
            }
            await TtsManager.speak(
                `${t(scanResult.label)} ${scanResult.reason}`
            );
            setIsSpeaking(true);
        }
    };

    const handleClose = async () => {
        await TtsManager.stop();
        setIsSpeaking(false);
        setShowResult(false);
        handleReset();
    };

    return (
        <Modal visible={showResult} animationType="slide" transparent>
            <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.resultModal, { backgroundColor: getLabelColor(scanResult.label) }]}>
                            <Text style={[styles.resultLabel, { color: "white" }]}>
                                {t(scanResult.label).toUpperCase()}
                            </Text>
                            <Text style={styles.resultReason}>{scanResult.reason}</Text>
                            <TouchableOpacity
                                style={styles.listenButton}
                                onPress={handleSpeak}
                            >
                                <Text style={styles.buttonText}>
                                    {isSpeaking ? `⏹ ${t("Stop")}` : `🔊 ${t("Listen")}`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
