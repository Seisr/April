import React, { useState } from "react";
import { View, Button, Modal, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyModal = ({ course }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const show2 = () => setModalVisible(true);
  const hide2 = () => setModalVisible(false);
  return (
    <SafeAreaView key={course._id}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>{course.code_name} </Text>
          <Icon
            name="create-outline"
            style={styles.icon}
            size={15}
            onPress={show2}
          />
          <MyModal
            visible={modal2}
            animationType="slide"
            presentationStyle="pageSheet"
            key={course._id}
            course={course}
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
                  >
                    {course.description}
                  </TextInput>
                </View>
              </View>
              <View style={styles.button1}>
                <Button style={styles.button}>
                  <Text style={styles.buttonText}>Edit</Text>
                </Button>
                <Button style={styles.buttonCancel} onPress={hide2}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Button>
              </View>
            </View>
          </MyModal>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default MyModal;
