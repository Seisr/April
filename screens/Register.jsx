import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/base";
import React from "react";
import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import Login from "./Login";

const Register = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.login}>
        <View style={styles.login_input}>
          <Input placeholder="Username"></Input>
          <Input placeholder="Password"></Input>
          <Input placeholder="Name"></Input>
          <Input placeholder="Role"></Input>
          <Button
            title="Register"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
});

export default Register;
