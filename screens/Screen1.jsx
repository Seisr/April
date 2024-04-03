import { Header } from "@rneui/base";
import React from "react";
import { Text, View } from "react-native";

const Screen1 = () => {
  return (
    <View>
      <Header centerComponent={{ text: "Màn hình 1" }} />
      <Text>Màn hình 1</Text>
    </View>
  );
};

export default Screen1;
