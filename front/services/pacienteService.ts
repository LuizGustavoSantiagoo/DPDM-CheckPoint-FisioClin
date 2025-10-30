import clienteApi from "./clienteApi";

/**
 * Função para criar um novo post na API.
 * @param {object} postData - Os dados do post a serem enviados.
 * Ex: { title: 'foo', body: 'bar', userId: 1 }
 * @returns {Promise<object>} A resposta da API com o post criado.
 */
    
export type PacienteCreate = {
  nome: string;
  sobrenome: string;
  endereco: string;
  telefone: string;
  data_nascimento?: string; // formato recomendado: YYYY-MM-DD
};

export const createPaciente = async (postData: PacienteCreate) => {
  try {

    const response = await clienteApi.post("/pacientes", postData);
    return response;

  } catch (error: any) {
    const status = error?.response?.status;
    const data = error?.response?.data;
    console.error("Error creating paciente:", status, data ?? error?.message);
    throw error;
  }
};

export const getPacientes = async () => {
  try {
    const response = await clienteApi.get("/pacientes");
    return response.data;
  } catch (error) {
    console.error("Error fetching pacientes:", error);
  }
};