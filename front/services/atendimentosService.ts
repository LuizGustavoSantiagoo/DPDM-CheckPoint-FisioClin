import clienteApi from "./clienteApi";
/**
 * Função para criar um novo post na API.
 * @param {object} postData - Os dados do post a serem enviados.
 * Ex: { title: 'foo', body: 'bar', userId: 1 }
 * @returns {Promise<object>} A resposta da API com o post criado.
 */

export type AtendimentoCreate = {
  paciente_id: number;
  fisio_id: number;
  data_atendimento: Date;
  descricao?: string;
  observacao?: string;
  observacao_paciente?: string;
};

export const getAtendimentos = async (): Promise<AtendimentoCreate[]> => {
  try {
    const response = await clienteApi.get<{
      message: string;
      data: AtendimentoCreate[];
    }>("/atendimentos");
    return response.data?.data ?? [];
  } catch (error) {
    throw error;
  }
};

export const createAtendimento = async (postData: AtendimentoCreate) => {
  try {
    const response = await clienteApi.post("/atendimentos", postData);
    return response;
  } catch (error: any) {
    throw error;
  }
};
