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
import LoginAdmin from "./screens/Admin/LoginAdmin";
import HomeAdmin from "./screens/Admin/HomeAdmin";
import HomeStudent from "./screens/Student/HomeStudent";
import HomeTeacher from "./screens/Admin/HomeTeacher";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    /* <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="screen1" component={Screen1} />
            <Tab.Screen name="screen2" component={Screen2} />
          </Tab.Navigator>
        </NavigationContainer> */
    // <View style={styles.container}>
    //   <SafeAreaView></SafeAreaView>
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginAdmin" component={LoginAdmin} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="HomeTeacher" component={HomeTeacher} />
        <Stack.Screen name="HomeStudent" component={HomeStudent} />
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
