import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useState } from "react";
const EmployeeContext = createContext();
const initialEmployees = [
  {
    id: "1",
    name: "John Doe",
    role: "Manager",
    currentTask: "",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Designer",
    currentTask: "working on design",
  },
  {
    id: "3",
    name: "Bob Johnson",
    role: "Developer",
    currentTask: "",
  },
  {
    id: "4",
    name: "Alice Brown",
    role: "Marketing",
    currentTask: "",
  },
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = useCallback(async () => {
    try {
      const storedEmployees = await AsyncStorage.getItem("employees");

      if (storedEmployees !== null && storedEmployees !== "[]") {
        const parsedEmployees = JSON.parse(storedEmployees);

        setEmployees(parsedEmployees);
      } else {
        console.log(
          "No stored employees or empty array, setting initial employees"
        );
        await AsyncStorage.setItem(
          "employees",
          JSON.stringify(initialEmployees)
        );
        setEmployees(initialEmployees);
      }
    } catch (error) {}
  }, []);
  //add employee
  const addEmployee = async (newEmployee) => {
    try {
      const updatedEmployees = [...employees, newEmployee];
      await AsyncStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  //add task
  const addTask = async (employeeId, task) => {
    try {
      const updatedEmployees = employees.map((employee) => {
        if (employee.id === employeeId) {
          return { ...employee, currentTask: task };
        }
        return employee;
      });
      await AsyncStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //complete task
  const completeTask = async (employeeId) => {
    try {
      const updatedEmployees = employees.map((employee) => {
        if (employee.id === employeeId) {
          return { ...employee, currentTask: "" };
        }
        return employee;
      });
      await AsyncStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  //delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      const updatedEmployees = employees.filter(
        (employee) => employee.id !== employeeId
      );
      await AsyncStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        loadEmployees,
        addTask,
        completeTask,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
export const useEmployee = () => useContext(EmployeeContext);
