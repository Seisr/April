import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput as BaseTextInput,
  Alert,
} from "react-native";
import { React, useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import * as SecureStore from "expo-secure-store";
import { user as userKey } from "../../../setting";
import { AprilService } from "../../services/AprilServices";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const ModifyUsers = ({ route }) => {
  const navigation = useNavigation();
  const roleList = [
    { label: "Student", value: "student" },
    { label: "Admin", value: "admin" },
    { label: "Teacher", value: "teacher" },
  ];

  const { user, _type } = route.params;
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  //   const [role, setRole] = useState("");
  const [currUser, setCurrUser] = useState(null);
  const [noti, setNoti] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roleList[0].value);
  const imgList = {
    save: require("../../assets/figmaComponents/Save.png"),
    trash: require("../../assets/figmaComponents/Trash.png"),
    signout: require("../../assets/figmaComponents/SignOut.png"),
  };

  useEffect(() => {
    if (user) {
      getCurrentUser(user);
    }
    if (_type == "profile") {
    }
  }, []);

  const getCurrentUser = async () => {
    let res = {};
    if (_type == "profile") {
      res = await AprilService.getMe();
    } else {
      res = await AprilService.getUserById(user._id);
    }
    setCurrUser(res.data);
    setEmail(res.data.email);
    setDisplayName(res.data.displayName);
    displayRole(res.data);
    setImage(res.data.image);
  };

  const displayRole = (user) => {
    roleList.map((roleMap) => {
      if (roleMap.value == user.role) {
        setSelectedRole(roleMap.value);
      }
    });
  };

  const handleSave = async () => {
    switch (_type) {
      case "profile":
        try {
          res = await AprilService.updateMe({ displayName: displayName });
          setDisplayName(res.data.displayName);
          setNoti("User Information Updated !");
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        try {
          res = await AprilService.patchUser(currUser._id, {
            displayName: displayName,
            role: selectedRole,
          });
          setDisplayName(res.data.displayName);
          setSelectedRole(res.data.role);
          setNoti("User Information Updated!");
        } catch (error) {
          console.log(error);
        }
    }
  };

  const handleDelete = async () => {
    await AprilService.delUser(currUser._id);
    navigation.navigate("Users");
  };

  const handleChangePassword = async () => {
    try {
      res = await AprilService.updateMe({
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      setNoti("Password has been successfully changed !");
      setModal(false);
    } catch (error) {
      console.log(error);
      setError("Wrong Current Password !");
      setNoti("");
      setModal(false);
    }
  };
  const deleteAlert = async () =>
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await handleDelete();
        },
      },
    ]);

  const handleSignOut = async () =>
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await SecureStore.deleteItemAsync(userKey);
          navigation.navigate("Login");
        },
      },
    ]);

  const RightButton = () => {
    if (_type != "profile")
      return (
        <TouchableOpacity style={styles.trash} onPress={deleteAlert}>
          <Image style={{ width: 50, height: 50 }} source={imgList.trash} />
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity
        style={styles.changePass}
        onPress={() => {
          setModal(true);
        }}
      >
        <Text style={styles.changePassText}>Change Password</Text>
      </TouchableOpacity>
    );
  };

  const RoleElement = () => {
    if (_type == "profile") {
      return (
        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Role"
          value={
            selectedRole &&
            roleList.filter((x) => x.value == selectedRole)[0].label
          }
        />
      );
    }
    return (
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedRole}
          onValueChange={(itemValue) => setSelectedRole(itemValue)}
        >
          {roleList.map((roleMap) => (
            <Picker.Item
              key={roleMap.value}
              label={roleMap.label}
              value={roleMap.value}
            />
          ))}
        </Picker>
      </View>
    );
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
        <View style={styles.containerCodeName}>
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.codeName}>{user.codeName}</Text>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={[styles.input, { marginTop: 20 }]}
            placeholder="Email"
            value={email}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Display Name"
            value={displayName}
            onChangeText={setDisplayName}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.title}>{"Role  "}</Text>
          <RoleElement />
        </View>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.save} onPress={handleSave}>
          <Image style={{ width: 50, height: 50 }} source={imgList.save} />
        </TouchableOpacity>
        <RightButton />
      </View>
      <Notification />
      <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
        <View style={styles.containerSignOut}>
          <Image style={{ width: 40, height: 40 }} source={imgList.signout} />
          <View style={styles.signOut}>
            <Text style={styles.signOutText}>Logout</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        visible={modal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View>
          <View style={styles.containerModel}>
            <View style={styles.borderBox}>
              <Text style={styles.headerCell1}>Change Password</Text>
              <View style={styles.modal}>
                <Text style={styles.headerCell}>Current Password</Text>
                <BaseTextInput
                  placeholder="Current Password"
                  style={styles.textInput}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                />
              </View>
              <View style={styles.modal}>
                <Text style={styles.headerCell}>New Password</Text>
                <BaseTextInput
                  placeholder="New Password"
                  style={styles.textInput}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </View>
            </View>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleChangePassword}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => {
                  setModal(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    margin: 10,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0,
    backgroundColor: "#023047",
    justifyContent: "space-between",
  },
  containerCodeName: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "black",
  },
  codeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 30,
  },
  title: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: "#F2BA1D",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 40,
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40,
    alignItems: "center",
  },
  save: {
    backgroundColor: "#F2BA1D",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    flex: "50%",
    marginRight: 30,
  },
  trash: {
    flex: 1,
    backgroundColor: "#BFBFBF",
    borderRadius: 5,
    flex: "50%",
    alignItems: "center",
    padding: 10,
  },
  changePass: {
    flex: 1,
    backgroundColor: "#023047",
    borderRadius: 5,
    flex: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  containerButton: {
    flexDirection: "row",
    padding: 10,
    marginTop: 30,
  },
  changePassText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
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
    flex: 1,
    borderWidth: 1,
    borderColor: "#F2BA1D",
    width: "100%",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  containerSignOut: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 250,
    alignContent: "center",
  },
  signOut: {
    justifyContent: "center",
  },

  signOutText: {
    fontWeight: "500",
    color: "#6F6F70",
  },
});

export default ModifyUsers;
