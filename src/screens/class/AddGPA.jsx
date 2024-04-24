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

const AddGPA = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [midterm, setMidterm] = useState(0);
  const [practical, setPractical] = useState(0);
  const [final, setFinal] = useState(0);

  const { id } = route.params;

  const editGPA = () => {
    let data = {
      midTerm: Number(midterm),
      practical: Number(practical),
      final: Number(final),
    };
    console.log(data);
    console.log(id);
    try {
      AprilService.patchClassDetail(id, data);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
    console.log(id);
  };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.borderBox}>
            <Text style={styles.headerCell1}>Score</Text>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Midterm </Text>
              <TextInput
                id="midterm"
                placeholder="9"
                style={styles.textInput}
                onChangeText={setMidterm}
              ></TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Practical </Text>
              <TextInput
                id="practical"
                placeholder="9"
                style={styles.textInput}
                onChangeText={setPractical}
              ></TextInput>
            </View>
            <View style={styles.modal}>
              <Text style={styles.headerCell}>Final </Text>
              <TextInput
                id="final"
                placeholder="10"
                style={styles.textInput}
                onChangeText={setFinal}
              ></TextInput>
            </View>
          </View>
          <View style={styles.modal}>
            <Button style={styles.button} onPress={editGPA}>
              <Text style={styles.buttonText}>Edit GPA</Text>
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
export default AddGPA;
