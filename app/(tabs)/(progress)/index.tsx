import { StyleSheet, Text, View } from "react-native";

const Progress = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Progress</Text>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
