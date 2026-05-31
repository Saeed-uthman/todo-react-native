import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>hi there my name is saeed.</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => console.log("clicked me")}
      >
        <Text>Press me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "red",
    backgroundColor: "blue",
    borderBlockColor: "black",
  },

  btn: {
    borderBlockColor: "black",
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    color: "white",
  },
});
