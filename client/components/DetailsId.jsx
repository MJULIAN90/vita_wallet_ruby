import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { conversor } from "../conversor/conversor";
import { REACT_APP_API } from "../api/api";
import { styles, detailsId } from "./../style/stylesApp";

const DetailsId = ({ route }) => {
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
    <View style={styles.inicial}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.botonSalir}
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
              <View style={detailsId.container} key={i}>
                <Text style={detailsId.infoII}>ID TRANSACION:</Text>
                <Text style={detailsId.infoI}>{id}</Text>
                <Text style={detailsId.infoII}>FECHA DE TRANSACION:</Text>
                <Text style={detailsId.infoI}>{created_at.slice(0, 10)}</Text>
                <Text style={detailsId.infoII}>TIPO DE TRANSACION:</Text>
                <Text style={detailsId.infoI}>
                  {type_transaction.toUpperCase()}
                </Text>
                <Text style={detailsId.infoII}>MONEDA ENVIADA:</Text>
                <Text style={detailsId.infoI}>{coin_send.toUpperCase()}</Text>
                <Text style={detailsId.infoII}>CANTIDAD ENVIADA:</Text>
                <Text style={detailsId.infoI}>
                  {conversor(coin_send, total_send)}
                </Text>
                <Text style={detailsId.infoII}>MONEDA RECIBIDA:</Text>
                <Text style={detailsId.infoI}>
                  {coin_receive.toUpperCase()}
                </Text>
                <Text style={detailsId.infoII}>CANTIDAD RECIBIDA:</Text>
                <Text style={detailsId.infoI}>
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
