import api from "./client";

export const createAccount = async (name, password) => {
  const res = await api.post("", { name, password });
  return res.data;
};

export const generateAccessToken = async (name, password) => {
  const res = await api.post("", { name, password });
  return res.data;
};
