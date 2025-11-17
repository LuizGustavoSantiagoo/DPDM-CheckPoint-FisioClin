import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import InputText from "../components/InputText";
import ButtonComponent from "../components/ButtonComponent";
import {
  createPaciente,
  getPacientes,
  type PacienteCreate,
  type Paciente,
  searchPacientes,
  deletePaciente,
} from "../services/pacienteService";
import InputDate from "../components/InputDate";
import { formatDate } from "../services/util";
import { useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "./DrawerNavigator";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import HomePaciente from "./HomePaciente";

const Pacientes = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [data_nascimento, setDataNascimento] = useState<Date | undefined>(
    new Date()
  );
  const [usuarios, setUsuarios] = useState<Paciente[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  const [pesquisa, setPesquisa] = useState("");

  type NavigationProp = NativeStackNavigationProp<DrawerParamList>;

  const fetchPacientes = async () => {
    try {
      setLoadingList(true);
      const lista = await getPacientes();
      setUsuarios(lista);
    } catch (error) {
    } finally {
      setLoadingList(false);
    }
  };

  const handleCreatePaciente = async () => {
    if (!nome || !sobrenome || !telefone || !endereco || !data_nascimento) {
      Alert.alert(
        "Atenção",
        "Preencha Nome, Sobrenome, Telefone, Endereço e Data de Nascimento."
      );
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
        fetchPacientes();

        setNome("");
        setSobrenome("");
        setEndereco("");
        setTelefone("");
        setDataNascimento(new Date());
      } else {
        Alert.alert("Erro", "Resposta inválida do servidor.");
      }
    } catch (error: any) {
      const serverMsg =
        error?.response?.data?.message || error?.message || "Erro desconhecido";
      Alert.alert("Erro", `Falha ao criar paciente. ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleSearch = async (pesquisa: string) => {
    setPesquisa(pesquisa);

    if (pesquisa.trim() === "") {
      fetchPacientes();
      return;
    }

    try {
      setLoadingList(true);
      const resultados = await searchPacientes(pesquisa.trim());
      setUsuarios(resultados);
    } catch (error) {
    } finally {
      setLoadingList(false);
    }
  };

  const navigation = useNavigation<NavigationProp>();

  const perfil = (idPaciente: number) => {

    if (idPaciente != null && idPaciente != undefined) {
      navigation.navigate("HomePaciente", { id: idPaciente });
    } else {
      Alert.alert("Erro", "ID do paciente inválido.");
    }
    
  };

  const handleDeleteUser = async (idPaciente: number) => {

    Alert.alert("Confirmação", "Deseja realmente excluir este paciente?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePaciente(idPaciente);
            Alert.alert("Sucesso", "Paciente excluído com sucesso.");
            fetchPacientes();
          } catch (error) {
            Alert.alert("Erro", "Falha ao excluir o paciente.");
          }
        },
      },
    ]);

  }

  return (
    <View style={styles.screen}>
      <Header />

      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Novo Paciente">
            <ScrollView>
              <View style={styles.tabContent}>
                <Text style={styles.title}>Novo Paciente</Text>

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
                    Criar
                  </ButtonComponent>
                </View>
              </View>
            </ScrollView>
          </TabScreen>
          <TabScreen label="Pacientes">
            <View style={styles.tabContentList}>
              <View style={{ margin: 16 }}>
                <InputText
                  label="Pesquisar"
                  model="outlined"
                  placeholder="Pesquisar usuarios..."
                  onChangeText={(text) => handleSearch(text)}
                  value={pesquisa}
                />
              </View>

              <FlatList
                style={{ flex: 1 }}
                data={usuarios}
                keyExtractor={(item, index) =>
                  item?.id ? String(item.id) : String(index)
                }
                contentContainerStyle={{
                  padding: 16,
                  paddingBottom: 24,
                  flexGrow: usuarios.length ? 0 : 1,
                }}
                ListHeaderComponent={
                  <Text style={styles.title}>Pacientes</Text>
                }
                ListEmptyComponent={
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {loadingList ? (
                      <ActivityIndicator size="small" />
                    ) : (
                      <Text>Nenhum usuário encontrado.</Text>
                    )}
                  </View>
                }
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                renderItem={({ item }) => (
                  <View style={styles.cardUsuario}>
                    <View style={styles.containerUsuarios}>
                      <View style={styles.pacientesDados}>
                        <Text style={styles.userLinha}>Nome:</Text>
                        <Text>
                          {item.nome} {item.sobrenome}
                        </Text>
                      </View>

                      <View style={styles.pacientesDados}>
                        <Text style={styles.userLinha}>Telefone:</Text>
                        <Text>{item.telefone}</Text>
                      </View>

                      <View style={styles.pacientesDados}>
                        <Text style={styles.userLinha}>Nascimento:</Text>
                        <Text>{formatDate(item.data_nascimento)}</Text>
                      </View>
                    </View>

                    <ButtonComponent
                      mode="contained"
                      onPress={() => {
                        perfil(item.id);
                      }}
                      children="Visualizar"
                      icon="eye"
                    />

                    <ButtonComponent mode="contained" children="Excluir" onPress={() => handleDeleteUser(item.id)} icon="delete"/>
                  </View>
                )}
              />
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
  tabContentList: {
    flex: 1,
  },
  containerUsuarios: {
    fontSize: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
  },
  pacientesDados: {
    display: "flex",
    flexDirection: "column",
  },
  cardUsuario: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#000000",
  },
  userLinha: {
    fontSize: 14,
    color: "#000000ff",
    fontWeight: "bold",
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
