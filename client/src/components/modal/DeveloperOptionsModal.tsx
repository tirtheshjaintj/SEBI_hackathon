import { ActionIds } from "@/src/utils/notifications/constants";
import { sendActionNotification } from "@/src/utils/notifications/notification";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface DeveloperOptionsModalProps {
    deviceInfo: any;
    onClose: () => void;
}

export default function DeveloperOptionsModal({ deviceInfo, onClose }: DeveloperOptionsModalProps) {
    const { t } = useTranslation();
    useEffect(() => {
        if (deviceInfo.developerOptionsEnabled) {
            sendActionNotification({
                payload: {
                    title: t("Developer Options Enabled"),
                    body: t(`"USB debugging" is a highly sensitive service intended only for developers. If you turn it on, your private information might be leaked and your property might be at risk. Here's what might happen:`),
                    actionId: ActionIds.DEV_ACTIONS,
                },
            });
        }
    }, [deviceInfo]);
    return (
        <Modal visible={deviceInfo.developerOptionsEnabled} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <MaterialIcons style={{ textAlign: "center" }} name="error-outline" size={60} color="red" />
                    <Text style={styles.title}>{t("Developer Options Enabled")}</Text>

                    <Text style={styles.description}>
                        {t(`"USB debugging" is a highly sensitive service intended only for developers. If you turn it on, your private information might be leaked and your property might be at risk. Here's what might happen:`)}
                    </Text>

                    <ScrollView style={{ marginTop: 10 }}>
                        {[
                            {
                                title: t("Access and edit files via computer"),
                                desc: t("Access and edit files on this device via a connected computer"),
                            },
                            {
                                title: t("Install apps"),
                                desc: t("Install apps without your permissions"),
                            },
                            {
                                title: t("Monitor and record screen content"),
                                desc: t("Monitor and record all content displayed on the screen"),
                            },
                            {
                                title: t("Access device info"),
                                desc: t("Access device info (might include personal data)"),
                            },
                        ].map((item, index) => (
                            <View key={index} style={styles.listItem}>
                                <MaterialIcons name="folder" size={28} color="#ccc" />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemDesc}>{item.desc}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.okBtn} onPress={onClose}>
                            <Text style={styles.okText}>{t("Turn OFF")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "#111",
        borderRadius: 16,
        padding: 20,
        width: "90%",
        maxHeight: "90%",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginVertical: 10,
    },
    description: {
        color: "#ccc",
        fontSize: 14,
        textAlign: "left",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 10,
    },
    itemTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
    itemDesc: {
        color: "#aaa",
        fontSize: 13,
        marginTop: 2,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    okBtn: {
        flex: 1,
        backgroundColor: "red",
        paddingVertical: 12,
        borderRadius: 30,
        marginLeft: 10,
    },
    okText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});
