import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  SectionList,
} from "react-native";
import { useEmployee } from "../components/EmployeeContext";
import RNPickerSelect from "react-native-picker-select";

const AddScreen = () => {
  const [empName, setEmpName] = useState("");
  const [role, setRole] = useState(null);
  const { addEmployee, employees, loadEmployees, deleteEmployee } =
    useEmployee();

  const addHandler = async () => {
    if (!empName || !role) {
      Alert.alert("Please enter name and role");
      return;
    }

    const newEmployee = {
      id: Date.now().toString(),
      name: empName,
      role: role,
      currentTask: "",
    };
    const success = await addEmployee(newEmployee);
    if (success) {
      Alert.alert("Employee added successfully");
      setEmpName("");
      setRole(null);
    } else {
      Alert.alert("Failed to add employee");
    }
  };

  const onDeleteHandler = async (id) => {
    Alert.alert("Delete Employee", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          const success = await deleteEmployee(id);
          if (success) {
            Alert.alert("Employee deleted successfully");
            loadEmployees();
          }
        },
      },
    ]);
  };
  const renderItem = ({ item }) => (
    <View style={styles.deleteListContainer}>
      <Text style={styles.item}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteHandler(item.id)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.title}>{title}</Text>
  );
  const sections = [
    {
      title: "Add New Employee",
      data: [{ key: "add_form" }],
      renderItem: () => (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={empName}
              onChangeText={(text) => setEmpName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Role:</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setRole(value)}
                placeholder={{ label: "Click to Select Role", value: null }}
                items={[
                  { label: "Engineer", value: "Engineer" },
                  { label: "Manager", value: "Manager" },
                  { label: "Intern", value: "Intern" },
                  { label: "Designer", value: "Designer" },
                  { label: "Marketing", value: "Marketing" },
                  { label: "Developer", value: "Developer" },
                ]}
                value={role}
                style={pickerSelectStyles}
              />
            </View>
          </View>
          <TouchableOpacity onPress={addHandler} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      title: "Delete employee",
      data: employees,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id || String(index)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

export default AddScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    width: 80,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    padding: 10,
  },
  deleteButton: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#f44336",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteListContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  item: {
    flex: 1,
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,

    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
