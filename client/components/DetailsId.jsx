import React, { useEffect, useState } from "react";
import { styles } from "./../style/DetailsId";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { conversor } from "../conversor/conversor";

const DetailsId = ({ route }) => {
  let REACT_APP_API = "http://localhost:3000";
  const navigation = useNavigation();
  const [state, setstate] = useState();

  let info = async () => {
    let obj = {
      id: route.params.id,
    };

    let transacitionId = await axios({
      url: `${REACT_APP_API}/details`,
      method: "Post",
      data: obj,
    });

    setstate([transacitionId.data]);
  };

  useEffect(() => {
    info();
  }, []);

  return (
    <View style={styles.inicio}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.salir}
      >
        <Text style={styles.textoSalir}>VOLVER</Text>
      </TouchableOpacity>
      {state ? (
        <View>
          {state.map((item, i) => {
            const {
              id,
              total_receive,
              total_send,
              created_at,
              coin_receive,
              coin_send,
              type_transaction,
            } = item;

            return (
              <View style={styles.container} key={i}>
                <Text style={styles.infoII}>ID TRANSACION:</Text>
                <Text style={styles.infoI}>{id}</Text>
                <Text style={styles.infoII}>FECHA DE TRANSACION:</Text>
                <Text style={styles.infoI}>{created_at.slice(0, 10)}</Text>
                <Text style={styles.infoII}>TIPO DE TRANSACION:</Text>
                <Text style={styles.infoI}>
                  {type_transaction.toUpperCase()}
                </Text>
                <Text style={styles.infoII}>MONEDA ENVIADA:</Text>
                <Text style={styles.infoI}>{coin_send.toUpperCase()}</Text>
                <Text style={styles.infoII}>CANTIDAD ENVIADA:</Text>
                <Text style={styles.infoI}>
                  {conversor(coin_send, total_send)}
                </Text>
                <Text style={styles.infoII}>MONEDA RECIBIDA:</Text>
                <Text style={styles.infoI}>{coin_receive.toUpperCase()}</Text>
                <Text style={styles.infoII}>CANTIDAD RECIBIDA:</Text>
                <Text style={styles.infoI}>
                  {conversor(coin_receive, total_receive)}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0da7a3" />
      )}
    </View>
  );
};

export default DetailsId;
