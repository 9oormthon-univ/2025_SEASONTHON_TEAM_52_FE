import { StyleSheet, TextInput, View } from "react-native";
import { TEXT } from "../constants/TextStyles";

type AuthInputProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const AuthInput = ({
  placeholder = "",
  value,
  onChangeText,
  secureTextEntry = false,
}: AuthInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#d8d8d8"
        style={[styles.input, TEXT.body3]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: "#d8d8d8",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    width: "100%",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flex: 1,
  },
});
