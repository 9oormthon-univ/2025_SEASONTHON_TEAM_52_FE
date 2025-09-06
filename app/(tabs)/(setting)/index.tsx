import { StyleSheet, Text, View } from "react-native";
import GoPreference from "../../../components/GoPreference";

const Setting = () => {
  return (
    <View style={styles.container}>
      <GoPreference />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
