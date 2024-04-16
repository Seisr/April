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
import MyModal from "../../components/MyModal.js";
const Subjects = () => {
  const [modal, setModal] = useState(false);
  const show = () => setModal(true);
  const hide = () => setModal(false);

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [subject2, setSubject2] = useState("");
  const [desc2, setDesc2] = useState("");
  const [modal2, setModal2] = useState([]);

  const show2 = (id) => {
    setModal2((prevModals) => ({
      ...prevModals,
      [id]: true,
    }));
  };

  const hide2 = (id) => {
    setModal2((prevModals) => ({
      ...prevModals,
      [id]: false,
    }));
  };
  const retrieveSubjects = () => {
    AprilService.getAllSubjects()
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteAlert = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this subject?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => AprilService.delSubjects(id) },
    ]);
  };

  const addNewSubject = () => {
    let data = {
      name: subject,
      description: desc,
    };
    AprilService.postSubjects(data);
    setModal(false);
  };

  const editSubject = (id) => {
    let data = {
      name: subject2,
      description: desc2,
    };
    AprilService.patchSubjects(id, data);
    hide2(id);
  };

  useEffect(() => {
    retrieveSubjects();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {subjects?.map((course, i) => {
          const modalVisible = modal2[course._id] || false;
          return (
            <SafeAreaView key={course._id}>
              <View style={styles.container}>
                <View style={styles.row}>
                  <Text style={styles.headerCell}>{course.code_name} </Text>
                  <Icon
                    name="create-outline"
                    style={styles.icon}
                    size={15}
                    onPress={() => show2(course._id)}
                  />
                  <Modal
                    visible={modalVisible}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    key={course._id}
                  >
                    <View>
                      <View style={styles.box}>
                        <Text>{course.code_name}</Text>
                        <View style={styles.modal}>
                          <Text style={styles.textName}>Subject</Text>
                          <TextInput
                            placeholder="Subject Name"
                            style={styles.textInput}
                            multiline={true}
                            onChangeText={setSubject2}
                          >
                            {course.name}
                          </TextInput>
                        </View>
                        <View style={styles.modal}>
                          <Text style={styles.textDes}>Description</Text>
                          <TextInput
                            placeholder="Learn about fundamental programming langugage"
                            style={styles.textDescription}
                            multiline={true}
                            onChangeText={setDesc2}
                          >
                            {course.description}
                          </TextInput>
                        </View>
                      </View>
                      <View style={styles.button1}>
                        <Button style={styles.button}>
                          <Text
                            style={styles.buttonText}
                            onPress={() => editSubject(course._id)}
                          >
                            Edit
                          </Text>
                        </Button>
                        <Button
                          style={styles.buttonCancel}
                          onPress={() => hide2(course._id)}
                        >
                          <Text style={styles.buttonText}>Cancel</Text>
                        </Button>
                      </View>
                    </View>
                  </Modal>
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
            Create New Subject
          </Text>
        </Button>
        <Modal
          visible={modal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View>
            <View style={styles.box}>
              <Text>Subject ID</Text>
              <View style={styles.modal}>
                <Text style={styles.textName}>Subject</Text>
                <TextInput
                  placeholder="Subject Name"
                  style={styles.textInput}
                  // multiline={true}
                  onChangeText={setSubject}
                />
              </View>
              <View style={styles.modal}>
                <Text style={styles.textDes}>Description</Text>
                <TextInput
                  placeholder="Learn about fundamental programming language"
                  style={styles.textDescription}
                  multiline={true}
                  onChangeText={setDesc}
                />
              </View>
            </View>
            <View style={styles.button1}>
              <Button style={styles.button} onPress={addNewSubject}>
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
    paddingTop: 5,
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
    // marginTop: 48,
    marginBottom: 12,
    marginRight: 10,
    width: 180,
  },
  button1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
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
  },
  textName: {
    marginLeft: 25,
  },
  textDes: {
    // marginLeft: 1,
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingLeft: 10,
    marginLeft: 10,
    marginVertical: 10,
    // marginRight: 10,
  },
  textDescription: {
    height: 200,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingLeft: 10,
    marginLeft: 10,
    marginVertical: 10,
  },
  box: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
});

export default Subjects;
