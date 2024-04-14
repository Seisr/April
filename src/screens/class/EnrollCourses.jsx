import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AprilService } from "../../services/AprilServices";

const EnrollCourses = () => {
  const [classes, setClasses] = useState([]);

  const retrieveClasses = () => {
    AprilService.getAllClasses()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveClasses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {classes !== undefined &&
          classes?.map((course, i) => {
            return (
              <SafeAreaView>
                <View style={styles.container}>
                  <View style={styles.row}>
                    <Text style={styles.headerCell}>{course.codeName} </Text>
                    <Text>
                      {course.subject.name}
                      {"      "}
                    </Text>
                    <Icon name="create-outline" style={styles.icon} size={15} />
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
    paddingTop: 35,
  },
  row: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 1,
  },
  headerCell: {
    // flex: 1,
    fontWeight: "bold",
    // textAlign: "center",
  },
  cell: {
    // flex: 1,
    // textAlign: "center",
  },
  icon: {
    // paddingBottom: 20,
  },
});

export default EnrollCourses;
