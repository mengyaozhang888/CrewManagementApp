import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function EmployeeItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <View style={styles.status}>
        {item.currentTask ? (
          <Text style={styles.statusTextBusy}>On Task</Text>
        ) : (
          <Text style={styles.statusTextAvailable}>Available</Text>
        )}
      </View>
      {item.currentTask && (
        <View style={styles.taskContainer}>
          <Text style={styles.taskLabel}>Current Task:</Text>
          <Text style={styles.currentTask}>{item.currentTask}</Text>
        </View>
      )}
      <Text style={styles.clickPrompt}>Click employee to assign work</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  statusTextBusy: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "orange",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusTextAvailable: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "green",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  taskContainer: {
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  taskLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 4,
  },
  currentTask: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  clickPrompt: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
});
