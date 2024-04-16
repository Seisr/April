import { React, useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Background from "../components/Background";
import Menu from "../components/Menu";
import * as SecureStore from "expo-secure-store";
import { user } from "../../setting";

const Stack = createNativeStackNavigator();

const Main = () => {
  const [role, setRole] = useState("student");
  useEffect(() => {
    getRole();
  }, []);
  // Function to pick profile image
  const getRole = async () => {
    const currUser = JSON.parse(await SecureStore.getItemAsync(user));
    setRole(currUser.role);
  };

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}
    >
      <Background style={styles.container}>
        {role === "admin" && (
          <>
            <Menu page="Users" />
            <Menu page="Subjects" />
            <Menu page="Classes" />
          </>
        )}
        {role === "teacher" && (
          <>
            <Menu page="TeacherClasses" />
          </>
        )}
        {role === "student" && (
          <>
            <Menu page="EnrollCourses" />
            <Menu page="StudentClasses" />
          </>
        )}
      </Background>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },
});

export default Main;
