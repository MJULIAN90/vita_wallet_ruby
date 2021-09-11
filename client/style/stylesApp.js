import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  //Global
  inicial: {
    flex: 1,
    backgroundColor: "black",
  },

  textoComentario: {
    fontSize: 30,
    color: "#f7ce21",
    textAlign: "center",
  },

  // boton salir y boton volver
  botonSalir: {
    backgroundColor: "#f7ce21",
    alignItems: "center",
    height: 30,
  },

  textoSalir: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export const loginRegister = StyleSheet.create({
  tinyLogo: {
    width: "100%",
    resizeMode: "stretch",
    height: "52%",
    position: "absolute",
    marginTop: 90,
  },

  container: {
    alignItems: "center",
    marginTop: 420,
    paddingBottom: 20,
  },

  inputs: {
    margin: 7,
    width: 160,
    height: 35,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 12,
    textAlign: "center",
    borderBottomColor: "#f7ce21",
    color: "white",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    marginLeft: "30%",
    marginRight: "30%",
    backgroundColor: "#f7ce21",
    borderRadius: 10,
    marginTop: 5,
  },

  texto: {
    fontSize: 25,
  },
});

export const dashboard = StyleSheet.create({
  inicio: {
    backgroundColor: "black",
    paddingBottom: 400,
  },

  info: {
    marginTop: 50,
    alignItems: "center",
  },

  logBtc: {
    marginLeft: "10%",
    width: "80%",
    resizeMode: "stretch",
    height: "80%",
    position: "relative",
    marginTop: 50,
    paddingBottom: 200,
  },
});

export const cardTransaction = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#f7ce21",
  },

  label: {
    marginLeft: "20%",
    marginRight: "20%",
    fontWeight: "bold",
  },

  labels: {
    fontWeight: "bold",
  },
});

export const detailsId = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "#f7ce21",
    borderRadius: 30,
    height: "90%",
    paddingBottom: "5%",
  },

  infoI: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  infoII: {
    marginTop: "5%",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export const trade = StyleSheet.create({
  balance: {
    alignItems: "center",
    marginTop: "2%",
  },

  negrita: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#f7ce21",
  },

  container: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    color: "white",
  },

  button: {
    alignItems: "center",
    marginLeft: "30%",
    marginRight: "30%",
    backgroundColor: "#f7ce21",
    borderRadius: 10,
  },

  negrita1: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    marginLeft: "10%",
    marginRight: "10%",
    color: "#f7ce21",
  },
});
