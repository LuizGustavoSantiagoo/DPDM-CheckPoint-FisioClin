import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList } from "./DrawerNavigator";
import { View, Text, Alert, FlatList } from "react-native";
import { getPacienteById, Paciente } from "../services/pacienteService";
import { useNavigation } from "@react-navigation/native";
import InputText from "../components/InputText";
import InputDate from "../components/InputDate";
import Header from "../components/Header";
import { StyleSheet } from "react-native";
import {
  getAtendimentosByIDPaciente,
  AtendimentoCreate,
} from "../services/atendimentosService";
import Atendimento from "../components/Atendimento";
import { formatDateOnly } from "../services/util";

type HomePacienteScreenProps = NativeStackScreenProps<
  DrawerParamList,
  "HomePaciente"
>;

const HomePaciente = ({ route }: HomePacienteScreenProps) => {
  const navigation = useNavigation();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [atendimentos, setAtendimentos] = useState<AtendimentoCreate[]>([]);

  useEffect(() => {
    if (route.params?.id != null) {
      setAtendimentos([]);
      setPaciente(null);
      handleGetPacienteDetails();
      handleGetAtendimentos();
    }
  }, [route.params?.id]);

  const handleGetPacienteDetails = () => {
    const { id } = route.params;

    getPacienteById(id)
      .then((paciente) => {
        setPaciente(paciente);
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

  const renderHeader = () => (
    <View>
      <View style={style.containerInputs}>
        <Text style={style.title}>Informações do Paciente</Text>
        <InputText label="Nome" value={paciente?.nome} />
        <InputText label="Sobrenome" value={paciente?.sobrenome} />
        <View style={style.inputDate}>
          <InputDate
            label="Data de Nascimento"
            value={
              paciente?.data_nascimento
                ? new Date(paciente.data_nascimento)
                : undefined
            }
          />
        </View>
        <InputText label="Endereço" value={paciente?.endereco} />
      </View>
      <View style={[style.containerInputs, { marginBottom: 0, alignItems: "center" }]}>
        <Text style={style.title}>Histórico de Atendimentos</Text>
        {atendimentos.length === 0 && renderEmpty()}
      </View>
    </View>
  );

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
              nomePaciente={item.paciente?.nome + " " + item.paciente?.sobrenome}
              fisio={item.fisio?.nome ?? ""}
              observacao={item.observacao ?? ""}
              observacaoPaciente={item.observacao_paciente ?? ""}
            />
          </View>
        )}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        ListHeaderComponent={renderHeader}
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
    borderRadius: 8
  }
});

export default HomePaciente;
