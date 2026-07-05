import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1";

const apiProcessor = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
};

// post new user

export const postNewUser = (data) => {
  const obj = {
    method: "post",
    url: baseUrl + "/users",
    data,
  };
  return apiProcessor(obj);
};
