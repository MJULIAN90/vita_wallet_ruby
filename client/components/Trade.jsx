import React, { useState, useEffect, useContext } from "react";
import { styles } from "../style/Trade";
import {
  View,
  Picker,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../Context";
import { conversorQuanti } from "../conversor/conversorQuanti";
import { conversor } from "./../conversor/conversor";

const Trade = () => {
  let REACT_APP_API = "http://localhost:3000";
  const context = useContext(UserContext);
  const { userid, setTransactionsH, transactionsH } = context;
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState("usd");
  const [selectTrade, setselectTrade] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [infoBalances, setInfoBalances] = useState({
    usd: "",
    btc: "",
  });
  const [status, setStatus] = useState(true);
  const [totalChange, setTotalChange] = useState();

  const balances = async () => {
    let obj = {
      user_id: userid,
    };

    let balanceuser = await axios({
      url: `${REACT_APP_API}/user/balance`,
      method: "Post",
      data: obj,
    });

    if (balanceuser.data) {
      let balUser = balanceuser.data.response;

      setInfoBalances({
        usd: balUser.usd,
        btc: balUser.btc,
      });
    }

    if (balanceuser.data === "Sin fondos") {
      setInfoBalances({
        usd: "0",
        btc: "0",
      });
    }
  };

  useEffect(() => {
    balances();
  }, []);

  useEffect(() => {
    calculate;
  }, [quantity]);

  const calculate = async () => {
    let price = await axios(`${REACT_APP_API}/price`);

    console.log(price);
    let btcprice = price.data.response;

    if (selectedValue === "btc" && quantity !== "") {
      //  let info = parseFloat(quantity) * parseFloat(btcprice);
      let info = parseFloat(conversorQuanti(quantity) * btcprice);
      return setTotalChange(info);
    }
    if (selectedValue === "usd" && quantity !== "") {
      //let info = parseFloat(quantity) / parseFloat(btcprice);
      let info = parseFloat(conversorQuanti(quantity) / btcprice);

      return setTotalChange(info);
    }
    alert("ingrese un valor para calcular");
  };

  const send = async () => {
    var quantityTotal = quantity;
    let cReceive = "";

    if (selectTrade === "buy") {
      setStatus(!status);
      if (selectedValue === "usd") cReceive = "btc";
      if (selectedValue === "btc") cReceive = "usd";

      //aca
      var quantityTotal = conversorQuanti(quantity);

      const obj = {
        type_transaction: "buy",
        user_id: userid,
        coin_send: cReceive,
        coin_receive: selectedValue,
        total_send: parseFloat(totalChange),
        total_receive: parseFloat(quantityTotal),
      };

      let data = await axios({
        url: `${REACT_APP_API}/transaction/trade`,
        method: "Post",
        data: obj,
      });

      if (data.data.Response === "Transaccion Exitosa") {
        setQuantity("");
        setTotalChange("");
        balances();
        setTransactionsH(!transactionsH);
        return alert("TRANSACCIÓN EXISTOSA");
      }

      setTotalChange("");
      return alert("FONDOS INSUFICIENTES");
    }

    if (selectTrade === "sell") {
      setStatus(!status);
      if (selectedValue === "usd") cReceive = "btc";
      if (selectedValue === "btc") cReceive = "usd";

      const obj = {
        type_transaction: "sell",
        user_id: userid,
        coin_send: selectedValue,
        coin_receive: cReceive,
        total_send: parseFloat(quantityTotal),
        total_receive: parseFloat(totalChange),
      };

      let data = await axios({
        url: `${REACT_APP_API}/transaction/trade`,
        method: "Post",
        data: obj,
      });

      if (data.data.Response === "Transaccion Exitosa") {
        setQuantity("");
        setTotalChange("");
        balances();
        setTransactionsH(!transactionsH);
        return alert("TRANSACCIÓN EXITOSA");
      }
      setTotalChange("");
      return alert("FONDOS INSUFICIENTES");
    }
  };

  return (
    <View style={styles.inicio}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.salir}
      >
        <Text style={styles.textoSalir}>SALIR</Text>
      </TouchableOpacity>

      <View style={styles.balance}>
        <Text style={styles.negrita}>TU BALANCE</Text>
        <Text style={styles.negrita}>
          USD:{" "}
          {infoBalances.usd ? (
            conversor("usd", infoBalances.usd)
          ) : (
            <Text> Cargando ... </Text>
          )}
        </Text>
        <Text style={styles.negrita}>
          BTC:{" "}
          {infoBalances.btc ? (
            conversor("btc", infoBalances.btc)
          ) : (
            <Text> Cargando ... </Text>
          )}
        </Text>
      </View>

      <View>
        <View style={styles.container}>
          <Text style={styles.negrita}> TIPO DE OPERACION </Text>
          <Picker
            selectedValue={selectTrade}
            style={{
              height: 50,
              width: 150,
              borderRadius: 7,
              borderWidth: 3,
              color: "black",
              backgroundColor: "white",
            }}
            onValueChange={(itemValue) => setselectTrade(itemValue)}
          >
            <Picker.Item label="COMPRAR" value="buy" />
            <Picker.Item label="VENDER" value="sell" />
          </Picker>
        </View>

        <View style={styles.container}>
          {selectTrade === "buy" ? (
            <Text style={styles.negrita}> MONEDA A COMPRAR</Text>
          ) : (
            <Text style={styles.negrita}> MONEDA A VENDER </Text>
          )}

          <Picker
            selectedValue={selectedValue}
            style={{
              height: 50,
              width: 150,
              borderRadius: 7,
              borderWidth: 3,
              color: "black",
            }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="USD" value="usd" />
            <Picker.Item label="BTC" value="btc" />
          </Picker>
        </View>

        <View style={styles.container}>
          <TextInput
            placeholder="INGRESA CANTIDAD "
            placeholderTextColor="#000"
            style={{
              textAlign: "center",
              borderWidth: 1.0,
              borderRadius: 5,
              height: 35,
              backgroundColor: "white",
            }}
            onChangeText={setQuantity}
            value={quantity}
          />
          {selectTrade === "buy" ? (
            <Text style={styles.negrita1}>
              ¿CUÁNTOS {selectedValue.toUpperCase()} DESEA COMPRAR? INGRESA LA
              CANTIDAD EN FORMATO DE MONEDA INTERNACIONAL
            </Text>
          ) : (
            <Text style={styles.negrita1}>
              ¿CUÁNTOS {selectedValue.toUpperCase()} DESEA VENDER? INGRESA LA
              CANTIDAD EN FORMATO DE MONEDA INTERNACIONAL
            </Text>
          )}
        </View>

        <View style={styles.container}>
          {selectTrade === "buy" && (
            <Text style={styles.negrita}> DEBES TENER . . .</Text>
          )}

          {selectTrade === "sell" && (
            <Text style={styles.negrita}> RECIBIRÁS </Text>
          )}

          {totalChange ? (
            <Text>
              <Text style={styles.negrita}>
                {selectedValue === "usd"
                  ? conversor("btc", totalChange)
                  : conversor("usd", totalChange)}
              </Text>
              {selectedValue === "usd" ? (
                <Text style={styles.negrita}> BTC </Text>
              ) : (
                <Text style={styles.negrita}> USD </Text>
              )}
            </Text>
          ) : (
            <Text style={styles.negrita}>
              PRESIONA CALCULAR PARA PODER OPERAR
            </Text>
          )}

          <Button color="#f7ce21" onPress={calculate} title="calcular" />
        </View>

        {totalChange && infoBalances.btc !== "0" ? (
          <Button color="#f7ce21" title={selectTrade} onPress={send} />
        ) : (
          <Button disabled={true} color="#f7ce21" title={selectTrade} />
        )}
      </View>
    </View>
  );
};

export default Trade;
