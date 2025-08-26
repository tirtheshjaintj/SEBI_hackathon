import axiosInstance from "@/src/apis/axiosInstance";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import NewsShimmer from "@/src/modules/news/NewsShimmer";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Toast from "react-native-toast-message";

export default function CallerDetailScreen() {
    const { callerNumber } = useLocalSearchParams();
    const [extractedNumber, setExtractedNumber] = useState<string | null>(null);
    const [reports, setReports] = useState<any[]>([]);
    const [reported, setReported] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const handleReport = async () => {
        if (reported || !extractedNumber) {
            Toast.show({
                type: "info",
                text1: "Already Reported or Invalid Number",
                position: "bottom",
            });
            return;
        }
        try {
            await axiosInstance.post("/report/add/call", {
                phone_number: extractedNumber,
            });
            Toast.show({
                type: "success",
                text1: "Number Reported Successfully",
                position: "bottom",
            });
            setReported(true);
            getReportData();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Failed to Report Number",
                position: "bottom",
            });
            console.log(error);
        }
    };

    const getReportData = async () => {
        if (!extractedNumber) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/report/reports`, {
                params: { phone_number: extractedNumber },
            });
            const data = response.data || [];
            setReports(data.reports);
            setReported(data.reported);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (typeof callerNumber === "string") {
            const match = callerNumber.match(/\+?\d{10,15}/);
            if (match) {
                setExtractedNumber(match[0]);
            }
        }
    }, [callerNumber]);

    useEffect(() => {
        if (extractedNumber) {
            getReportData();
        }
    }, [extractedNumber]);


    const renderReportItem = ({ item }: { item: any }) => (
        <View style={styles.commentCard}>
            {/* Avatar */}
            <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#fff" />
            </View>

            {/* Comment content */}
            <View style={{ flex: 1 }}>
                {/* Name */}
                <Text style={styles.commentName}>
                    {item.user_id?.name || t("Unknown")}
                </Text>

                {/* Message */}
                <Text style={styles.commentMessage}>
                    {item.message || t("Spam Number")}
                </Text>
            </View>
        </View>
    );




    return (
        <AppSafeAreaView style={styles.container}>
            <CommonToolbar title={`${t("Caller Details")} ${extractedNumber}`} />
            <Text style={styles.header}>📞 {extractedNumber}</Text>

            <View style={styles.metaBox}>
                <Text style={styles.metaText}>
                    ⚠️ {t("Total Reports")}:{" "}
                    <Text style={{ fontWeight: "bold" }}>{reports.length}</Text>
                </Text>
            </View>

            {loading ? (
                <NewsShimmer />
            ) : (
                <FlatList
                    data={reports}
                    keyExtractor={(item) => item._id}
                    renderItem={renderReportItem}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            {t("No reports found for this number.")}
                        </Text>
                    }
                />
            )}

            <TouchableOpacity
                style={[styles.reportButton, reported && styles.reportedButton]}
                onPress={handleReport}
                disabled={reported}
            >
                <Ionicons
                    name="alert-circle"
                    size={20}
                    color="white"
                    style={{ marginRight: 8 }}
                />
                <Text style={styles.reportButtonText}>
                    {reported ? t("Reported") : t("Report Number")}
                </Text>
            </TouchableOpacity>

            <Toast />
        </AppSafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 16,
        color: "#333",
    },
    metaBox: {
        backgroundColor: "#E3F2FD",
        padding: 12,
        marginHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    metaText: {
        fontSize: 16,
        color: "#1565C0",
    },
    reportCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 12,
        marginVertical: 6,
        elevation: 1,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    reportText: {
        flex: 1,
        fontSize: 15,
        color: "#444",
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#888",
    },
    reportButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E53935",
        padding: 14,
        borderRadius: 30,
        margin: 20,
    },
    reportedButton: {
        backgroundColor: "#9E9E9E",
    },
    reportButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    commentCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 6,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E53935",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    commentName: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 2,
        color: "#222",
    },
    commentMessage: {
        fontSize: 13,
        color: "#555",
        lineHeight: 18,
    },
});
