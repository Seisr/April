import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AprilService } from "../../services/AprilServices";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button.js";
import Icon from "react-native-vector-icons/Ionicons";

const CreateClass = () => {
  const [subjects, setSubjects] = useState([]);

  //   const retrieveSubjects = () => {
  //     AprilService.getAllSubjects()
  //       .then((res) => {
  //         setSubjects(res.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };

  //   useEffect(() => {
  //     retrieveSubjects();
  //   }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.borderBox}>
          <Text style={styles.headerCell1}>Class</Text>
          <Text style={styles.headerCell}>Subject</Text>
          <Text style={styles.headerCell}>Teacher</Text>
          <Text style={styles.headerCell1}>Score Weight</Text>
          <Text style={styles.headerCell}>Midterm </Text>
          <Text style={styles.headerCell}>Practical </Text>
          <Text style={styles.headerCell}>Final </Text>
          <Button style={styles.button}>
            <Text style={styles.buttonText}>Create Class</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
    height: "100%",
  },

  headerCell: {
    fontWeight: "bold",
  },

  headerCell1: {
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    // flexDirection: "row",
    // borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // paddingVertical: 1,
  },
  row1: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // paddingVertical: 1,
  },
  gpa: {
    paddingHorizontal: 20,
  },
  borderBox: {
    width: 200,
    height: 150,
    borderWidth: 1, // Border width
    borderColor: "black", // Border color
    borderStyle: "solid", // Border style: solid, dashed, or dotted
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#F7C613",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 48,
    marginBottom: 12,
  },
  buttonText: {
    color: "#023047",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default CreateClass;
