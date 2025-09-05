import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

const Home = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFE9D9", "#FFFDFB"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.background}
      />
      <View style={{ paddingTop: 50 }}>
        <Text>오손도손</Text>
      </View>
      <View style={styles.content}>
        <Text style={{ fontSize: 20 }}>Home</Text>
      </View>
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
    top: height * 0.88,
    left: 0,
    right: 0,
    position: "absolute",
  },
  background: {
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.9,
  },
});
