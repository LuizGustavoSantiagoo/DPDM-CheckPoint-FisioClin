import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import InputText from "../components/InputText";
import { searchPacientes } from "../services/pacienteService";

interface Paciente {
  id: number;
  nome: string;
}

type InputSelectPacientesProps = {
  value: number | null;
  onChange: (value: number | null) => void;
};

const InputSelectPacientes = ({ value, onChange }: InputSelectPacientesProps) => {
  const [pesquisa, setPesquisa] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [usuarios, setUsuarios] = useState<Paciente[]>([]);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [selecionadoNome, setSelecionadoNome] = useState<string>("");

  useEffect(() => {
    if (value === null) {
      setSelecionado(null);
      setSelecionadoNome("");
      return;
    }
    if (value !== selecionado) {
      setSelecionado(value);
    }
  }, [value]);

  const handleSearch = async (texto: string) => {
    setPesquisa(texto);

    if (texto.trim() === "") {
      setUsuarios([]);
      return;
    }

    try {
      setLoadingList(true);
      const resultados = await searchPacientes(texto.trim());
      setUsuarios(resultados);
    } catch (error) {
      console.error("Erro ao pesquisar pacientes:", error);
    } finally {
      setLoadingList(false);
    }
  };

  const handleSelect = (paciente: Paciente) => {
    setSelecionado(paciente.id);
    setSelecionadoNome(paciente.nome);
    setUsuarios([]);
    setPesquisa(paciente.nome);
    onChange(paciente.id);
  };

  return (
    <View style={styles.container}>
      <InputText
        label="Pesquisar"
        model="outlined"
        placeholder="Pesquisar usuários..."
        onChangeText={handleSearch}
        value={pesquisa}
      />

      {loadingList && (
        <ActivityIndicator
          size="small"
          color="#007AFF"
          style={{ marginTop: 10 }}
        />
      )}

      {!loadingList && usuarios.length > 0 && (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.itemText}>{item.nome}</Text>
            </TouchableOpacity>
          )}
          style={styles.lista}
        />
      )}

      {!!selecionado && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>
            Paciente selecionado:{" "}
            <Text style={styles.bold}>{selecionadoNome || pesquisa}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  lista: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    maxHeight: 180,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
  resultado: {
    marginTop: 10,
    paddingVertical: 8,
  },
  resultadoTexto: {
    color: "#333",
    fontSize: 15,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default InputSelectPacientes;
