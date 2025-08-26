import Colors from "@/src/theme/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

interface ReportModalProps {
    isReportModalVisible: boolean;
    isReporting: boolean;
    reportSuccess: boolean;
    selectedNumber: string;
    reportMessage: string;
    setReportMessage: (msg: string) => void;
    setIsReportModalVisible: (visible: boolean) => void;
    handleReport: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
    isReportModalVisible,
    isReporting,
    reportSuccess,
    selectedNumber,
    reportMessage,
    setReportMessage,
    setIsReportModalVisible,
    handleReport,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            transparent
            visible={isReportModalVisible}
            animationType="fade"
            onRequestClose={() => !isReporting && setIsReportModalVisible(false)}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                }}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 16,
                        padding: 20,
                        width: "100%",
                        maxWidth: 400,
                        position: "relative",
                    }}
                >
                    {/* Close button */}
                    {!isReporting && (
                        <TouchableOpacity
                            onPress={() => setIsReportModalVisible(false)}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                padding: 6,
                            }}
                        >
                            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#999" }}>
                                ×
                            </Text>
                        </TouchableOpacity>
                    )}

                    {isReporting ? (
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>
                                {t("Sending report...")}
                            </Text>
                        </View>
                    ) : reportSuccess ? (
                        <View style={{ alignItems: "center" }}>
                            <Text
                                style={{ fontSize: 16, fontWeight: "500", color: "#2ecc71" }}
                            >
                                {t("Report sent successfully!")}
                            </Text>
                        </View>
                    ) : (
                        <>
                            <Text
                                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
                            >
                                {t("Report Number")}
                            </Text>
                            <Text style={{ marginBottom: 10, fontSize: 14 }}>
                                {selectedNumber}
                            </Text>

                            <TextInput
                                style={{
                                    borderColor: "#ccc",
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    padding: 10,
                                    minHeight: 80,
                                    textAlignVertical: "top",
                                }}
                                placeholderTextColor="#999"
                                placeholder={t("Enter your message (optional)")}
                                value={reportMessage}
                                onChangeText={setReportMessage}
                                multiline
                            />

                            <TouchableOpacity
                                onPress={handleReport}
                                style={{
                                    marginTop: 15,
                                    backgroundColor: Colors.primaryCyanColor,
                                    paddingVertical: 10,
                                    borderRadius: 8,
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    {t("Send Report")}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default ReportModal;
