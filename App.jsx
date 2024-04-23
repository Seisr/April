import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Main from "./src/screens/Main";
import Users from "./src/screens/users/Users";
import Subjects from "./src/screens/subjects/Subjects";
import Classes from "./src/screens/class/Classes";
import CreateClass from "./src/screens/class/CreateClass";
import EnrollCourses from "./src/screens/class/EnrollCourses";
import TeacherClasses from "./src/screens/class/TeacherClasses";
import EnrollCoursesDetail from "./src/screens/class/EnrollCoursesDetail";
import AddStudent from "./src/screens/class/AddStudent";
import { Header, MainHeader } from "./src/components/PageHeader";
import StudentClasses from "./src/screens/class/StudentClasses";
import ModifyUsers from "./src/screens/users/ModifyUsers";
import EditClass from "./src/screens/class/EditClass";
import AddGPA from "./src/screens/class/AddGPA";
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            header: () => <Header mode="main">Main</Header>,
          }}
        />
        <Stack.Screen
          name="Users"
          component={Users}
          options={{
            header: () => <Header>Users</Header>,
          }}
        />
        <Stack.Screen name="Subjects" component={Subjects} />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen
          name="ModifyUsers"
          component={ModifyUsers}
          options={{
            header: () => <Header>Profile</Header>,
          }}
        />
        <Stack.Screen name="TeacherClasses" component={TeacherClasses} />
        <Stack.Screen name="StudentClasses" component={StudentClasses} />
        <Stack.Screen name="AddStudent" component={AddStudent} />
        <Stack.Screen name="AddGPA" component={AddGPA} />
        <Stack.Screen name="EditClass" component={EditClass} />
        <Stack.Screen name="CreateClass" component={CreateClass} />
        <Stack.Screen name="EnrollCourses" component={EnrollCourses} />
        <Stack.Screen
          name="EnrollCoursesDetail"
          component={EnrollCoursesDetail}
        />
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
