import axiosInstance from "@/src/apis/axiosInstance";
import Colors from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface FeedbackModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function FeedbackModal({ visible, onClose }: FeedbackModalProps) {
    const { t } = useTranslation();
    const [stars, setStars] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

    const handleSubmit = async () => {
        if (stars < 1 || feedback.trim().length === 0) {
            setMessage({ type: "error", text: "Please provide a rating and feedback." });
            return;
        }

        try {
            setLoading(true);
            await axiosInstance.post("https://dhan-rakshak-feedback.vercel.app/feedback", {
                rating: stars,
                feedback,
            });
            setMessage({ type: "success", text: "Thank you for your feedback!" });
            setStars(0);
            setFeedback("");

            // auto close after success
            setTimeout(() => {
                setMessage(null);
                onClose();
            }, 2000);
        } catch (err) {
            console.log(JSON.stringify(err));
            setMessage({ type: "error", text: "Something went wrong. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={36}
                            color={Colors.primaryCyanColor}
                        />
                    </View>
                    <Text style={styles.title}>{t("Feedback")}</Text>
                    <Text style={styles.message}>
                        {t("We value your feedback! Please rate your experience and leave a comment.")}
                    </Text>

                    {/* ⭐ Star Input */}
                    <View style={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setStars(star)}>
                                <Ionicons
                                    name={star <= stars ? "star" : "star-outline"}
                                    size={32}
                                    color={Colors.primaryCyanColor}
                                    style={styles.star}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* ✍️ Feedback Input */}
                    <TextInput
                        style={styles.input}
                        placeholder={t("Write your feedback...")}
                        placeholderTextColor="#aaa"
                        value={feedback}
                        onChangeText={setFeedback}
                        multiline
                    />

                    {/* ✅ Message Display */}
                    {message && (
                        <Text
                            style={[
                                styles.messageText,
                                message.type === "error" ? styles.errorText : styles.successText,
                            ]}
                        >
                            {message.text}
                        </Text>
                    )}

                    {/* Actions */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.btn, styles.reject]}
                            onPress={onClose}
                            disabled={loading}
                        >
                            <Text style={styles.btnText}>{t("Cancel")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.btn,
                                styles.accept,
                                (loading || stars < 1 || !feedback.trim()) && { opacity: 0.6 },
                            ]}
                            onPress={handleSubmit}
                            disabled={loading || stars < 1 || !feedback.trim()}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.btnText}>{t("Submit")}</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        width: "100%",
        maxWidth: 360,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    iconCircle: {
        backgroundColor: Colors.primaryCyanColor + "20",
        padding: 12,
        borderRadius: 40,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
        marginBottom: 8,
        textAlign: "center",
    },
    message: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: Colors.textSecondaryDark,
        textAlign: "center",
        marginBottom: 16,
    },
    starsRow: {
        flexDirection: "row",
        marginBottom: 16,
    },
    star: {
        marginHorizontal: 4,
    },
    input: {
        width: "100%",
        minHeight: 80,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        marginBottom: 12,
        textAlignVertical: "top",
    },
    messageText: {
        marginBottom: 12,
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        textAlign: "center",
    },
    errorText: {
        color: "#F44336",
    },
    successText: {
        color: "#4CAF50",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    btn: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 6,
        borderRadius: 10,
        alignItems: "center",
    },
    accept: {
        backgroundColor: "#4CAF50",
    },
    reject: {
        backgroundColor: "#F44336",
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Poppins-Medium",
    },
});
