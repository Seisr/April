import { StatusBar } from "expo-status-bar";
import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/base";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import HomeAdmin from "./screens/Admin/HomeAdmin";
import HomeStudent from "./screens/Student/HomeStudent";
import HomeTeacher from "./screens/Teacher/HomeTeacher";
import ForgotPassword from "./screens/ForgotPassword";
import Register from "./screens/Register";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="HomeTeacher" component={HomeTeacher} />
        <Stack.Screen name="HomeStudent" component={HomeStudent} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
