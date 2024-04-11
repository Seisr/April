import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AprilService from "../../services/AprilServices";

const StudentClasses = () => {
  const [classDetail, setClassDetail] = useState("");

  const retrieveClassDetail = () => {
    AprilService.getAllClassDetail()
      .then((res) => {
        setClassDetail(res.data);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveClassDetail();
  });

  console.log(classDetail);

  return (
    <SafeAreaView style={styles.container}>
      <Text>TeacherClasses</Text>
      <Text>TeacherClasses</Text>
      <Text>TeacherClasses</Text>
      <Text>TeacherClasses</Text>
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
export default StudentClasses;
