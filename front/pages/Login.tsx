import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputPassword from "../components/InputPassword";
import InputText from "../components/InputText";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { loginUser } from "../services/userService";
import * as SecureStore from "expo-secure-store";
import { setAuth } from "../services/authStore";
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainApp: undefined;
  Home: undefined;
};

type LoginScreenProps = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation<LoginScreenProps>();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if ([email, senha].some((v) => !v.trim())) {
      return Alert.alert("Alerta", "Por favor, preencha todos os campos.");
    }

    const postData = {
      email: email,
      senha: senha,
    };

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await loginUser(postData);

      if (!response.token) {
        throw new Error("Token ausente na resposta de login");
      }

      await setAuth(response.token.toString(), response.user);

      setSuccessMessage(response.message);

      if (response.token) {
        navigation.navigate("MainApp");
      }

    } catch (e) {
      Alert.alert(
        "Erro",
        "Falha ao fazer login. Por favor, verifique suas credenciais e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.appTitle}>Log-in</Text>
          <Text style={styles.cardTitle}>Fisio-Clin</Text>
        </View>

        <View style={styles.form}>
          <InputText
            model="outlined"
            placeholder="Digite seu email"
            label="Email"
            onChangeText={setEmail}
            value={email}
          />

          <InputPassword
            label="Senha"
            model="outlined"
            placeholder="Digite sua senha"
            onChangeText={setSenha}
            value={senha}
          />

          {successMessage ? (
            <Text style={{ color: "green", marginTop: 10 }}>
              {successMessage}
            </Text>
          ) : null}
          {errorMessage ? (
            <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
          ) : null}
          {loading ? (
            <Text style={{ marginTop: 10 }}>Carregando...</Text>
          ) : null}

          <ButtonComponent
            mode="contained"
            onPress={() => {
              handleLogin();
            }}
          >
            Entrar
          </ButtonComponent>
        </View>

        <View style={styles.register}>
          <Text style={styles.textRegister}>Não tem uma conta?</Text>

          <ButtonComponent
            mode="contained"
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Cadastre-se
          </ButtonComponent>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    paddingVertical: 24,
    paddingHorizontal: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    // Elevation for Android
    elevation: 6,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#111827",
  },
  cardTitle: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 16,
    textAlign: "center",
    color: "#6b7280",
  },
  form: {
    gap: 12,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
    marginBottom: "15%",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  register: {
    marginTop: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textRegister: {
    color: "#477bebff",
    fontWeight: "500",
    textDecorationColor: "#2563eb",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textAlign: "center",
  },
});
