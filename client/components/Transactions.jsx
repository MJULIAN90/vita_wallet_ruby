import React, { useContext, useEffect, useState } from "react";
import { styles } from "./../style/Transactions";
import { View, Text, FlatList } from "react-native";
import { UserContext } from "../Context";
import axios from "axios";
import CardTransaction from "./CardTransaction";
import ButtonExit from "./ButtonExit";

const Transactions = () => {
  let REACT_APP_API = "http://localhost:3000";
  const context = useContext(UserContext);
  const { userid, transactionsH } = context;

  const [state, setstate] = useState();

  const history = async () => {
    let obj = {
      user_id: userid,
    };

    let balanceUser = await axios({
      url: `${REACT_APP_API}/history`,
      method: "Post",
      data: obj,
    });

    setstate(balanceUser.data);
  };

  useEffect(() => {
    history();
  }, [transactionsH]);

  return (
    <View style={styles.inicio}>
      <ButtonExit />

      {state && state.length === 0 ? (
        <Text style={styles.texto}>Usuario no posee transacciones</Text>
      ) : (
        <FlatList
          data={state}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <CardTransaction
              updatedAt={item.updated_at}
              type_transaction={item.type_transaction}
              creceive={item.coin_receive}
              id={item.id}
            />
          )}
        />
      )}
    </View>
  );
};

export default Transactions;
