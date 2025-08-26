import React, { useCallback, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness"; // Adjust path
import useAuthStore from "@/src/store/authSlice";
import { staticAvatar } from "@/src/utils/user/user";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { StatusBar } from "expo-status-bar";
import Colors from "@/src/theme/colors";
import Toast from "react-native-toast-message";
import { HTTP_STATUS_CODES } from "@/src/constants/constant";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import { router } from "expo-router";
import LoaderFullScreen from "@/src/components/loaders/LoaderFullScreen";
import Confirmation from "@/src/components/alerts/Confirmation";

import { useTranslation } from "react-i18next";
import axiosInstance from "@/src/apis/axiosInstance";

const WritePostScreen = () => {
  const { user } = useAuthStore((state) => state);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState<any>(null); // single photo
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        t("Permission Denied"),
        t("Allow gallery access to add images.")
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0]); // pick first photo only
    }
  };

  const validate = useCallback(() => {
    if (!content.trim()) {
      Toast.show({
        type: "error",
        text1: t("Please enter some content"),
      });
      return;
    }
    if (!photo) {
      Toast.show({
        type: "error",
        text1: t("Please add a photo"),
      });
      return;
    }
    setShowConfirmationModal(true);
  }, [content, photo]);

  const handlePost = async () => {
    setLoading(true);
    try {
      setShowConfirmationModal(false);

      const formData = new FormData();

      const imageUri = photo?.uri;
      if (imageUri) {
        const filename = imageUri.split("/").pop() || `photo.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("file", {
          uri: imageUri,
          name: filename,
          type: type,
        } as any);
      }
      formData.append("content", content);

      const res = await axiosInstance.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      if (res.status === HTTP_STATUS_CODES.CREATED) {
        Toast.show({ type: "success", text1: t("Post created successfully") });
        setContent("");
        setPhoto(null);
        router.replace("/community");
      } else {
        Toast.show({ type: "error", text1: t("Failed to create post") });
      }
    } catch (error) {
      console.log("Post creation error:", error);
      Toast.show({ type: "error", text1: t("Failed to create post") });
    } finally {
      setLoading(false);
    }
  };

  const renderImageItem = (item: any) => {
    if (!item) return null; // nothing to render

    return (
      <View>
        <TouchableOpacity
          onPress={() => setPhoto(null)}
          style={{
            position: "absolute",
            top: scale(0),
            right: scale(10),
            backgroundColor: Colors.white,
            borderRadius: scale(100),
            zIndex: 10,
          }}
        >
          <MaterialIcons name="cancel" size={18} color="red" />
        </TouchableOpacity>
        <Image source={{ uri: item.uri }} style={styles.imagePreview} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent />
      <AppSafeAreaView style={{ flex: 1 }}>
        <CommonToolbar title={t("Share your thoughts")} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{
              flex: 1,
              paddingBottom: verticalScale(100),
              backgroundColor: Colors.white,
            }}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
          >
            <View style={styles.main}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.cancel}>{t("Cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={validate}>
                  <Text style={styles.post}>{t("Post")}</Text>
                </TouchableOpacity>
              </View>

              {/* Text Input */}
              <View style={styles.inputSection}>
                <View style={styles.avatar}>
                  <Image
                    source={user?.avatar ? { uri: user.avatar } : staticAvatar}
                    style={{ width: scale(36), height: scale(36) }}
                    resizeMode="cover"
                  />
                </View>
                <TextInput
                  placeholder={t("What do you think right now?")}
                  placeholderTextColor="#999"
                  multiline
                  value={content}
                  onChangeText={setContent}
                  style={styles.input}
                />
              </View>

              {/* Image Picker Row */}
              <View style={styles.imageRow}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handlePickImage}
                >
                  <Ionicons name="camera" size={24} color="#555" />
                </TouchableOpacity>

                {/* Render single photo */}
                {renderImageItem(photo)}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </AppSafeAreaView>

      <ModalWrapper
        visible={showConfirmationModal}
        animationType="fade"
        disableTouchClose={false}
        onClose={() => {}}
      >
        <Confirmation
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={handlePost}
        />
      </ModalWrapper>

      {loading && <LoaderFullScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteDim,
  },
  main: {
    flex: 1,
    padding: scale(16),
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  cancel: {
    fontSize: normalize(16),
    color: Colors.textSecondaryDark,
  },
  post: {
    fontSize: normalize(16),
    fontWeight: "600",
    color: Colors.primaryCyanColor,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(10),
  },
  avatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#e3e3e3",
    marginRight: scale(10),
    overflow: "hidden",
    position: "relative",
  },
  input: {
    flex: 1,
    fontSize: normalize(16),
    minHeight: verticalScale(80),
    textAlignVertical: "top",
    color: "#333",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(5),
  },
  addButton: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
  },
  imageList: {
    paddingLeft: 0,
  },
  imagePreview: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    marginRight: scale(8),
  },
});

export default WritePostScreen;
