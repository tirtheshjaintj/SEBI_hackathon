import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    BackHandler,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    visible: boolean;
    onRetry: () => void;
    onExit?: () => void;
};

export default function BioMetricModal({
    visible,
    onRetry,
    onExit = () => BackHandler.exitApp(),
}: Props) {
    const { t } = useTranslation();
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onExit}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{t("Authentication Failed")}</Text>
                    <Text style={styles.modalMessage}>
                        {t("You need to authenticate to use the app")}
                    </Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.retryButton]}
                            onPress={onRetry}
                        >
                            <Text style={styles.buttonText}>{t("Retry")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.exitButton]}
                            onPress={onExit}
                        >
                            <Text style={styles.buttonText}>{t("Exit")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        width: '80%',
        elevation: 6,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 15,
        color: '#444',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    retryButton: {
        backgroundColor: '#4CAF50',
    },
    exitButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
