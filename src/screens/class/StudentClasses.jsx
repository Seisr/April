import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AprilService } from "../../services/AprilServices";

const StudentClasses = () => {
  const [classDetail, setClassDetail] = useState([]);

  const retrieveClassDetail = () => {
    AprilService.getAllClassDetail()
      .then((res) => {
        setClassDetail(res.data);
        console.log(res.data);
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
      <View>
        {classDetail !== undefined &&
          classDetail?.map((course, i) => {
            return (
              <SafeAreaView>
                <View style={styles.container}>
                  <View style={styles.row}>
                    <Text style={styles.headerCell}>
                      {course.class?.codeName}{" "}
                    </Text>
                    <Text style={styles.headerCell}>Midterm </Text>
                    <Text style={styles.headerCell}>Practical </Text>
                    <Text style={styles.headerCell}>Final </Text>
                    <Text style={styles.headerCell}>Average</Text>
                  </View>
                  <View style={styles.row1} key={i}>
                    <Text>{"                                 "}</Text>
                    <Text style={styles.gpa}>{course.midTerm} </Text>
                    <Text style={styles.gpa}>{course.practical} </Text>
                    <Text style={styles.gpa}>{course.final}</Text>
                    <Text style={styles.gpa}>{course.average}</Text>
                  </View>
                </View>
              </SafeAreaView>
            );
          })}
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
    paddingHorizontal: 20,
  },
});
export default StudentClasses;
