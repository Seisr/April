import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AprilService } from "../../services/AprilServices";
import Button from "../../components/Button.js";
import { useNavigation } from "@react-navigation/native";

const TeacherClasses = () => {
  const [classDetail, setClassDetail] = useState([]);
  const [modal, setModal] = useState(false);
  const show = () => setModal(true);
  const hide = () => setModal(false);

  const navigation = useNavigation();

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
                    <Icon
                      name="document-outline"
                      style={styles.icon}
                      size={15}
                      onPress={() => navigation.navigate("AddStudent")}
                    />
                    <Icon name="create-outline" style={styles.icon} size={15} />
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
                <View>
                  <Text style={styles.headerCell1}>Class</Text>
                  <Text style={styles.headerCell}>Subject</Text>
                  <Text style={styles.headerCell}>Teacher</Text>
                  <Text style={styles.headerCell1}>Score Weight</Text>
                  <Text style={styles.headerCell}>Midterm </Text>
                  <Text style={styles.headerCell}>Practical </Text>
                  <Text style={styles.headerCell}>Final </Text>
                </View>
                <View style={styles.modal}>
                  <Button style={styles.button}>
                    <Text style={styles.buttonText}>Create Class</Text>
                  </Button>
                  <Button style={styles.buttonCancel} onPress={hide}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </Button>
                </View>
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
  headerCell1: {
    fontWeight: "bold",
    textAlign: "center",
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
