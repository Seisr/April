import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Menu({ page }) {
  const navigation = useNavigation();
  const images = {
    Users: require("../assets/figmaComponents/Users.png"),
    Subjects: require("../assets/figmaComponents/Subjects.png"),
    Classes: require("../assets/figmaComponents/Classes.png"),
    CreateClass: require("../assets/figmaComponents/CreateClass.png"),
    EnrollCourses: require("../assets/figmaComponents/EnrollCourses.png"),
  };
  return (
    <TouchableOpacity title={page} onPress={() => navigation.navigate(page)}>
      <Image source={images[page]} style={styles.ImageIconStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ImageIconStyle: {
    padding: 10,
    margin: 15,
    height: 120,
    width: 214.89,
    resizeMode: "stretch",
    alignItems: "center",
  },
});
