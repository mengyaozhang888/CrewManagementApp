import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    // <ImageBackground
    //   source={require("../assets/background.jpg")} // Make sure to add a background image to your assets folder
    //   style={styles.backgroundImage}
    // >
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Crew Manager</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MainTabs")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0,0,0)", // This will create a dark overlay
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
