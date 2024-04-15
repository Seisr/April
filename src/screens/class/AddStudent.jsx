import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AprilService } from "../../services/AprilServices";
import Button from "../../components/Button.js";

const AddStudent = () => {
  const [classDetail, setClassDetail] = useState([]);

  const retrieveClassDetail = () => {
    AprilService.getAllClassDetail()
      .then((res) => {
        setClassDetail(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveClassDetail();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {classDetail !== undefined &&
          classDetail?.map((course, i) => {
            return (
              <SafeAreaView>
                <View style={styles.container}>
                  <View style={styles.row}>
                    <Text style={styles.headerCell}>
                      {course.class.codeName}{" "}
                    </Text>
                    <Text style={styles.headerCell}>Mid </Text>
                    <Text style={styles.headerCell}>Prac </Text>
                    <Text style={styles.headerCell}>Fin </Text>
                    <Text style={styles.headerCell}>Avg </Text>
                    <Text>{"                              "}</Text>
                  </View>
                  <View style={styles.row1} key={i}>
                    <Text>{"                     "}</Text>
                    <Text style={styles.gpa}>{course.midTerm} </Text>
                    <Text style={styles.gpa}>{course.practical} </Text>
                    <Text style={styles.gpa}>{course.final}</Text>
                    <Text style={styles.gpa}>{course.average}</Text>
                    <Icon
                      name="document-outline"
                      style={styles.icon}
                      size={15}
                    />
                    <Icon
                      name="trash-bin-outline"
                      style={styles.icon}
                      size={15}
                    />
                  </View>
                </View>
              </SafeAreaView>
            );
          })}
        <Button style={styles.button}>
          <Text style={styles.buttonText}>Add New Student</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  create_new_class: {
    marginTop: 300,
    alignItems: "flex-end",
  },
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },

  headerCell: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
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
    marginLeft: 15,
    // paddingHorizontal: 1,
  },
  icon: {
    paddingLeft: 20,
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

export default AddStudent;
