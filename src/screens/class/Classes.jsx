import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import StudentClasses from "./StudentClasses";
import TeacherClasses from "./TeacherClasses";
import * as SecureStore from "expo-secure-store";

const Classes = () => {
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
    <>
      {role === "student" && <StudentClasses />}
      {role !== "student" && <TeacherClasses />}
    </>
  );
};

export default Classes;
