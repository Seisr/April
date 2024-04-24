import { useNavigation } from "@react-navigation/native";
import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Background from "../components/Background";
import { AprilService } from "../services/AprilServices";
import * as SecureStore from "expo-secure-store";
import { accessToken } from "../../setting";
import { isAuthorzied } from "../services/Auth";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoginValid, setIsLoginValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const validateLogin = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    setErrors(errors);
    setIsLoginValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    let errors = {};
    validateLogin();
    if (!isLoginValid) {
      errors.message = "Email or password is invalid!";
      return;
    }
    try {
      const res = await AprilService.login(email, password);
      await SecureStore.setItemAsync(accessToken, res.data.result.accessToken);
      if (await isAuthorzied()) {
        console.log("Login successfully!");
        navigation.navigate("Main");
        return;
      }
    } catch (error) {
      console.log(error);
    }
    errors.message = "Email or password is invalid!";
    setErrors(errors);
  };

  const handleForgotPassword = async () => {
    let errors = {};
    if (!isFormValid) {
      console.log("Email is invalid!");
      return;
    }
    try {
      const res = await AprilService.forgotPassword(email);
      if (res.status == 200) {
        errors.message = `New password had been sent to ${email}`;
        setErrors(errors);
        return;
      }
    } catch (error) {}
    errors.message = "The email provided is either invalid or not registered.!";
    setErrors(errors);
  };

  return (
    <ImageBackground
      source={require("../assets/Login.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <Background style={{ justifyContent: "center" }}>
        <Header style={styles.header}>Welcome to April</Header>
        <Text style={styles.underHeaderText}>
          Please login to your account !
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
          disabled={!isFormValid}
          onPress={handleSubmit}
          // onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            disabled={!isFormValid}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        {/* Display error messages */}
        {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            {error}
          </Text>
        ))}
      </Background>
    </ImageBackground>
    // </TouchableWithoutFeedback>
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
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F7C613",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: "#023047",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 12,
  },
  forgotPassword: {
    fontSize: 16,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 32,
    color: "#023047",
    fontWeight: "bold",
    paddingVertical: 12,
  },
  underHeaderText: {
    fontSize: 15,
    marginBottom: 50,
  },
});

export default Login;
