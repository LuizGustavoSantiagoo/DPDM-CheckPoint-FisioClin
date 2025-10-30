import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";
import { Button, Title, Paragraph } from "react-native-paper";
import {
  TabsProvider,
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import InputText from "../components/InputText";
import ButtonComponent from "../components/ButtonComponent";

import { createPaciente, type PacienteCreate } from "../services/pacienteService";
import InputDate from "../components/InputDate";
import { ScrollView } from "react-native-gesture-handler";

const Pacientes = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [data_nascimento, setDataNascimento] = useState<Date | undefined>(
    new Date()
  );

  const handleCreatePaciente = async () => {

    if (!nome || !sobrenome || !telefone || !endereco || !data_nascimento) {
      Alert.alert("Atenção", "Preencha Nome, Sobrenome, Telefone, Endereço e Data de Nascimento.");
      return;
    }

    const payload: PacienteCreate = {
      nome,
      sobrenome,
      endereco,
      telefone,
      data_nascimento: data_nascimento
        ? new Date(data_nascimento).toISOString().split("T")[0]
        : undefined,
    };

    setLoading(true);

    try {
      const response = await createPaciente(payload);
      if (response) {
        Alert.alert("Sucesso", "Paciente criado com sucesso!");
        console.log("Paciente criado:", response);
      } else {
        Alert.alert("Erro", "Resposta inválida do servidor.");
      }
    } catch (error: any) {
      const serverMsg = error?.response?.data?.message || error?.message || "Erro desconhecido";
      console.error("Erro ao criar paciente:", error?.response?.status, error?.response?.data);
      Alert.alert("Erro", `Falha ao criar paciente. ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Header />

      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Novo Usuario">
            <ScrollView>
              <View style={styles.tabContent}>
                <Text style={styles.title}>Novo Usuario</Text>

                <View style={styles.containerUsuarios}>
                  <InputText label="Nome" value={nome} onChangeText={setNome} />
                  <InputText
                    label="Sobrenome"
                    value={sobrenome}
                    onChangeText={setSobrenome}
                  />
                  <InputText
                    label="endereço"
                    value={endereco}
                    onChangeText={setEndereco}
                  />
                  <InputText
                    label="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                  />
                  <InputDate
                    label="Data de Nascimento"
                    value={data_nascimento}
                    onChange={(date) => setDataNascimento(date)}
                  />
                  {loading ? (
                    <Text style={{ textAlign: "center" }}>Carregando...</Text>
                  ) : null}
                  <ButtonComponent
                    mode="contained"
                    onPress={() => handleCreatePaciente()}
                    disabled={loading}
                  >
                    Salvar
                  </ButtonComponent>
                </View>
              </View>
            </ScrollView>
          </TabScreen>
          <TabScreen label="Usuarios">
            <View style={styles.tabContent}>
              <Text style={styles.title}>Usuarios</Text>
            </View>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  containerUsuarios: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default Pacientes;
