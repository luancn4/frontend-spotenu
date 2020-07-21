import axios from "axios";

const baseUrl = "http://localhost:3000/users";

export const login = (body) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, body);

    localStorage.setItem("token", response.data.token);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const userSignup = (body) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`);
  } catch (err) {
    console.error(err.message);
  }
};

export const bandSignup = (body) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/signup/band`);
  } catch (err) {
    console.error(err.message);
  }
};
