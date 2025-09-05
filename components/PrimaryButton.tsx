import { Pressable, StyleSheet, Text } from "react-native";

type PrimaryButtonProps = {
  text?: string;
  active?: boolean;
  onPress?: () => void;
};

const PrimaryButton = ({
  text = "",
  active = true,
  onPress,
}: PrimaryButtonProps) => {
  return (
    <Pressable
      style={[styles.button, active ? styles.active : styles.inactive]}
      onPress={onPress}
      disabled={!active}
    >
      <Text
        style={[styles.text, active ? styles.textActive : styles.textInactive]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#FF6A00",
  },
  inactive: {
    backgroundColor: "#e6e6e6",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textActive: {
    color: "#ffffff",
  },
  textInactive: {
    color: "#8c8c8c",
  },
});
