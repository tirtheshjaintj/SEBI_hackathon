import Colors from "@/src/theme/colors";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Message as MessageType } from "../SupportBot";


const Message = ({
  item,
  onOptionSelect,
  isBank = false,
  nextStep,
}: {
  item: MessageType;
  onOptionSelect?: (option: string, id: number) => void;
  isBank?: boolean;
  nextStep: () => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const isBot = item.sender === "bot";
  
  

  const { t } = useTranslation();

  
// Bank info with display names and avatar URLs
const BANK_INFO: Record<string, { displayName: string; avatar: string }> = {
  psb: {
    displayName: t("Punjab & Sindh Bank"),
    avatar:
      "https://imgs.search.brave.com/JNURxDw8jwvgSDBfVN2LbW-r7gkUk_KiG0KwMvKY2xY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL3YyL2Nv/bXAvbXVtYmFpLzIw/LzAyMnAyMDAwMDIw/L2NhdGFsb2d1ZS9w/dW5qYWItYW5kLXNp/bmQtYmFuay1hbmRo/ZXJpLWVhc3QtbXVt/YmFpLW5hdGlvbmFs/aXNlZC1iYW5rcy0x/dnZ3eC0yNTAuanBn/P3c9NjQwJnE9NzU",
  },
  hdfc: {
    displayName: t("HDFC Bank"),
    avatar:
      "https://imgs.search.brave.com/Yrz_i4bS4q0_c4t1yPfI8E9CpWODUQDeYl1YYFDj1FQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFlL2I0/LzkzLzFlYjQ5Mzg1/NTc1MTc1YWI3ZjU0/MWQ3MDAwMjczYTFi/LmpwZw",
  },
  pnb: {
    displayName: t("Punjab National Bank"),
    avatar:
      "https://imgs.search.brave.com/9C_id2wMtLrn8693PkEPYr4W-_rFDP85tIo_2stknYw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzUyLzY5/LzJjLzUyNjkyYzUz/MDZiMzE1ZDg0MWUx/MTdlNzVhYmI4M2Fk/LmpwZw",
  },
  icici: {
    displayName: t("ICICI Bank"),
    avatar:
      "https://imgs.search.brave.com/ExJQFfuOAcuxY5N7mgFbI1TNznyDFao_PWXP1OoNiV0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDIwLzE5/MC80MzUvbm9uXzJ4/L2ljaWNpLWxvZ28t/aWNpY2ktaWNvbi1m/cmVlLWZyZWUtdmVj/dG9yLmpwZw",
  },
  axis: {
    displayName: t("Axis Bank"),
    avatar:
      "https://imgs.search.brave.com/t3mjMMb0up05H2WqA7aDsDCq-KazaD5IJJGnciGPAGE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIyMTA0NzgucG5n",
  },
  sbi: {
    displayName: t("State Bank of India"),
    avatar:
      "https://imgs.search.brave.com/LNO9jLNNxQRmSAlrIUp15Gfq-aNclJcziZUMcmvwZic/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzU1LzIvc2JpLXN0/YXRlLWJhbmstb2Yt/aW5kaWEtbG9nby1w/bmdfc2Vla2xvZ28t/NTU2NTA3LnBuZw",
  },
  kotak: {
    displayName: t("Kotak Mahindra Bank"),
    avatar:
      "https://imgs.search.brave.com/IIIjzzx7KopVDUR7bzHzM-SS-wlMO2skrxUnX_0x2_o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9icmFu/ZGxvZ29zLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMi8w/NC9rb3Rha19tYWhp/bmRyYV9iYW5rLWxv/Z28tYnJhbmRsb2dv/cy5uZXRfLTUxMng1/MTIucG5n",
  },
  union: {
    displayName: t("Union Bank of India"),
    avatar:
      "https://imgs.search.brave.com/Z8B8oT5G3COfEwecT669WbFtIqsPu-w4gHx4oHxdUOk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cG5nZ2FsbGVyeS5j/b20vd3AtY29udGVu/dC91cGxvYWRzL3Vu/aW9uLWJhbmstb2Yt/aW5kaWEtbG9nby0w/Mi5wbmc",
  },
  indusind: {
    displayName: t("IndusInd Bank"),
    avatar:
      "https://imgs.search.brave.com/P2g97GCF755nFHckq-oDB4NAH98-ikDvKFhfyLkwsew/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzcvMS9pbmR1c2lu/ZC1iYW5rLWxvZ28t/cG5nX3NlZWtsb2dv/LTcxMzU0LnBuZw",
  },
  yesbank: {
    displayName: t("Yes Bank"),
    avatar:
      "https://imgs.search.brave.com/8Uu9Fm82Lb0fkxiRxRuTT9q2gB67196525NeJOeW9I4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMwLzIveWVzLWJh/bmstbG9nby1wbmdf/c2Vla2xvZ28tMzA0/MjI4LnBuZw",
  },
  bob: {
    displayName: t("Bank of Baroda"),
    avatar:
      "https://imgs.search.brave.com/PebO4zfB9TIV43-lvSidyhuwJy3IxKBWCpPVFb0uRoM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9icmFu/ZGxvZ29zLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMi8w/Ni9iYW5rX29mX2Jh/cm9kYS1sb2dvX2Jy/YW5kbG9nb3MubmV0/X2RpcXMwLTUxMng1/MTIucG5n",
  },
  canara: {
    displayName: t("Canara Bank"),
    avatar:
      "https://imgs.search.brave.com/SQeXI5-uM2ryj478g1uWn2a4zRB_BHnq_j9gmTFtsIc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bGlibG9nby5jb20v/aW1nLWxvZ28vY2E4/NzkyYzg2ZC1jYW5h/cmEtYmFuay1sb2dv/LWNhbmFyYS1iYW5r/LWxhdW5jaGVzLXF1/YWxpZmllZC1pbnN0/aXR1dGlvbmFsLXBs/YWNlbWVudC5wbmc",
  },
};
  const getBankInfo = (bankCode: string) =>
    BANK_INFO[bankCode.toLowerCase()] || BANK_INFO["default"];

 const handleClick = (option : string) => {
    if(item?.step === 'Report to Bank'  ){
      if(option === 'check message'){
        router.replace('/(main)/spamdetect')
      }else{
        Linking.openURL(`tel:${option}`);
        nextStep();
      }
    }
    onOptionSelect?.(option, item?.id);
  }

  const handleBankSelect = (bankCode: string) => {
    onOptionSelect?.(bankCode, item?.id);
    setModalVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        { alignItems: isBot ? "flex-start" : "flex-end" },
      ]}
    >
      {/* Chat bubble */}
      <View
        style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}
      >
        <Text style={[styles.messageText, { color: isBot ? "#333" : "#fff" }]}>
          {t(item.content ?? "")}
        </Text>
      </View>

      {/* Option buttons */}
      {item?.options && item?.options.length > 0 && !isBank && (
        <View style={styles.optionsContainer}>
          {item.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                option === "Back to Home" && {
                  backgroundColor: Colors.primaryCyanColor,
                  width: "100%",
                  marginTop: 5,
                },
              ]}
              onPress={() => handleClick?.(option)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.optionText,
                  option === "Back to Home" && {
                    color: "#fff",
                    textAlign: "center",
                  },
                ]}
              >
                {t(option)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Bank selection button and modal */}
      {isBank && item?.options && item.options.length > 0 && (
        <>
          <TouchableOpacity
            style={[
              styles.optionButton,
              { backgroundColor: Colors.primaryCyanColor, marginTop: 5 },
            ]}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.optionText, { color: "#fff" }]}>
              {t("Select Bank")}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{t("Choose Your Bank")}</Text>
                <FlatList
                  data={item.options}
                  keyExtractor={(bankCode) => bankCode}
                  renderItem={({ item: bankCode }) => {
                    const bank = getBankInfo(bankCode);
                    return (
                      <TouchableOpacity
                        style={styles.bankItem}
                        onPress={() => handleBankSelect(bankCode)}
                      >
                        <Image
                          source={{ uri: bank.avatar }}
                          style={styles.bankAvatar}
                        />
                        <Text style={styles.bankText}>
                          {t(bank.displayName)}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>{t("Cancel")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    maxWidth: "80%",
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  botBubble: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: Colors.primaryCyanColor,
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  optionButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  optionText: {
    color: Colors.primaryCyanColor,
    fontSize: 14,
    fontWeight: "500",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: Colors.primaryCyanColor,
  },
  bankItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  bankAvatar: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 14,
    borderRadius: 20,
  },
  bankText: {
    fontSize: 17,
    color: "#222",
  },
  closeButton: {
    marginTop: 18,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: Colors.primaryCyanColor,
  },
  closeText: {
    fontSize: 16,
    color: Colors.primaryCyanColor,
    fontWeight: "700",
  },
});

export default Message;
