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
import { Dropdown } from "react-native-element-dropdown";
import * as SecureStore from "expo-secure-store";
import { user } from "../../../setting";
import { Context } from "../Main.jsx";

const TeacherClasses2 = () => {
  const [classes, setClasses] = useState([]);
  const [modal, setModal] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [midterm, setMidterm] = useState(0);
  const [practical, setPractical] = useState(0);
  const [final, setFinal] = useState(0);
  const [regEndDate, setRegEndDate] = useState("");
  const [allTeacher, setAllTeacher] = useState("");
  const [allSubjects, setAllSubjects] = useState("");
  const [codeNameTeacherId, setCodeNameTeacherId] = useState("");
  const [codeNameSubjectId, setCodeNameSubjectId] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [userId, setUserId] = useState(userId1);

  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);

  const { UID } = React.useContext(Context);
  const [userId1, setUserId1] = UID;
  console.log(` đây ${userId1}`);

  const show = () => setModal(true);
  const hide = () => setModal(false);

  const navigation = useNavigation();

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[styles.label, isFocus && { color: "blue" }]}></Text>;
    }
    return null;
  };

  const getUserId = async () => {
    const currUser = await JSON.parse(SecureStore.getItemAsync(user));
    setUserId(currUser._id);
    // console.log(currUser);
  };

  //   console.log(`đây là props ${userId1}`);
  //   console.log(`đây là userId ${userId}`);

  const renderLabel1 = () => {
    if (value1 || isFocus1) {
      return (
        <Text style={[styles.label, isFocus1 && { color: "blue" }]}></Text>
      );
    }
    return null;
  };

  const retrieveClasses = async () => {
    // const currUser = JSON.parse(await SecureStore.getItemAsync(user));
    // console.log(currUser.userId);
    // console.log(userId);
    // let userId2 = userId1;
    let filterByUserId = { teacher: userId1 };
    console.log(` đây222 ${userId1}`);

    await AprilService.getAllClassesByUserId(filterByUserId)
      .then((res) => {
        setClasses(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    let filterRole = { role: "teacher" };
    await AprilService.getAllUsersByRole(filterRole).then((res) => {
      let temp = [];
      res.data.map((item) => {
        temp.push({ label: item.displayName, value: item._id });
      });
      setAllTeacher(temp);
    });

    // AprilService.getAllClasses()
    //   .then((res) => {
    //     setClasses(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  const retrieveSubjects = async () => {
    await AprilService.getAllSubjects().then((res) => {
      let temp = [];
      res.data.map((item) => {
        temp.push({ label: item.name, value: item._id });
      });
      setAllSubjects(temp);
      console.log(allSubjects);
    });
  };

  const postClasses = () => {
    let data = {
      subject: codeNameSubjectId,
      teacher: codeNameTeacherId,
      midTerm: Number(midterm),
      practical: Number(practical),
      final: Number(final),
      registrationEndDate: regEndDate,
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
    // getUserId();
    setTimeout(() => {
      retrieveClasses();
    }, 2000);
    setUserId(userId1);
  }, [classes, userId]);

  useEffect(() => {
    retrieveSubjects();
  }, []);
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
                    {/* <Text style={styles.headerCell}>{course.subject.name}</Text> */}
                    {/* <Text style={styles.headerCell}>{course._id}</Text> */}
                    <View style={styles.row3}>
                      <Icon
                        name="document-outline"
                        style={styles.icon}
                        size={15}
                        onPress={() =>
                          navigation.navigate("AddStudent", {
                            classId: course._id,
                          })
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
                  <Text style={styles.headerCell2}>Subject</Text>
                  {/* <TextInput
                    placeholder="Subject"
                    style={styles.textInput}
                    onChangeText={setSubjectId}
                  /> */}
                  <View style={styles.modal}>
                    {renderLabel1()}
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus1 && { borderColor: "blue" },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={allSubjects}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus1 ? "Select Subject" : "..."}
                      searchPlaceholder="Search..."
                      value={value1}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item.value);
                        setCodeNameSubjectId(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell2}>Teacher</Text>
                  {/* <TextInput
                    placeholder="Teacher"
                    style={styles.textInput}
                    onChangeText={setTeacherId}
                  /> */}
                  <View style={styles.modal}>
                    {renderLabel()}
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: "blue" },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={allTeacher}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? "Select Teacher" : "..."}
                      searchPlaceholder="Search..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item.value);
                        setCodeNameTeacherId(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>

                <Text style={styles.headerCell1}>Score Weight</Text>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Midterm </Text>
                  <TextInput
                    placeholder="0.2"
                    style={styles.textInput}
                    onChangeText={setMidterm}
                  />
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Practical </Text>
                  <TextInput
                    placeholder="0.3"
                    style={styles.textInput}
                    onChangeText={setPractical}
                  />
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Final </Text>
                  <TextInput
                    placeholder="0.5"
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
      {/* <Button style={styles.button}>
        <Text style={styles.buttonText} onPress={show}>
          Create New Class
        </Text>
      </Button> */}

      {/* <Modal
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
                  <Text style={styles.headerCell2}>Subject</Text>
                  <View style={styles.modal}>
                    <View style={styles.modal}>
                      {renderLabel1()}
                      <Dropdown
                        style={[
                          styles.dropdown,
                          isFocus && { borderColor: "blue" },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allSubjects}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? "Select Subject" : "..."}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                          setValue(item.value);
                          setCodeNameTeacherId(item.value);
                          setIsFocus(false);
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.modal}>
                    {renderLabel1()}
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus1 && { borderColor: "blue" },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={allSubjects}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus1 ? "Select Subject" : "..."}
                      searchPlaceholder="Search..."
                      value={value1}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item.value);
                        setCodeNameSubjectId(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
    
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell2}>Teacher</Text>

                  <View style={styles.modal}>
                    {renderLabel()}
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: "blue" },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={allTeacher}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? "Select Teacher" : "..."}
                      searchPlaceholder="Search..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item.value);
                        setCodeNameTeacherId(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>

                <Text style={styles.headerCell1}>Score Weight</Text>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Midterm </Text>
                  <TextInput
                    placeholder="0.2"
                    style={styles.textInput}
                    onChangeText={setMidterm}
                  />
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Practical </Text>
                  <TextInput
                    placeholder="0.3"
                    style={styles.textInput}
                    onChangeText={setPractical}
                  />
                </View>
                <View style={styles.modal}>
                  <Text style={styles.headerCell}>Final </Text>
                  <TextInput
                    placeholder="0.5"
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
      </Modal> */}
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
    margin: 2,
  },
  headerCell2: {
    fontWeight: "bold",
    margin: 50,
  },
  headerCell1: {
    fontWeight: "bold",
    textAlign: "center",
  },
  headerCell2: {
    justifyContent: "space-between",
    fontWeight: "bold",
    margin: 25,
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
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    // paddingVertical: 1,
  },
  gpa: {
    marginLeft: 15,
    // paddingHorizontal: 1,
  },
  icon: {
    paddingLeft: 10,
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 200,
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

export default TeacherClasses2;
