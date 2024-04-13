import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Main from "./src/screens/main/Main";
import Users from "./src/screens/users/Users";
import Subjects from "./src/screens/subject/Subjects";
import Classes from "./src/screens/class/Classes";
import CreateClass from "./src/screens/class/CreateClass";
import EnrollCourses from "./src/screens/class/EnrollCourses";
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Subjects" component={Subjects} />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen name="CreateClass" component={CreateClass} />
        <Stack.Screen name="EnrollCourses" component={EnrollCourses} />
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
