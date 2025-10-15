import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import type { ReactNode } from "react";

interface ButtonProps {
  icon?: string;
  mode?: "text" | "outlined" | "contained";
  onPress?: () => void;
  children?: ReactNode;
}

const ButtonComponent = ({ icon, mode, onPress, children }: ButtonProps) => (
  <Button icon={icon} mode={mode} onPress={onPress} style={styles.button}>
    {children}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4896b8",
    width: "50%",
    borderRadius: 9,
    marginTop: 10,
    color: "#ffffff",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default ButtonComponent;
