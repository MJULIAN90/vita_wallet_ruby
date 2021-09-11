import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cardTransaction } from "./../style/stylesApp";

const CardTransaction = ({ updatedAt, type_transaction, creceive, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={cardTransaction.container}
      onPress={() => navigation.navigate("Details", { id })}
    >
      <Text style={cardTransaction.label}>{updatedAt.slice(0, 10)}</Text>
      <Text style={cardTransaction.labels}>
        {type_transaction.toUpperCase()}{" "}
      </Text>
      <Text style={cardTransaction.labels}>{creceive.toUpperCase()} </Text>
    </TouchableOpacity>
  );
};

export default CardTransaction;
