import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import { UserContext } from "../Context";
import CardTransaction from "./CardTransaction";
import ButtonExit from "./ButtonExit";
import { REACT_APP_API } from "../api/api";
import { styles } from "./../style/stylesApp";

const Transactions = () => {
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
    <View style={styles.inicial}>
      <ButtonExit />

      {state && state.length === 0 ? (
        <Text style={styles.textoComentario}>
          Usuario no posee transacciones
        </Text>
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
