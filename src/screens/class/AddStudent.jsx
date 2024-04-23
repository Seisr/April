import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AprilService } from "../../services/AprilServices";
import Button from "../../components/Button.js";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const AddStudent = () => {
  const navigation = useNavigation();

  const [classDetail, setClassDetail] = useState([]);
  const [modal, setModal] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [classDetailId, setClassDetailId] = useState(0);

  const route = useRoute();
  const { classId } = route.params;
  // console.log(id);
  const show = () => setModal(true);
  const hide = () => setModal(false);

  const retrieveClassDetail = () => {
    let filter = { class: classId };
    // console.log(filter);
    AprilService.getClassDetailById(filter)
      .then((res) => {
        setClassDetail(res.data);
        setClassDetailId(res.data._id);
        // console.log("retrieving class detail");
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteAlert = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this student?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => AprilService.delClassDetail(id) },
    ]);
  };

  const postClassDetail = () => {
    let data = {
      student: studentId,
      classId: classId,
    };
    // console.log(data);
    try {
      AprilService.postClassDetail(data);
    } catch (e) {
      console.log(e);
    }

    navigation.goBack();
  };

  useEffect(() => {
    retrieveClassDetail();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {classDetail?.map((course, i) => {
          return (
            <SafeAreaView key={i}>
              <View style={styles.container}>
                <View style={styles.row}>
                  <Text style={styles.headerCell}>
                    {/* {course.class.codeName}{" "} */}
                    StudentId{"                    "}
                  </Text>
                  <Text style={styles.headerCell}>Mid{"    "}</Text>
                  <Text style={styles.headerCell}>Prac {"   "}</Text>
                  <Text style={styles.headerCell}>Fin{"   "} </Text>
                  <Text style={styles.headerCell}>Avg{"    "} </Text>
                  <Text>{"                 "}</Text>
                </View>
                <View style={styles.row1} key={i}>
                  <Text>{course.student.codeName}</Text>
                  <View style={styles.allGPA}>
                    <Text style={styles.gpaMid}>{course.midTerm}</Text>
                    <Text style={styles.gpaPrac}>{course.practical}</Text>
                    <Text style={styles.gpaF}>{course.final}</Text>
                    <Text style={styles.gpa}>{course.average?.toFixed(1)}</Text>
                  </View>
                  <Icon
                    name="document-outline"
                    style={styles.icon}
                    size={15}
                    onPress={() =>
                      navigation.navigate("AddGPA", { id: course._id })
                    }
                  />
                  <Icon
                    name="trash-bin-outline"
                    style={styles.icon}
                    size={15}
                    onPress={() => deleteAlert(course._id)}
                  />
                </View>
              </View>
            </SafeAreaView>
          );
        })}
        <Button style={styles.button}>
          <Text style={styles.buttonText} onPress={show}>
            Add New Student
          </Text>
        </Button>
        <Modal
          visible={modal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View>
            <View style={styles.modal}>
              <Text>StudentCode</Text>
              <TextInput
                placeholder="StudentCode"
                style={styles.textInput}
                onChangeText={setStudentId}
              />
            </View>
            <View style={styles.modal1}>
              <Button style={styles.button} onPress={postClassDetail}>
                <Text style={styles.buttonText}>Add</Text>
              </Button>
              <Button style={styles.buttonCancel} onPress={hide}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Button>
            </View>
          </View>
        </Modal>
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
  modal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  modal1: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: "70%",
  },
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
    marginLeft: 30,
    // paddingHorizontal: 1,
  },
  gpaMid: {
    marginLeft: 25,
  },
  gpaPrac: {
    marginLeft: 30,
  },
  gpaF: {
    marginLeft: 40,
  },
  allGPA: {
    flexDirection: "row",
    marginRight: 10,
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
    width: 200,
  },
  buttonText: {
    color: "#023047",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonCancel: {
    backgroundColor: "grey",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 12,
    width: 200,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingLeft: 10,
    marginLeft: 10,
  },
});

export default AddStudent;
