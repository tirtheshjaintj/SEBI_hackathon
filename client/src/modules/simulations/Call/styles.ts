
import {
  StyleSheet,
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 70,
    backgroundColor: 'black',
    width: '100%'
  },
  timer: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    marginVertical: 10,
  },
  avatarsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginVertical: 20,
  },
  upperContainer: {
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  avatarBlock: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  avatarLabel: {
    color: "#fff",
    fontSize: 16,
  },
  dialogueBox: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    maxWidth: "90%",
  },
  speakerText: {
    color: "#ccc",
    fontWeight: "700",
    marginBottom: 4,
  },
  dialogueText: {
    color: "#fff",
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginVertical: 20,
    maxWidth: 400,
  },
  optionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
  },
  hangUpButton: {
    backgroundColor: "#E53935",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 20,
  },
  hangUpText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  lowerContainer: {
    alignItems: "center",
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 12,
    // maxWidth: '80%',
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingText: {
    color: "#ccc",
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  selectorButton: {
  backgroundColor: '#4CAF50',
  paddingVertical: 12,
  paddingHorizontal: 18,
  borderRadius: 8,
  marginVertical: 6,
  width: '80%',
  alignItems: 'center',
},
selectorButtonText: {
  color: '#fff',
  fontSize: 16,
},


});


export default styles;