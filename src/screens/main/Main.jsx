import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Users from "../users/Users";
import Subjects from "../subjects/Subjects.jsx";
import Classes from "../class/Classes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { accessToken } from "../../../setting";
import Button from "../../components/Button.js";
import * as SecureStore from "expo-secure-store";
import { AprilService } from "../../services/AprilServices";
import TeacherClasses from "../class/TeacherClasses.jsx";

const Stack = createNativeStackNavigator();

const Main = () => {
  let role = "admin";
  // let role = "teacher";
  // let role = "student";
  TeacherClasses;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {role === "admin" && (
        <>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Users")}
          >
            <Text style={styles.buttonText}>Users</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Subjects")}
          >
            <Text style={styles.buttonText}>Subjects</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("TeacherClasses")}
          >
            <Text style={styles.buttonText}>Classes</Text>
          </Button>
          {/* <Button title="Users" onPress={() => navigation.navigate("Users")} />
          <Button
            title="Subjects"
            onPress={() => navigation.navigate("Subjects")}
          />
          <Button
            title="Classes"
            onPress={() => navigation.navigate("Classes")}
          /> */}
        </>
      )}
      {role === "teacher" && (
        <>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("CreateClass")}
          >
            <Text style={styles.buttonText}>CreateClass</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("TeacherClasses")}
          >
            <Text style={styles.buttonText}>Classes</Text>
          </Button>
        </>
        // <Button
        //   title="CreateClass"
        //   onPress={() => navigation.navigate("CreateClass")}
        // />
        // <Button
        //   title="Classes"
        //   onPress={() => navigation.navigate("Classes")}
        // />
      )}
      {role === "student" && (
        <>
          {/* <Button
            title="EnrollCourses"
            onPress={() => navigation.navigate("EnrollCourses")}
          /> */}
          {/* <Button
            title="Classes"
            onPress={() => navigation.navigate("Classes")}
          /> */}
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("EnrollCourses")}
          >
            <Text style={styles.buttonText}>EnrollCourses</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Classes")}
          >
            <Text style={styles.buttonText}>Classes</Text>
          </Button>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
  },
  login_input: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  button: {
    backgroundColor: "#F7C613",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: "75%",
  },
  buttonText: {
    color: "#023047",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Main;
