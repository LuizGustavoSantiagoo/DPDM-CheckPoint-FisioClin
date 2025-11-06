import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import Header from "../components/Header";
import InputText from "../components/InputText";
import InputDate from "../components/InputDate";
import InputSelectPacientes from "../components/InputSelectPacientes";
import ButtonComponent from "../components/ButtonComponent";
import * as SecureStore from "expo-secure-store";
import { createAtendimento } from "../services/atendimentosService";

const Atendimentos = () => {
  const [paciente, setPaciente] = useState<number | null>(null);
  const [dataAtendimento, setDataAtendimento] = useState<Date | undefined>(new Date());
  const [descricao, setDescricao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [observacoesPaciente, setObservacoesPaciente] = useState("");
  const [fisioId, setFisioId] = useState<string | null>(null);

  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchFisioId = async () => {
      const usuarioString = await SecureStore.getItemAsync("user");
      
      if(usuarioString != null) {
        const usuario = JSON.parse(usuarioString);
        const id = usuario.id;
        setFisioId(id);
      }

    };
    fetchFisioId();
  }, []);

  const handleSalvarAtendimento = async () => {
    if (!paciente || !dataAtendimento || !fisioId) {
      return Alert.alert(
        "Alerta",
        "Por favor, preencha todos os campos obrigatórios."
      );
    }

    const postData = {
      paciente_id: paciente,
      fisio_id: fisioId,
      data_atendimento:
        dataAtendimento instanceof Date && !isNaN(dataAtendimento.getTime())
          ? dataAtendimento.toISOString().split("T")[0]
          : undefined,
      descricao: descricao.trim(),
      observacao: observacoes.trim(),
      observacao_paciente: observacoesPaciente.trim(),
    };

    setLoading("Carregando...");

    try {
      await createAtendimento(postData);
      Alert.alert("Sucesso", "Atendimento salvo com sucesso.");

      setLoading(null);
      setError(null);
      setSuccess("Atendimento salvo com sucesso.");

      setPaciente(null);
      setDataAtendimento(undefined);
      setDescricao("");
      setObservacoes("");
      setObservacoesPaciente("");

    } catch (error) {

      Alert.alert(
        "Erro",
        "Ocorreu um erro ao salvar o atendimento. Tente novamente."
      );

      setLoading(null);
      setError("Erro ao salvar o atendimento.");
      setSuccess(null);

    } finally {
      setPaciente(null);
      setDataAtendimento(undefined);
      setDescricao("");
      setObservacoes("");
      setObservacoesPaciente("");

      setLoading(null);
    }
  };

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.container}>
        <InputSelectPacientes value={paciente} onChange={setPaciente} />
        <View style={styles.inputs}>
          <InputDate
            label="data"
            value={dataAtendimento}
            onChange={(date) => setDataAtendimento(date)}
          />
        </View>
        <InputText
          label="Descrição do Atendimento"
          multiline={true}
          value={descricao}
          onChangeText={setDescricao}
        />
        <InputText
          label="Observações"
          multiline={true}
          value={observacoes}
          onChangeText={setObservacoes}
        />
        <InputText
          label="Observações do paciente"
          multiline={true}
          value={observacoesPaciente}
          onChangeText={setObservacoesPaciente}
        />

        {loading ? (
          <Text style={styles.loading}>{loading}</Text>
        ) : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}

        <ButtonComponent
          mode="contained"
          children="Salvar"
          onPress={handleSalvarAtendimento}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    display: "flex",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    margin: 16,
    backgroundColor: "#fff",
    padding: 16,
    gap: 12,
  },
  inputs: {
    height: 40,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  success: {
    color: "green",
    marginBottom: 8,
  },
  loading: {
    color: "blue",
    marginBottom: 8,
    textAlign: "center",
  },
});

export default Atendimentos;
