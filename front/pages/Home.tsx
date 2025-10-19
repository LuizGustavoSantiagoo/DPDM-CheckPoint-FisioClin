import { View, Text } from 'react-native';

import Header from '../components/Header';
import Atendimento from '../components/Atendimento';

const Home = () => {
  return (
    <View>
      <Header />
      <Text style={{ fontSize: 24, textAlign: 'center' }}>Bem Vindo</Text>
      <Text style={{ fontSize: 18, textAlign: 'center', textDecorationLine: 'underline' }}>Proximos atendimentos:</Text>

      <Atendimento
        nomePaciente="João Silva"
        dataAtendimento="2024-06-20"
        descricao="Consulta de rotina para avaliação geral da saúde."
        horario="14:00"
      />

    </View>
  );
}

export default Home;