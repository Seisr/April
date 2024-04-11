import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/base";
import React, { useState } from "react";
import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Alert,
} from "react-native";
import ForgotPassword from "./ForgotPassword";
import AprilService from "../services/AprilServices";

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Usename or password is required");
      return;
    }
    try {
      // const res = await AprilService.login(data);
      // console.log(res);
      // sessionStorage.setItem("accessToken",res.data.result.accessToken
      // Alert.alert("Successful", "form submitted");
      navigation.navigate("Main");
    } catch (e) {
      console.log(e);
    }
  };

  // let role = "teacher";
  // let role = "student";
  let role = "admin";
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.login}>
        <View style={styles.login_input}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(text) => setUsername(text)}
          ></Input>
          <Input
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChange={(text) => setPassword(text)}
          ></Input>
          {/* <Button title="Login" onPress={() => navigation.navigate("Main")} /> */}
          <Button title="Login" onPress={handleSubmit} />
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
