import { React, useEffect, useState, useContext, createContext } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Background from "../components/Background";
import Menu from "../components/Menu";
import * as SecureStore from "expo-secure-store";
import { user } from "../../setting";
import TeacherClasses2 from "./class/TeacherClasses2";

const Stack = createNativeStackNavigator();
export const Context = createContext();

const Main = () => {
  // let role = "student";
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    getRole();
  }, []);
  // Function to pick profile image
  const getRole = async () => {
    const currUser = JSON.parse(await SecureStore.getItemAsync(user));
    setRole(currUser.role);
    console.log(currUser);
    setUserId(currUser._id);
    console.log(userId);
  };

  return (
    <Context.Provider
      value={{ role: [role, setRole], UID: [userId, setUserId] }}
    >
      <ImageBackground
        style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}
      >
        <Background style={styles.container}>
          {role === "admin" && (
            <>
              <Menu page="Users" />
              <Menu page="Subjects" />
              <Menu page="TeacherClasses" />
            </>
          )}
          {role === "teacher" && (
            <>
              {/* <Menu page="TeacherClasses2" /> */}
              <TeacherClasses2 />
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
    </Context.Provider>
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
