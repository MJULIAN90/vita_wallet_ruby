import React, { useState, useEffect, useContext } from "react";
import { View, Picker, Button, TextInput, Text } from "react-native";
import axios from "axios";
import { UserContext } from "../Context";
import { conversorQuanti } from "../conversor/conversorQuanti";
import { conversor } from "./../conversor/conversor";
import ButtonExit from "./ButtonExit";
import { REACT_APP_API } from "../api/api";
import { styles, trade } from "../style/stylesApp";

const Trade = () => {
  const context = useContext(UserContext);
  const { userid, setTransactionsH, transactionsH } = context;
  const [selectedValue, setSelectedValue] = useState("usd");
  const [selectTrade, setselectTrade] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState(true);
  const [totalChange, setTotalChange] = useState();
  const [infoBalances, setInfoBalances] = useState({
    usd: "",
    btc: "",
  });

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

    let btcprice = price.data.response;

    if (selectedValue === "btc" && quantity !== "") {
      if (quantity.includes(".")) {
        setQuantity("");
        return alert("Debes usar ',' para la operacion con BTC");
      }
      let info = parseFloat(conversorQuanti(quantity) * btcprice);
      return setTotalChange(info);
    }
    if (selectedValue === "usd" && quantity !== "") {
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
    <View style={styles.inicial}>
      <ButtonExit />
      <View style={trade.balance}>
        <Text style={trade.negrita}>TU BALANCE</Text>
        <Text style={trade.negrita}>
          USD:{" "}
          {infoBalances.usd ? (
            conversor("usd", infoBalances.usd)
          ) : (
            <Text> Cargando ... </Text>
          )}
        </Text>
        <Text style={trade.negrita}>
          BTC:{" "}
          {infoBalances.btc ? (
            conversor("btc", infoBalances.btc)
          ) : (
            <Text> Cargando ... </Text>
          )}
        </Text>
      </View>

      <View>
        <View style={trade.container}>
          <Text style={trade.negrita}> TIPO DE OPERACION </Text>
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

        <View style={trade.container}>
          {selectTrade === "buy" ? (
            <Text style={trade.negrita}> MONEDA A COMPRAR</Text>
          ) : (
            <Text style={trade.negrita}> MONEDA A VENDER </Text>
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

        <View style={trade.container}>
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
            <Text style={trade.negrita1}>
              ¿CUÁNTOS {selectedValue.toUpperCase()} DESEA COMPRAR? INGRESA LA
              CANTIDAD EN FORMATO DE MONEDA INTERNACIONAL
            </Text>
          ) : (
            <Text style={trade.negrita1}>
              ¿CUÁNTOS {selectedValue.toUpperCase()} DESEA VENDER? INGRESA LA
              CANTIDAD EN FORMATO DE MONEDA INTERNACIONAL
            </Text>
          )}
        </View>

        <View style={trade.container}>
          {selectTrade === "buy" && (
            <Text style={trade.negrita}> DEBES TENER . . .</Text>
          )}

          {selectTrade === "sell" && (
            <Text style={trade.negrita}> RECIBIRÁS </Text>
          )}

          {totalChange ? (
            <Text>
              <Text style={trade.negrita}>
                {selectedValue === "usd"
                  ? conversor("btc", totalChange)
                  : conversor("usd", totalChange)}
              </Text>
              {selectedValue === "usd" ? (
                <Text style={trade.negrita}> BTC </Text>
              ) : (
                <Text style={trade.negrita}> USD </Text>
              )}
            </Text>
          ) : (
            <Text style={trade.negrita}>
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
