import Colors from "@/src/theme/colors";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  label: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "white",
    marginBottom: verticalScale(6),
  },

  scanButton: {
    backgroundColor: "#0984e3",
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(32),
    borderRadius: moderateScale(30),
    alignItems: "center",
    marginTop: verticalScale(20),
    elevation: 6,
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: moderateScale(18),
  },

  loaderContainer: {
    alignItems: "center",
    marginTop: verticalScale(30),
  },
  loadingText: {
    fontSize: moderateScale(16),
    color: "#555",
    marginTop: verticalScale(10),
    fontWeight: "500",
  },

  // 🔍 Result Modal Styles (Slide-up, Neon Styled)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  resultModal: {
    backgroundColor: "#ffffff",
    padding: moderateScale(20),
    borderRadius: moderateScale(25),
    width: "90%",
    alignItems: "center",
    elevation: 8,
    borderWidth: 6,
    borderColor: "white",
  },
  resultLabel: {
    fontSize: moderateScale(22),
    fontWeight: "bold",
    marginBottom: verticalScale(10),
    textAlign: "center",
  },
  resultReason: {
    fontSize: moderateScale(20),
    color: "white",
    paddingLeft: 10,
    marginBottom: verticalScale(18),
  },
  listenButton: {
    backgroundColor: "#6c5ce7",
    paddingVertical: verticalScale(20),
    paddingHorizontal: moderateScale(20),
    alignContent: "center",
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(12),
    elevation: 3,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: verticalScale(40),
    backgroundColor: Colors.white,
  },

  container: {
    flex: 1,
    padding: moderateScale(24),
    gap:verticalScale(16),
  },
  header: {
    marginBottom: verticalScale(24),
  },
  headerTitle: {
    fontSize: moderateScale(28),
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: verticalScale(8),
  },
  headerDivider: {
    height: 4,
    width: moderateScale(48),
    backgroundColor: Colors.divider,
    borderRadius: 2,
  },
  inputContainer: {
    // marginBottom: verticalScale(24),

  },
  inputWrapper: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    minHeight: verticalScale(160),
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  textInput: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: Colors.textPrimary,
    textAlignVertical: "top",
    flex: 1,
  },
  clearButton: {
    position: "absolute",
    right: moderateScale(16),
    top: moderateScale(16),
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(8),
    paddingLeft: moderateScale(4),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    color: Colors.textSecondaryDark,
    marginLeft: moderateScale(8),
  },
  imageButton: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(16),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  imageButtonInner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(32),
  },
  previewImage: {
    width: "100%",
    height: verticalScale(240),
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageIcon: {
    marginBottom: verticalScale(12),
    opacity: 0.8,
  },
  imageButtonText: {
    fontSize: moderateScale(18),
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Medium",
    marginTop: verticalScale(4),
  },
  imageSubText: {
    fontSize: moderateScale(12),
    color: Colors.textSecondaryDark,
    marginTop: verticalScale(2),
  },
});

export default styles;
