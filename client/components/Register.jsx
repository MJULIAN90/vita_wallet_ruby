import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./../style/Register";
import axios from "axios";

const Register = () => {
  let REACT_APP_API = "http://localhost:3000";
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSumit = async () => {
    if (password === password2) {
      let create = await axios.post(`${REACT_APP_API}/user/create`, {
        username: user,
        password: password,
      });

      if (create.data.Response === "Usuario Existe") {
        alert("USUARIO YA REGISTRADO");
        return navigation.navigate("Login");
      }

      if (create.data.Response === "Usuario Creado") {
        alert("USUARIO CREADO");
        return navigation.navigate("Login");
      }
    }

    return alert("TU CONTRASEÑA DEBE TENER MINIMO 6 CARACTERES");
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
          placeholder="NUEVO USUARIO"
          placeholderTextColor="white"
          value={user}
          onChangeText={setUser}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="NUEVA CONTRASEÑA"
          placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="CONFIRME LA CONTRASEÑA"
          placeholderTextColor="white"
          value={password2}
          onChangeText={setPassword2}
        />
      </View>
      {password !== "" && password === password2 ? (
        <TouchableOpacity onPress={handleSumit} style={styles.button}>
          <Text style={styles.texto}>COMPLETAR</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={true}
          onPress={handleSumit}
          style={styles.button2}
        >
          <Text style={styles.texto}>COMPLETAR</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={styles.texto}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
