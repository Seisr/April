import React from "react";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import Users from "../users/Users";
import Subjects from "../subject/Subjects";
import Classes from "../class/Classes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { accessToken } from "../../../setting";
import * as SecureStore from "expo-secure-store";
import { AprilService } from "../../services/AprilServices";
const Stack = createNativeStackNavigator();

const Main = () => {
  // let role = "admin";
  const navigation = useNavigation();

  let role = "student";

  const callData = async () => {
    try {
      let res = await AprilService.getAllClasses();
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {role === "admin" && (
        <>
          <Button title="Users" onPress={() => navigation.navigate("Users")} />
          <Button
            title="Subjects"
            onPress={() => navigation.navigate("Subjects")}
          />
          <Button
            title="Classes"
            onPress={() => navigation.navigate("Classes")}
          />
        </>
      )}
      {role === "teacher" && (
        <>
          <Button
            title="CreateClass"
            onPress={() => navigation.navigate("CreateClass")}
          />
          <Button
            title="Classes"
            onPress={() => navigation.navigate("Classes")}
          />
          <Button title="callToken" onPress={callData} />
        </>
      )}
      {role === "student" && (
        <>
          <Button
            title="EnrollCourses"
            onPress={() => navigation.navigate("EnrollCourses")}
          />
          <Button
            title="Classes"
            onPress={() => navigation.navigate("Classes")}
          />
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
});

export default Main;
