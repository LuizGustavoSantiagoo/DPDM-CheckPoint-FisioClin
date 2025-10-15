import clienteApi from "./clienteApi";

/**
 * Função para criar um novo post na API.
 * @param {object} postData - Os dados do post a serem enviados.
 * Ex: { title: 'foo', body: 'bar', userId: 1 }
 * @returns {Promise<object>} A resposta da API com o post criado.
 */
    
export const createPost = async (postData: object) => {
  try {
    const response = await clienteApi.post("/users", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const loginUser = async (userData: object) => {
  try {
    const response = await clienteApi.post("/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export const getUsers = async () => {
  try {
    const response = await clienteApi.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};