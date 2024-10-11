import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function EmployeeItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        {item.currentTask && (
          <Text style={styles.currentTask}>{item.currentTask}</Text>
        )}
      </View>
      <View style={styles.status}>
        {item.currentTask ? (
          <Text style={{ color: "orange", fontWeight: "bold" }}>On Task</Text>
        ) : (
          <Text style={{ color: "green", fontWeight: "bold" }}>Available</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#A0a0a0",
  },
  currentTask: {
    fontSize: 14,
    color: "#000",
    marginTop: 4,
  },
  status: {
    marginLeft: 16,
    padding: 5,
    borderRadius: 4,
  },
});
