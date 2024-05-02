import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput as BaseTextInput,
} from "react-native";
import { AprilService } from "../../services/AprilServices";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const User = ({ user }) => {
  const navigation = useNavigation();
  const [avt, setAvt] = useState(null);
  const listImg = {
    admin: require("../../assets/others/admin.png"),
    student: require("../../assets/others/student.png"),
    teacher: require("../../assets/others/teacher.png"),
  };
  useEffect(() => {
    setAvt(listImg[user.role]);
  });

  return (
    <View style={styles.user}>
      <View style={styles.userLeft}>
        <Image style={styles.userLeftImg} source={avt} />
      </View>
      <View style={styles.userMiddle}>
        <Text style={styles.codeName}>{user.codeName}</Text>
        <Text style={styles.displayName}>{user.displayName}</Text>
      </View>
      <View style={styles.userRight}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ModifyUsers", {
              user: user,
              _type: "update",
            });
          }}
        >
          <Image
            style={styles.userRightImg}
            source={require("../../assets/figmaComponents/Edit.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Users = ({}) => {
  const roleList = [
    { label: "Student", value: "student" },
    { label: "Admin", value: "admin" },
    { label: "Teacher", value: "teacher" },
  ];
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedRole, setSelectedRole] = useState(roleList[0].value);
  const [noti, setNoti] = useState("");
  const [error, setError] = useState("");
  const isFocused = useIsFocused();
  useEffect(() => {
    getUserList();
  }, []);
  useEffect(() => {
    isFocused && getUserList();
  }, [isFocused]);

  const getUserList = async () => {
    setUsers((await AprilService.getAllUsers()).data);
  };
  const handleCreateNewUser = async () => {
    try {
      if (!email) {
        setError("Email is required.");
        return;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Email is invalid.");
        return;
      }

      await AprilService.postUser({
        email,
        displayName,
        role: selectedRole,
      });
      setNoti("User created successfully !");
      setError("");
      getUserList();
    } catch (error) {
      console.log(error);
      setError("Email already exists !");
      setNoti("");
    }
  };
  const Notification = () => {
    if (noti) {
      return (
        <Text
          style={{
            color: "#B2C75D",
            alignSelf: "center",
            marginTop: 20,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {noti}
        </Text>
      );
    } else if (error) {
      return (
        <Text
          style={{
            color: "#FF425A",
            alignSelf: "center",
            marginTop: 20,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {error}
        </Text>
      );
    }
    return <Text>{""}</Text>;
  };
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}
    >
      <View style={styles.container}>
        <ScrollView style={styles.main}>
          {users.map((user, index) => (
            <User user={user} key={index} />
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              setModal(true);
            }}
          >
            <View style={styles.footerChild}>
              <View style={styles.footerLeft}>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require("../../assets/figmaComponents/Add.png")}
                />
              </View>
              <View style={styles.footerRight}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                  }}
                >
                  Create new User
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View>
          <View style={styles.containerModel}>
            <View style={styles.borderBox}>
              <Text style={styles.headerCell1}>Create New User</Text>
              <View style={styles.modal}>
                <Text style={styles.headerCell}>Email</Text>
                <BaseTextInput
                  placeholder="Email"
                  style={styles.textInput}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.modal}>
                <Text style={styles.headerCell}>Name</Text>
                <BaseTextInput
                  placeholder="Name"
                  style={styles.textInput}
                  onChangeText={setDisplayName}
                />
              </View>
              <View style={styles.modal}>
                <Text style={styles.headerCell}>Role</Text>
                <Picker
                  selectedValue={selectedRole}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedRole(itemValue)}
                >
                  {roleList.map((roleMap, index) => {
                    return (
                      <Picker.Item
                        label={roleMap.label}
                        value={roleMap.value}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreateNewUser}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => {
                  setModal(false);
                  setError("");
                  setNoti("");
                }}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Notification />
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  user: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#F7C613",
    borderRadius: 15,
  },
  userLeft: {
    flex: "25%",
    alignItems: "center",
  },
  userLeftImg: {
    width: 50,
    height: 50,
  },
  userMiddle: {
    flex: "60%",
  },
  userRight: {
    flex: "15%",
    justifyContent: "center",
  },
  userRightImg: {
    width: 24,
    height: 24,
  },
  codeName: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },
  footer: {
    padding: 10,
    paddingBottom: 20,
    marginBottom: 30,
  },
  footerChild: {
    paddingLeft: 30,
    flexDirection: "row",
  },
  footerLeft: {
    flex: "20%",
    // alignItems: "center",
  },
  footerRight: {
    flex: "80%",
    justifyContent: "center",
  },
  modal: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
  },
  containerModel: {
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
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // paddingVertical: 1,
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
  picker: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default Users;
