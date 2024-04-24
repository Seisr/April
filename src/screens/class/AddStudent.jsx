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
import { Dropdown } from "react-native-element-dropdown";

const AddStudent = () => {
  const navigation = useNavigation();

  const [classDetail, setClassDetail] = useState([]);
  const [modal, setModal] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [classDetailId, setClassDetailId] = useState(0);
  const [allStudent, setAllStudent] = useState([]);
  const [codeName, setCodeName] = useState("");
  const [codeNameStudentId, setCodeNameStudentId] = useState("");

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const route = useRoute();
  const { classId } = route.params;
  // console.log(id);
  const show = () => setModal(true);
  const hide = () => setModal(false);

  const retrieveClassDetail = () => {
    let filterRole = { role: "student" };
    AprilService.getAllUsersByRole(filterRole).then((res) => {
      let temp = [];
      res.data.map((item) => {
        temp.push({ label: item.displayName, value: item._id });
      });
      // console.log(res.data._id);
      setAllStudent(temp);
      console.log(allStudent);
    });

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

  const postClassDetail = async () => {
    let data = {
      student: codeNameStudentId,
      classId: classId,
    };
    try {
      AprilService.postClassDetail(data);
    } catch (e) {
      console.log(e);
    }
    navigation.goBack();
  };

  // const postClassDetail = async () => {
  //   let filterCode = { codeName: codeName };
  //   let student = await AprilService.getUserByCodeName(filterCode);
  //   let studentData = student.data;
  //   console.log(studentData[0]);

  //   let data = {
  //     student: studentData[0]._id,
  //     classId: classId,
  //   };
  //   console.log("Đây là data");
  //   console.log(data);
  //   try {
  //     AprilService.postClassDetail(data);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   navigation.goBack();
  // };

  useEffect(() => {
    retrieveClassDetail();
  }, []);

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
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={allStudent}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select Student" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setCodeNameStudentId(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            {/* <View style={styles.modal}>
              <Text>StudentCode</Text>
              <TextInput
                placeholder="StudentCode"
                style={styles.textInput}
                onChangeText={setCodeName}
              />
            </View> */}
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 200,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddStudent;
