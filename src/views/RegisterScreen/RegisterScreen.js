import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import TextForm from "../../components/WTextInput";
import StyleStatics from '../../StyleStatics';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={style.view}>
      <Text>Register :D</Text>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    backgroundColor: StyleStatics.background,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },

})