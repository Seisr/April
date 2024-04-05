import React from "react";
import { SafeAreaView, Text } from "react-native";

const Classes = () => {
  let role = "admin";
  //   let role = "teacher";
  //   let role = "student";
  return (
    <SafeAreaView>
      {role === "student" && <Text>Student Classes</Text>}
      {role !== "student" && <Text>Admin/Teacher Classes</Text>}
    </SafeAreaView>
  );
};

export default Classes;
