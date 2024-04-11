import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TeacherClasses = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>
          Class_Id <Icon name="newspaper-outline" />
          <Icon name="create-outline" />
        </Text>
        <Text>
          Class_Id <Icon name="newspaper-outline" />
          <Icon name="create-outline" />
        </Text>
        <Text>
          Class_Id <Icon name="newspaper-outline" />
          <Icon name="create-outline" />
        </Text>
      </View>
      <View style={styles.create_new_class}>
        <Text>
          <Icon name="add-outline" /> Create New Class
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
  },
  login_input: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  create_new_class: {
    marginTop: 300,
    alignItems: "flex-end",
  },
});

export default TeacherClasses;
