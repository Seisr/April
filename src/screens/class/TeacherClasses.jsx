import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  View,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AprilService } from "../../services/AprilServices";
import Button from "../../components/Button.js";
import { useNavigation } from "@react-navigation/native";

const TeacherClasses = () => {
  const [classes, setClasses] = useState([]);
  const [modal, setModal] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [midterm, setMidterm] = useState(0);
  const [practical, setPractical] = useState(0);
  const [final, setFinal] = useState(0);
  const [regEndDate, setRegEndDate] = useState("");

  const show = () => setModal(true);
  const hide = () => setModal(false);

  const navigation = useNavigation();

  const retrieveClasses = () => {
    AprilService.getAllClasses()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const postClasses = () => {
    let data = {
      subject: subjectId,
      teacher: teacherId,
      midTerm: parseFloat(midterm),
      practical: parseFloat(practical),
      final: parseFloat(final),
      regEndDate: regEndDate,
    };
    console.log(data);
    try {
      AprilService.postClasses(data);
    } catch (e) {
      console.log(e);
    }

    hide();
  };

  useEffect(() => {
    retrieveClasses();
  });

  const deleteAlert = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this subject?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => AprilService.delClasses(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {classes !== undefined &&
          classes?.map((course, i) => {
            return (
              <SafeAreaView key={i}>
                <View style={styles.container}>
                  <View style={styles.row2}>
                    <Text style={styles.headerCell}>{course.codeName}</Text>
                    {/* <Text style={styles.headerCell}>{course._id}</Text> */}
                    <Icon
                      name="document-outline"
                      style={styles.icon}
                      size={15}
                      onPress={() =>
                        navigation.navigate("AddStudent", { id: course._id })
                      }
                    />
                    <Icon
                      name="create-outline"
                      style={styles.icon}
                      size={15}
                      onPress={() =>
                        navigation.navigate("EditClass", { id: course._id })
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
      </View>
      <Button style={styles.button}>
        <Text style={styles.buttonText} onPress={show}>
          Create New Class
        </Text>
      </Button>
      <Modal
        visible={modal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View>
          <SafeAreaView>
            <View style={styles.container}>
              <View style={styles.borderBox}>
                <Text style={styles.headerCell1}>Class</Text>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Subject</Text>
                  <TextInput
                    placeholder="Subject"
                    style={styles.textInput}
                    onChangeText={setSubjectId}
                  />
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Teacher</Text>
                  <TextInput
                    placeholder="Teacher"
                    style={styles.textInput}
                    onChangeText={setTeacherId}
                  />
                </View>
                <Text style={styles.headerCell1}>Score Weight</Text>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Midterm </Text>
                  <TextInput
                    placeholder="20%"
                    style={styles.textInput}
                    onChangeText={setMidterm}
                  />
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Practical </Text>
                  <TextInput
                    placeholder="30%"
                    style={styles.textInput}
                    onChangeText={setPractical}
                  />
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Final </Text>
                  <TextInput
                    placeholder="50%"
                    style={styles.textInput}
                    onChangeText={setFinal}
                  />
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Reg End Date </Text>
                  <TextInput
                    placeholder="2024-05-30"
                    style={styles.textInput}
                    onChangeText={setRegEndDate}
                  />
                </View>
              </View>
              <View style={styles.modal}>
                <Button style={styles.button} onPress={postClasses}>
                  <Text style={styles.buttonText}>Create Class</Text>
                </Button>
                <Button style={styles.buttonCancel} onPress={hide}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
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
    justifyContent: "space-between",
    margin: 10,
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
    margin: 10,
  },
  headerCell1: {
    fontWeight: "bold",
    textAlign: "center",
  },
  headerCell2: {
    justifyContent: "space-between",
    fontWeight: "bold",
    margin: 10,
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
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // paddingVertical: 1,
  },
  gpa: {
    marginLeft: 15,
    // paddingHorizontal: 1,
  },
  icon: {
    paddingLeft: 20,
    paddingTop: 11,
  },
  button: {
    backgroundColor: "#F7C613",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 12,
    width: 180,
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
    width: 180,
    marginLeft: 10,
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

export default TeacherClasses;
