import { StyleSheet, Text, View, Dimensions } from "react-native";
import TabBar from "../../components/TabBar";

const { height } = Dimensions.get("window");
const myStyle = {};

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontSize: 20 }}>Home</Text>
      </View>
      <TabBar style={styles.tabBar} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    top: height * 0.82,
    left: 0,
    right: 0,
    position: "absolute",
  },
});
