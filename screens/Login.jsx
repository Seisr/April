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
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const navigation = useNavigation();
  // let role = "teacher";
  // let role = "student";
  let role = "admin";
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.login}>
        <View style={styles.login_input}>
          <Input placeholder="Username"></Input>
          <Input placeholder="Password"></Input>
          <Button title="Login" onPress={() => navigation.navigate("Main")} />
          <Text onPress={() => navigation.navigate("ForgotPassword")}>
            Forgot password?
          </Text>
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

export default Login;
