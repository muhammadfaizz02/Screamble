import { instance } from "../axios/index";

// Function for register user endpoint
async function registerUser(name, email, password) {
  try {
    const response = await instance.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function for login user endpoint
async function loginUser(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function for create book endpoint
async function createProduct(formData) {
  try {
    const response = await instance.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function for get all books endpoint
async function getAllProducts() {
  try {
    const response = await instance.get("/products ");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function for edit book endpoint
async function editProduct(id, name, description, price, discount) {
  try {
    const response = await instance.put(`/products/${id}`, {
      name,
      description,
      price,
      discount,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function for delete book endpoint
async function deleteProduct(id) {
  try {
    const response = await instance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getProductDetailById(id) {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export {
  registerUser,
  loginUser,
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  getProductDetailById,
};
