import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList } from "./DrawerNavigator";
import { View, Text, Alert, FlatList } from "react-native";
import { getPacienteById, Paciente, PacienteCreate, updatePaciente } from "../services/pacienteService";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { StyleSheet } from "react-native";
import {
  getAtendimentosByIDPaciente,
  AtendimentoCreate,
} from "../services/atendimentosService";
import Atendimento from "../components/Atendimento";
import { formatDateOnly} from "../services/util";
import ButtonComponent from "../components/ButtonComponent";
import HeaderForm from "../components/HeaderFormPacientes";

type HomePacienteScreenProps = NativeStackScreenProps<
  DrawerParamList,
  "HomePaciente"
>;

const HomePaciente = ({ route }: HomePacienteScreenProps) => {
  const navigation = useNavigation();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [atendimentos, setAtendimentos] = useState<AtendimentoCreate[]>([]);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | undefined>(
    undefined
  );
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (route.params?.id != null) {
      setAtendimentos([]);
      setPaciente(null);
      handleGetPacienteDetails();
      handleGetAtendimentos();
    }
  }, []);

  const handleGetPacienteDetails = () => {
    const { id } = route.params;

    getPacienteById(id)
      .then((paciente) => {
        setPaciente(paciente);
        setNome(paciente.nome);
        setSobrenome(paciente.sobrenome);
        setDataNascimento(
          paciente.data_nascimento
            ? new Date(paciente.data_nascimento)
            : undefined
        );
        setEndereco(paciente.endereco);
        setTelefone(paciente.telefone);
      })
      .catch((error) => {
        Alert.alert(
          "Erro",
          "Não foi possível carregar os detalhes do paciente. Tente novamente mais tarde."
        );
        navigation.goBack();
      });
  };

  const handleGetAtendimentos = () => {
    const { id } = route.params;

    getAtendimentosByIDPaciente(id)
      .then((atendimentos) => {
        setAtendimentos(atendimentos);
      })
      .catch((error) => {
        Alert.alert(
          "Erro",
          "Não foi possível carregar os atendimentos. Tente novamente mais tarde."
        );
      });
  };

  const hendleUpdatePaciente = (update: Partial<Paciente>) => {

    if (!paciente) return;

    const payload: PacienteCreate = {
      nome: update.nome ?? paciente.nome,
      sobrenome: update.sobrenome ?? paciente.sobrenome,
      data_nascimento: update.data_nascimento !== undefined ? update.data_nascimento : paciente.data_nascimento,
      endereco: update.endereco ?? paciente.endereco,
      telefone: update.telefone ?? paciente.telefone,
    };

   updatePaciente(route.params.id, payload)
     .then((response) => {
       Alert.alert("Sucesso", "Paciente atualizado com sucesso.");
       handleGetPacienteDetails();
      handleGetAtendimentos();
     })
     .catch((error) => {
       Alert.alert(
         "Erro",
         "Não foi possível atualizar o paciente. Tente novamente mais tarde."
       );
     });
  }

  const renderEmpty = () => (
    <View style={{ paddingHorizontal: 16 }}>
      <Text>Não há atendimentos registrados.</Text>
    </View>
  );

  return (
    <View style={style.container}>
      <Header />

      <FlatList
        data={atendimentos}
        renderItem={({ item }) => (
          <View style={style.atendimentos}>
            <Atendimento
              dataAtendimento={formatDateOnly(item.data_atendimento)}
              descricao={item.descricao ?? ""}
              nomePaciente={
                item.paciente?.nome + " " + item.paciente?.sobrenome
              }
              fisio={item.fisio?.nome ?? ""}
              observacao={item.observacao ?? ""}
              observacaoPaciente={item.observacao_paciente ?? ""}
            />
          </View>
        )}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        ListHeaderComponent={<HeaderForm paciente={paciente} onSave={(update) => hendleUpdatePaciente(update)} />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
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
  inputDate: {
    height: 56,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  atendimentos: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});

export default HomePaciente;
