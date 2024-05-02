import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { Image, TouchableOpacity, Text } from "react-native";
import { user } from "../../setting";
import {
  Header as BaseHeader,
  HeaderBackButton,
} from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

export const Header = ({ mode, ...props }) => {
  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  const listImg = {
    admin: require("../assets/others/admin.png"),
    student: require("../assets/others/student.png"),
    teacher: require("../assets/others/teacher.png"),
  };
  const [currentUser, setUser] = React.useState(null);
  React.useEffect(() => {
    pickImage();
  }, []);
  // Function to pick profile image
  const pickImage = async () => {
    const currUser = JSON.parse(await SecureStore.getItemAsync(user));
    setImage(listImg[currUser.role]);
    setUser(currUser);
  };

  const handleProfile = async () => {
    navigation.navigate("ModifyUsers", { user: currentUser, _type: "profile" });
  };

  const HeaderLeft = () => {
    if (mode != "main") {
      return (
        navigation.canGoBack() && (
          <HeaderBackButton
            style={{ marginTop: 20, marginLeft: 10, fontWeight: "600" }}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )
      );
    }
    return (
      <TouchableOpacity>
        <Image
          style={{ width: 180, height: 50, marginTop: 25 }}
          source={require("../assets/others/school.gif")}
        />
      </TouchableOpacity>
    );
  };

  return (
    <BaseHeader
      headerStyle={{ height: 150, backgroundColor: "#F7C613" }}
      headerLeft={() => <HeaderLeft />}
      headerTitle={() => (
        <Text
          style={{ fontSize: 30, marginTop: 20, fontWeight: "600" }}
          {...props}
        />
      )}
      headerRight={() => (
        <TouchableOpacity onPress={handleProfile}>
          <Image
            style={{ width: 50, height: 50, marginTop: 25, marginRight: 40 }}
            source={image}
          />
        </TouchableOpacity>
      )}
    ></BaseHeader>
  );
};
