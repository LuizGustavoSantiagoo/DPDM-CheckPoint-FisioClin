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
  data_nascimento?: string;
  updated_at?: string;
  created_at?: string;
};

export type Paciente = PacienteCreate & { id: number };

export const createPaciente = async (postData: PacienteCreate) => {
  try {

    const response = await clienteApi.post("/pacientes", postData);
    return response;

  } catch (error: any) {
    const status = error?.response?.status;
    const data = error?.response?.data;
    throw error;
  }
};

export const getPacientes = async (): Promise<Paciente[]> => {
  try {
    const response = await clienteApi.get<{ message: string; data: Paciente[] }>("/pacientes");
    return response.data?.data ?? [];
  } catch (error) {
    throw error;
  }
};

export const searchPacientes = async (nome: string): Promise<Paciente[]> => {
  try {
    const safeNome = encodeURIComponent(nome);
    const response = await clienteApi.get<{ message: string; data: Paciente[] }>(`/pacientes/nome/${safeNome}`);
    return response.data?.data ?? [];
  } catch (error) {
    console.error("Error searching pacientes:", error);
    throw error;
  }
}

export const getPacienteById = async (id: number): Promise<Paciente> => {
  try {
    const response = await clienteApi.get<{ message: string; data: Paciente }>(`/pacientes/${id}`);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching paciente by ID:", error);
    throw error;
  }
};

export const deletePaciente = async (id: number): Promise<void> => {
  try {
    await clienteApi.delete(`/pacientes/${id}`);
  } catch (error) {
    console.error("Error deleting paciente:", error);
    throw error;
  }
};