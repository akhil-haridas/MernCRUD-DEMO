import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = "https://mern-crud-backend-mvpm.onrender.com/api/user";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Toast.fire({
      icon: "error",
      text: error
    });
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
   Toast.fire({
     icon: "error",
     text: error.response.data.error,
   });
    return Promise.reject(error);
  }
);

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const getCountries = async () => {
  try {
    const response = await api.get("/countries");
    return response;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: "Error fetching countries",
    });
    throw error;
  }
};

export const getLanguages = async () => {
  try {
    const response = await api.get("/languages");
    return response;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: "Error fetching languages",
    });
    throw error;
  }
};

export const getStates = async (countryId) => {
  try {
    const response = await api.get(`/states/${countryId}`);
    return response;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: "Error fetching states",
    });
    throw error;
  }
};

export const getCities = async (stateId) => {
  try {
    const response = await api.get(`/cities/${stateId}`);
    return response;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: "Error fetching cities",
    });
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/createuser", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    Toast.fire({
      icon: "success",
      title: response.message,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await api.put("/updateuser", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    Toast.fire({
      icon: "success",
      title: "User updated successfully",
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const getAllusers = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/allusers?page=${page}&limit=${limit}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (userID) => {
  try {
    const response = await api.get(`/user/${userID}`);
    return response;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: "Error fetching user",
    });
    throw error;
  }
};


export const removeUser = async (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await api.delete(`/removeuser/${userID}`);
        resolve(response);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
      Toast.fire({
        icon: "error",
        text: "Error deleting user",
      });
    }
  });
};

