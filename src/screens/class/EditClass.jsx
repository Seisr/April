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
import { useRoute } from "@react-navigation/native";

const EditClass = () => {
  const [classes, setClasses] = useState([]);
  const [modal, setModal] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [midterm, setMidterm] = useState(0);
  const [practical, setPractical] = useState(0);
  const [final, setFinal] = useState(0);
  const [regEndDate, setRegEndDate] = useState("");
  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    retrieveClassesById(id);
    // setUp(classes);
  }, []);
  // console.log(classes);
  const retrieveClassesById = (id) => {
    AprilService.getClassesById(id)
      .then((res) => {
        setClasses(res.data);
        setSubjectId(res.data.subject._id);
        setTeacherId(res.data.teacher._id);
        setMidterm(res.data.midTerm);
        setPractical(res.data.practical);
        setFinal(res.data.final);
        setRegEndDate(res.data.registrationEndDate.substring(0, 10));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editClasses = () => {
    let data = {
      subject: subjectId,
      teacher: teacherId,
      midTerm: Number(midterm),
      practical: Number(practical),
      final: Number(final),
      registrationEndDate: regEndDate,
    };
    console.log(data);
    console.log(classes._id);
    try {
      AprilService.patchClasses(id, data);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  // hide();

  return (
    // <Modal visible={modal} animationType="slide" presentationStyle="pageSheet">
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.borderBox}>
            <Text style={styles.headerCell1}>Class</Text>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Subject</Text>
              <TextInput
                id="subjectId"
                placeholder="Subject"
                style={styles.textInput}
                onChangeText={setSubjectId}
              >
                {classes._id}
              </TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Teacher</Text>
              <TextInput
                id="teacherId"
                placeholder="Teacher"
                style={styles.textInput}
                onChangeText={setTeacherId}
              >
                {classes.teacher?._id}
              </TextInput>
            </View>
            <Text style={styles.headerCell1}>Score Weight</Text>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Midterm </Text>
              <TextInput
                id="midterm"
                placeholder="20%"
                style={styles.textInput}
                onChangeText={setMidterm}
              >
                {classes.midTerm}
              </TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Practical </Text>
              <TextInput
                id="practical"
                placeholder="30%"
                style={styles.textInput}
                onChangeText={setPractical}
              >
                {classes.practical}
              </TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Final </Text>
              <TextInput
                id="final"
                placeholder="50%"
                style={styles.textInput}
                onChangeText={setFinal}
              >
                {classes.final}
              </TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Reg End Date </Text>
              <TextInput
                id="regEndDate"
                placeholder="2024-05-30"
                style={styles.textInput}
                onChangeText={setRegEndDate}
              >
                {classes.registrationEndDate?.substring(0, 10)}
              </TextInput>
            </View>
          </View>
          <View style={styles.modal}>
            <Button style={styles.button} onPress={editClasses}>
              <Text style={styles.buttonText}>Edit Class</Text>
            </Button>
            <Button
              style={styles.buttonCancel}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
    // </Modal>
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
export default EditClass;
