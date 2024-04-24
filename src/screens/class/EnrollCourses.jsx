import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AprilService } from "../../services/AprilServices";
import { useNavigation } from "@react-navigation/native";

// import Button from "../../components/Button";
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
  });
  // console.log(`đây là class: ${classes}`);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {classes?.map((course, i) => {
          return (
            <SafeAreaView key={i}>
              <View style={styles.container}>
                <View style={styles.row} key={i}>
                  <Text style={styles.headerCell}>{course.codeName} </Text>
                  <Text>
                    {course.subject.name}
                    {"     "}
                  </Text>
                  <Icon
                    name="create-outline"
                    style={styles.icon}
                    size={20}
                    onPress={() =>
                      navigation.navigate("EnrollCoursesDetail", {
                        id: i,
                        id2: course._id,
                      })
                    }
                  />
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
  button: {
    backgroundColor: "#F7C613",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: "#023047",
    fontWeight: "bold",
    fontSize: 16,
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
