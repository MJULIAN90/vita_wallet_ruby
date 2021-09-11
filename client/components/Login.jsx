import React, { useContext, useState } from "react";
import { TouchableOpacity, Text, View, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../Context";
import { REACT_APP_API } from "../api/api";
import { styles, loginRegister } from "./../style/stylesApp";

const Login = () => {
  const context = useContext(UserContext);
  const navigation = useNavigation();
  const { setUserid } = context;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSumit = async () => {
    if (user !== "" && password !== "") {
      let response = await axios.post(`${REACT_APP_API}/user/login`, {
        username: user,
        password: password,
      });

      response = response.data.Response;

      if (response === "Clave invalidad") return alert("CLAVE INVALIDA");
      if (response === "Usuario no existe") return alert("USUARIO NO EXISTE");
      if (typeof response === "number") {
        setUserid(response);
        setUser("");
        setPassword("");
        return navigation.navigate("Home", { data: response });
      }
    }
    alert("COMPLETE LOS CAMPOS");
  };

  return (
    <View style={styles.inicial}>
      <Image
        style={loginRegister.tinyLogo}
        source={{
          uri: "https://github.com/andresf2448/Exchange-ProyectoFinal/raw/main/client/rocketXchange-logos/rocketXchange-logos_white.png",
        }}
      />

      <View style={loginRegister.container}>
        <TextInput
          style={loginRegister.inputs}
          placeholder="USUARIO"
          placeholderTextColor="white"
          value={user}
          onChangeText={setUser}
        />

        <TextInput
          secureTextEntry={true}
          style={loginRegister.inputs}
          placeholder="CONTRASEÑA"
          placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={handleSumit} style={loginRegister.button}>
        <Text style={loginRegister.texto}>Entrar</Text>
      </TouchableOpacity>

      <View style={loginRegister.register}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={loginRegister.button}
        >
          <Text style={loginRegister.texto}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
