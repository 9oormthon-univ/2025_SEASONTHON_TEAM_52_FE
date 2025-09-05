import { StyleSheet, Text, View } from "react-native";

const Matching = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Matching</Text>
    </View>
  );
};

export default Matching;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
