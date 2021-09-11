import React, { useContext, useState } from "react";
import { styles } from "./../style/Login";
import { TouchableOpacity, Text, View, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../Context";

const Login = () => {
  let REACT_APP_API = "http://localhost:3000";
  const context = useContext(UserContext);

  const { setUserid } = context;

  const navigation = useNavigation();
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
        style={styles.tinyLogo}
        source={{
          uri: "https://github.com/andresf2448/Exchange-ProyectoFinal/raw/main/client/rocketXchange-logos/rocketXchange-logos_white.png",
        }}
      />

      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="USUARIO"
          placeholderTextColor="white"
          value={user}
          onChangeText={setUser}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="CONTRASEÑA"
          placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={handleSumit} style={styles.button}>
        <Text style={styles.texto}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.register}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.button}
        >
          <Text style={styles.texto}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
