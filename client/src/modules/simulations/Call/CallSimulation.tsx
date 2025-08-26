import ModalWrapper from '@/src/components/modal/ModalWrapper';
import AppLinearGradient from '@/src/components/shared/AppLinearGradient';
import Colors from '@/src/theme/colors';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { useTranslation } from "react-i18next";

interface CallScreenProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CallScreen: React.FC<CallScreenProps> = (
  {
    onAccept,
    onDecline
  }
) => {
  const { t  } = useTranslation();
  const contactName = t("Scammer");
  const avatarUri = "https://imgs.search.brave.com/jatQSzhi8N_NLLXpFzlOF6LM-sADAUy1VmVaAyA7Tnc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3IvaGFja2Vy/LWN5YmVyLWNyaW1p/bmFsLWxhcHRvcC1z/dGVhbGluZy0yNjBu/dy0yMTUzNTMyMDY3/LmpwZw";

  const handleAccept = () => {
    // do something when call is accepted
    onAccept();
  };

  const handleDecline = () => {
    // do something when call is declined
    onDecline();
  };

  return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.status}>{t("Incoming Call...")}</Text>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{contactName}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.accept]} onPress={handleAccept}>
            <Text style={styles.buttonText}>{t("Accept")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.decline]} onPress={handleDecline}>
            <Text style={styles.buttonText}>{t("Decline")}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
    backgroundColor: 'black',
    width:"100%",
    zIndex: 999
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  status: {
    color: '#aaa',
    fontSize: 18,
    marginBottom: 12,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 100,
  },
  accept: {
    backgroundColor: '#4CAF50',
  },
  decline: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
