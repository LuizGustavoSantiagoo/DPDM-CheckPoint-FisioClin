import { View, Text, StyleSheet } from "react-native";

interface AtendimentoProps {
  nomePaciente: string;
  dataAtendimento: string;
  descricao: string;
  horario?: string;
  fisio?: string;
  observacao?: string;
  observacaoPaciente?: string;
}

const Atendimento = ({nomePaciente, dataAtendimento, descricao, horario, fisio,observacao, observacaoPaciente}: AtendimentoProps) => {
  return (
    <View style={styles.container}>
        <Text><Text style={styles.text}>Paciente:</Text> {nomePaciente}</Text>
        <Text><Text style={styles.text}>Fisioterapeuta:</Text> {fisio}</Text>
        <Text><Text style={styles.text}>Data do Atendimento:</Text> {dataAtendimento}</Text> 
        <Text><Text style={styles.text}>Descrição:</Text> {descricao}</Text> 
        <Text><Text style={styles.text}>Observação:</Text> {observacao}</Text>
        <Text><Text style={styles.text}>Observação do Paciente:</Text> {observacaoPaciente}</Text> 
        { horario && <Text><Text style={styles.text}>Horário:</Text> {horario}</Text> }
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Atendimento;
