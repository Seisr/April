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
const EnrollCoursesDetail = () => {
  const [classes, setClasses] = useState([]);
  const [userId, setUserId] = useState("");
  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params;
  const retrieveClasses = () => {
    AprilService.getAllClasses()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getUserId = async () => {
    const currUser = JSON.parse(await SecureStore.getItemAsync(user));
    setUserId(currUser.userId);
  };

  const postClassDetail = () => {
    let data = {
      student: userId,
      class: id,
    };
    AprilService.postClassDetail(data);
    navigation.goBack();
  };

  useEffect(() => {
    retrieveClasses();
  }, []);
  return (
    <View>
      <Text></Text>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.borderBox}>
            <Text style={styles.headerCell1}>Class</Text>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Subject</Text>
              <TextInput
                placeholder="Subject"
                style={styles.textInput}
                editable={false}
              >
                {classes[id]?.subject.name}
              </TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Teacher</Text>
              <TextInput
                placeholder="Teacher"
                style={styles.textInput}
                editable={false}
              >
                {/* {classes[id].teacclasses[id]?.teacher} */}
              </TextInput>
            </View>
            <Text style={styles.headerCell1}>Score Weight</Text>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Midterm </Text>
              <TextInput
                placeholder="20%"
                style={styles.textInput}
                editable={false}
              >
                {classes[id]?.midTerm}
              </TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Practical </Text>
              <TextInput
                placeholder="30%"
                style={styles.textInput}
                editable={false}
              >
                {classes[id]?.practical}
              </TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Final </Text>
              <TextInput
                placeholder="50%"
                style={styles.textInput}
                editable={false}
              >
                {classes[id]?.final}
              </TextInput>
            </View>
          </View>
          <View style={styles.modal}>
            <Button style={styles.button} onPress={postClassDetail}>
              <Text style={styles.buttonText}>Enroll</Text>
            </Button>
            <Button
              style={styles.buttonCancel}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
    // <SafeAreaView>
    //   <View style={styles.container}>
    //     <View style={styles.borderBox}>
    //       <Text style={styles.headerCell1}>Class</Text>
    //       <Text style={styles.headerCell}>Subject</Text>
    //       <Text style={styles.headerCell}>Teacher</Text>
    //       <Text style={styles.headerCell1}>Score Weight</Text>
    //       <Text style={styles.headerCell}>Midterm </Text>
    //       <Text style={styles.headerCell}>Practical </Text>
    //       <Text style={styles.headerCell}>Final </Text>
    //       <Button
    //         style={styles.button}
    //         // disabled={!isFormValid}
    //         // onPress={handleSubmit}
    //       >
    //         <Text style={styles.buttonText}>Enroll</Text>
    //       </Button>
    //     </View>
    //     {/* <View style={styles.row1}>
    //       <Text>{"                                 "}</Text>
    //       <Text style={styles.gpa}> </Text>
    //       <Text style={styles.gpa}> </Text>
    //       <Text style={styles.gpa}></Text>
    //       <Text style={styles.gpa}></Text>
    //     </View> */}
    //   </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
    height: "100%",
  },
  modal: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  headerCell: {
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  headerCell1: {
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    // flexDirection: "row",
    // borderBottomWidth: 1,
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
  borderBox: {
    // width: 200,
    // height: 150,
    // borderWidth: 1, // Border width
    // borderColor: "black", // Border color
    // borderStyle: "solid", // Border style: solid, dashed, or dotted
    // borderRadius: 10,
  },
  button: {
    backgroundColor: "#F7C613",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    // marginTop: 48,
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
export default EnrollCoursesDetail;
