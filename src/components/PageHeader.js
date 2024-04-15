import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { Image, StyleSheet, Text, View } from "react-native";
import { user } from "../../setting";
import {
  Header as BaseHeader,
  HeaderBackButton,
} from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

export const Header = (props) => {
  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  React.useEffect(() => {
    pickImage();
  }, []);
  // Function to pick profile image
  const pickImage = async () => {
    const currUser = JSON.parse(await SecureStore.getItemAsync(user));
    setImage(currUser.image[0]);
  };
  return (
    <BaseHeader
      headerStyle={{ height: 150, backgroundColor: "#F7C613" }}
      headerLeft={() =>
        navigation.canGoBack() && (
          <HeaderBackButton
            style={{ marginTop: 20, marginLeft: 10, fontWeight: "600" }}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )
      }
      headerTitle={() => (
        <Text
          style={{ fontSize: 30, marginTop: 20, fontWeight: "600" }}
          {...props}
        />
      )}
      headerRight={() => (
        <Image
          style={{ width: 50, height: 50, marginTop: 25, marginRight: 40 }}
          source={{ uri: image }}
        />
      )}
    ></BaseHeader>
  );
};

export const MainHeader = (props) => {
  const [image, setImage] = React.useState(null);
  React.useEffect(() => {
    pickImage();
  }, []);
  // Function to pick profile image
  const pickImage = async () => {
    const currUser = JSON.parse(await SecureStore.getItemAsync(user));
    setImage(currUser.image[0]);
  };
  return (
    <BaseHeader
      headerStyle={{ height: 150, backgroundColor: "#F7C613" }}
      headerLeft={() => (
        <Image
          style={{ width: 180, height: 50, marginTop: 25 }}
          source={require("../assets/others/school.gif")}
        />
      )}
      headerTitle={() => (
        <Text
          style={{ fontSize: 30, marginTop: 20, fontWeight: "600" }}
          {...props}
        />
      )}
      headerRight={() => (
        <Image
          style={{ width: 50, height: 50, marginTop: 25, marginRight: 40 }}
          source={{ uri: image }}
        />
      )}
    ></BaseHeader>
  );
};
