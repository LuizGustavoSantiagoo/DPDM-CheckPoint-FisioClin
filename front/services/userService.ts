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
  } catch (error: any) {
    // Propaga o erro para quem chamou tratar corretamente (422, 401, etc.)
    console.error("Error creating post:", error);
    throw error;
  }
};

export const loginUser = async (userData: object) => {
  try {
    const response = await clienteApi.post("/login", userData);
    return response.data;
  } catch (error: any) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await clienteApi.get("/users");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (userData: object, userId: string) => {

  try {
    const response = await clienteApi.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw error;
  }

};