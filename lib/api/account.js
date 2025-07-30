import api from "./client";

export const createAccount = async (name, password) => {
  const res = await api.post("/accounts", { name, password });
  return res.data;
};

export const generateAccessToken = async (name, password) => {
  const res = await api.post("/accounts/access_token", { name, password });
  return res.data;
};
