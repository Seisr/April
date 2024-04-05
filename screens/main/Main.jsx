import React from "react";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import Users from "../users/Users";
import Subjects from "../subject/Subjects";
import Classes from "../class/Classes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const Main = () => {
  let role = "admin";
  const navigation = useNavigation();

  // let role = "teacher";
  // let role = "student";
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Users" onPress={() => navigation.navigate("Users")} />
      <Button
        title="Subjects"
        onPress={() => navigation.navigate("Subjects")}
      />
      <Button title="Classes" onPress={() => navigation.navigate("Classes")} />
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
