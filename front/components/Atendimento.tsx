import { View, Text } from "react-native";

interface AtendimentoProps {
  nomePaciente: string;
  dataAtendimento: string;
  descricao: string;
  horario?: string;
}

const Atendimento = ({nomePaciente, dataAtendimento, descricao, horario}: AtendimentoProps) => {
  return (
    <View style={styles.container}>

        <Text><Text style={styles.text}>Paciente:</Text> {nomePaciente}</Text>
        <Text><Text style={styles.text}>Data:</Text> {dataAtendimento}</Text>
        <Text><Text style={styles.text}>Descrição:</Text> {descricao}</Text>
        <Text><Text style={styles.text}>Horário:</Text> {horario}</Text>

    </View>
  );
};

const styles = {
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#4093ba",
    margin: 10,
    borderRadius: 5,
    },
    text: {
      fontWeight: "bold",
      marginBottom: 5,
    },
};

export default Atendimento;
