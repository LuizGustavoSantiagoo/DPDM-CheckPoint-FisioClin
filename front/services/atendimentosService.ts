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
  data_atendimento: Date | undefined;
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
    console.log(response.data);
  } catch (error) {
    console.error("Erro ao buscar atendimentos:", error);
    throw error;
  }
};

export const createAtendimento = async (postData: AtendimentoCreate) => {
  try {
    const response = await clienteApi.post("/atendimentos", postData);
    return response;
    console.log("Atendimento criado com sucesso:", response.data);
  } catch (error: any) {
    const status = error?.response?.status;
    const data = error?.response?.data;
    console.log("Erro ao criar atendimento:", { status, data });
    throw error;
  }
};
