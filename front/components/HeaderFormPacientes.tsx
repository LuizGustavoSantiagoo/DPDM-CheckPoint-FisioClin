// HeaderForm.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputText from "../components/InputText";
import InputDate from "../components/InputDate";
import ButtonComponent from "../components/ButtonComponent";
import { Paciente, PacienteCreate } from "../services/pacienteService";
import { formatDateOnly } from "../services/util";

type Props = {
  paciente?: Paciente | null;
  onSave?: (updated: Partial<Paciente>) => void;
};

const HeaderForm: React.FC<Props> = ({ paciente, onSave }) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | undefined>(undefined);
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (paciente) {
      setNome(paciente.nome ?? "");
      setSobrenome(paciente.sobrenome ?? "");
      setDataNascimento(paciente.data_nascimento ? new Date(paciente.data_nascimento) : undefined);
      setEndereco(paciente.endereco ?? "");
      setTelefone(paciente.telefone ?? "");
    }
  }, [paciente]);

  return (
    <View style={styles.containerInputs}>
      <Text style={styles.title}>Informações do Paciente</Text>
      <InputText label="Nome" value={nome} onChangeText={setNome} />
      <InputText label="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
      <InputText label="Telefone" value={telefone} onChangeText={setTelefone} />
      <View style={styles.inputDate}>
        <InputDate label="Data de Nascimento" value={dataNascimento} onChange={setDataNascimento} />
      </View>
      <InputText label="Endereço" value={endereco} onChangeText={setEndereco} />

      <ButtonComponent
        mode="contained"
        children="Salvar"
        onPress={() => {
          onSave?.({
            nome,
            sobrenome,
            // Envia no formato dd/MM/yyyy para o backend
            data_nascimento: dataNascimento ? formatDateOnly(dataNascimento) : undefined,
            endereco,
            telefone,
          } as Partial<Paciente>);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerInputs: {
    display: "flex",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    margin: 16,
    backgroundColor: "#fff",
    padding: 16,
    gap: 12,
  },
  inputDate: { height: 56 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
});

export default HeaderForm;
