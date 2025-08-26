import Colors from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons'; // <-- import icon
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Message } from '../SupportBot';
export default function CallMessage({ item, nextStep, isActive }: { item: Message, nextStep: () => void, isActive: boolean }) {
  const makeCall = (number: string) => {
    if (!isActive) return; // ignore if not active
    Linking.openURL(`tel:${number}`);
    nextStep();
  };

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.message}>
          {t("Please call one of the following numbers to resolve your issue:")}
        </Text>
      </View>

      {Array.isArray(item.action?.value) &&
        item.action.value.map((number: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, !isActive && { opacity: 0.5 }]} // greyed out if inactive
            onPress={() => makeCall(number)}
            disabled={!isActive}
          >
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.buttonText}>{t("Call")} {index + 1}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginVertical: 6,
    maxWidth: '80%',
  },
  bubble: {
    backgroundColor: Colors.primaryCyanColor,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderTopLeftRadius: 0,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryCyanColor,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginVertical: 4,
    width: '100%',
    display: 'flex',
    justifyContent: "center",
    paddingLeft: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,   // spacing from icon if you keep text
  },
})
