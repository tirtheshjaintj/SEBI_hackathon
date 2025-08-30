import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 40,
    justifyContent: "space-between",
    width: "100%",
    position:"relative"
  },
  avatarBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  avatarWrapper: {
    width: "70%",
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 8,
    position: "relative",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  activeBox: {
    borderColor: "#00FF66",
    shadowColor: "#00FF66",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  avatarLabel: {
    color: "#fff",
    fontSize: 16,
    marginTop: 6,
  },
  dialogueBox: {
    position: "absolute",
    top: 550,
    left: 10,
    right: 10,
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 12,
    zIndex: 999,
  },
  speakerText: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 4,
  },
  dialogueText: {
    color: "#fff",
    fontSize: 16,
  },
  timer: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: "#333",
    padding: 18,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  endCall: {
    backgroundColor: "#d32f2f",
  },

  // new bottom bar with streamer photo + controls
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  streamerAvatar: {
    width: '97%',
    height: 250,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  
activeStreamer: {
  borderColor: "#00FF66",
  shadowColor: "#00FF66",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 10,
  elevation: 10,
},
});

export default styles;
