import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity, Easing, Dimensions } from "react-native";
const narrationStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  content: {
    marginBottom: 20,
    minHeight: 100,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#ef4444',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBar: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusText: {
    textAlign: 'center',
    color: '#475569',
    fontWeight: '500',
  },
  
  narrationBox: {
    backgroundColor: "#1f2937", // dark slate
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  narrationIcon: {
    fontSize: 36,
    marginBottom: 12,
  },

  narrationText: {
    fontSize: 16,
    color: "#f9fafb",
    textAlign: "center",
    lineHeight: 22,
  },
});


export default narrationStyles;