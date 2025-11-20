import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";
import InputText from "../components/InputText";
import { getUser } from "../services/authStore";
import ButtonComponent from "../components/ButtonComponent";
import { updateUser } from "../services/userService";

const UserHome = () => {
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [crm, setCrm] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [userId, setUserId] = useState("");

  interface UpdateUserPayload {
    nome: string;
    sobrenome: string;
    email: string;
    senha?: string;
    senha_confirmation?: string;
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUser();
        if (user) {
          setNome(user.nome);
          setSobreNome(user.sobrenome || "");
          setEmail(user.email);
          setSenha(user.senha_hash);
          setCrm(user.crefito);
          setUserId(String(user.id));
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    loadUser();
  }, []);

  const handleUpdateUser = async () => {
    try {
      const payload: UpdateUserPayload = {
        nome,
        sobrenome: sobreNome,
        email,
      };

      if (novaSenha.trim() !== "") {
        payload.senha = novaSenha;
        payload.senha_confirmation = novaSenha;
      }

      await updateUser(payload, userId);

      setNovaSenha("");
      Alert.alert("Sucesso", "Atualizado com sucesso!");

      setSenha(novaSenha);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar os dados do usuário.");
    }
  };

  return (
    <View>
      <Header />

      <View style={styles.container}>
        <InputText label="Nome" value={nome} onChangeText={setNome} />
        <InputText
          label="SobreNome"
          value={sobreNome}
          onChangeText={setSobreNome}
        />
        <InputText label="Email" value={email} onChangeText={setEmail} />
        <InputText
          label="Crefito"
          value={crm}
          onChangeText={setCrm}
        />
        <InputText
          label="Trocar senha"
          value={novaSenha}
          onChangeText={setNovaSenha}
        />

        <ButtonComponent
          mode="contained"
          children="Salvar"
          onPress={handleUpdateUser}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    margin: 16,
  },
});

export default UserHome;
