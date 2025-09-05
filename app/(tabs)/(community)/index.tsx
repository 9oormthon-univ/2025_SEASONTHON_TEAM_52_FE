import { StyleSheet, Text, View } from "react-native";

const Community = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Community</Text>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
