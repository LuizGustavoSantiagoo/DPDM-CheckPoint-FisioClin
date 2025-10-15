import * as React from "react";
import ButtonComponent from "../components/button";
import { StyleSheet, Text, View } from "react-native";
import InputPassword from "../components/inputPassword";
import InputText from "../components/inputText";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Alert } from 'react-native';
import { createPost } from "../services/userService";
import { DrawerNavigatorProps } from "@react-navigation/drawer";
import { StackScreenProps } from "@react-navigation/stack";

type RegisterScreenProps = StackScreenProps<DrawerNavigatorProps, 'Register'>;


const Register = () => {
  const navigation = useNavigation<RegisterScreenProps>();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [crefito, setCrefito] = useState('');
  const [senha, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleCreatePost = async () => {

    if ([nome, sobrenome, email, crefito, senha].some(v => !v.trim())) {
      return Alert.alert('Alerta', 'Por favor, preencha todos os campos.');
    }

    if (senha.trim().length < 7) {
      return Alert.alert('Alerta', 'A senha deve ter pelo menos 7 caracteres.');
    }

    const postData = {
      nome,
      sobrenome,
      email,
      crefito,
      senha
    };

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      
      const response = await createPost(postData);
      setSuccessMessage(`Registro criado com sucesso, Redirecionamento automatico em: 2 segundos.`);

      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);

    } catch (error) {
      setError("Falha ao criar registro. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }

  }

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.appTitle}>Register</Text>
          <Text style={styles.cardTitle}>Fisio-Clin</Text>

        </View>
          <InputText
            model="outlined"
            placeholder="Digite seu nome"
            label="Nome"
            onChangeText={text => setNome(text)}
            value={nome}
          />

          <InputText
            model="outlined"
            placeholder="Digite seu Sobrenome"
            label="Sobrenome"
            onChangeText={text => setSobrenome(text)}
            value={sobrenome}
          />

          <InputText
            model="outlined"
            placeholder="Digite seu email"
            label="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />

          <InputText
            model="outlined"
            placeholder="Digite seu Crefito"
            label="Crefito"
            onChangeText={text => setCrefito(text)}
            value={crefito}
          />

          <InputPassword
            model="outlined"
            placeholder="Digite sua senha"
            label="Senha"
            onChangeText={setPassword}
            value={senha}
          />
          <Text style={styles.textRegister} onPress={() => {navigation.navigate('Login')}}>Ja tem uma conta?</Text>

          {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
          {successMessage ? <Text style={{ color: 'green', textAlign: 'center' }}>{successMessage}</Text> : null}
          {loading ? <Text style={{ textAlign: 'center' }}>Carregando...</Text> : null}


          <ButtonComponent mode="contained" onPress={handleCreatePost}>
            Registrar
          </ButtonComponent>
        <View style={styles.form}>

        </View>
      </View>
    </View>
  );
};

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
    gap: 12,
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
  textRegister: {
    color: "#477bebff",
    fontWeight: "500",
    textDecorationColor: "#2563eb",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textAlign: "right",
  },
});

export default Register;
