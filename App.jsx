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
import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/base";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";

const Tab = createBottomTabNavigator();

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
    // <View>
    //   <Input></Input>
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
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
