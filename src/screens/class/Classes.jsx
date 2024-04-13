import React from "react";
import { SafeAreaView, Text } from "react-native";
import StudentClasses from "./StudentClasses";
import TeacherClasses from "./TeacherClasses";

const Classes = () => {
  // let role = "admin";
  //   let role = "teacher";
  let role = "student";
  return (
    <>
      {role === "student" && <StudentClasses />}
      {role !== "student" && <TeacherClasses />}
    </>
  );
};

export default Classes;
