import axios from "axios";

const baseUrl = import.meta.env.VITE_ROOT_API + "/api/v1";

const getAccessJWT = () => {
  return localStorage.getItem("accessJWT");
};

const apiProcessor = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error?.response?.data.error || error.message,
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

// login user

export const loginUser = (data) => {
  const obj = {
    method: "post",
    url: baseUrl + "/users/login",
    data,
  };

  return apiProcessor(obj);
};

//get user Profile

export const getUser = () => {
  const users = {
    method: "get",
    url: baseUrl + "/users",
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(users);
};

//post new transaction

export const postTransaction = (data) => {
  const transaction = {
    method: "post",
    url: baseUrl + "/transaction",
    data,
    headers: {
      Authorization: getAccessJWT(),
    },
  };

  return apiProcessor(transaction);
};

//get transaction fro specific user
export const getTransaction = () => {
  const transaction = {
    method: "get",
    url: baseUrl + "/transaction",

    headers: {
      Authorization: getAccessJWT(),
    },
  };

  return apiProcessor(transaction);
};

//delete transasction

export const deleteTransaction = (data) => {
  const transaction = {
    method: "delete",
    url: baseUrl + "/transaction",
    data,
    headers: {
      Authorization: getAccessJWT(),
    },
  };

  return apiProcessor(transaction);
};

export const patchTransaction = (id, data) => {
  const transaction = {
    method: "patch",
    url: baseUrl + "/transaction/" + id,
    data,
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(transaction);
};

export const getEstimate = (data) => {
  const transaction = {
    method: "post",
    url: baseUrl + "/estimate",
    data,
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(transaction);
};
