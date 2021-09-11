import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./../style/stylesApp";
import { UserContext } from "../Context";

const ButtonExit = () => {
  const context = useContext(UserContext);
  const { setUserid } = context;
  const navigation = useNavigation();

  const exit = () => {
    setUserid({});
    navigation.navigate("Login");
  };

  return (
    <View>
      <TouchableOpacity onPress={exit} style={styles.botonSalir}>
        <Text style={styles.textoSalir}>SALIR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonExit;
