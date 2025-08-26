import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type ModalWrapperProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: "none" | "slide" | "fade";
  backdropColor?: string;
  disableTouchClose?: boolean;
  transparent?: boolean;
};

const ModalWrapper = ({
  visible,
  onClose,
  children,
  animationType = "fade",
  backdropColor = "rgba(0, 0, 0, 0.5)",
  disableTouchClose = false,
  transparent=true
}: ModalWrapperProps) => {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
      statusBarTranslucent

    >
      <TouchableWithoutFeedback onPress={onClose} disabled={disableTouchClose}>
        <View style={[styles.backdrop, { backgroundColor: backdropColor }]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    minWidth: "80%",
    elevation: 5,
    
  },
});

export default ModalWrapper;
