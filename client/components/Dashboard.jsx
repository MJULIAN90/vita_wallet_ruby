import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import axios from "axios";
import { REACT_APP_API } from "../api/api";
import { dashboard, styles } from "./../style/stylesApp";
import { conversor } from "../conversor/conversor";
import ButtonExit from "./ButtonExit";

const Dashboard = () => {
  const [state, setstate] = useState(false);

  const api = async () => {
    let price = await axios.get(`${REACT_APP_API}/price`);
    let priceApi = price.data.response;
    priceApi = conversor("usd", priceApi);
    setstate(priceApi);
  };

  useEffect(() => {
    var time = setInterval(api, 4000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <View style={dashboard.inicio}>
      <ButtonExit />
      <View style={dashboard.info}>
        <Text style={styles.textoComentario}>PRECIO BTC </Text>
        {!state ? (
          <ActivityIndicator
            size="large"
            color="#f7ce21"
            style={{ paddingTop: 20 }}
          />
        ) : (
          <Text style={styles.textoComentario}>{state} USD</Text>
        )}
      </View>
      <Image
        style={dashboard.logBtc}
        source={{
          uri: "https://img.freepik.com/vector-gratis/concepto-blockchain-moneda-criptografica-tecnologia-bitcoin_1017-30297.jpg?size=626&ext=jpg",
        }}
      />
    </View>
  );
};

export default Dashboard;
