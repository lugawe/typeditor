import api from "./client";

export const getProjects = async () => {
  return [
    { id: 1, name: "Project 1"},
    { id: 2, name: "Project 2"},
    { id: 3, name: "Project 3"}
  ];
};

export const createProject = async (name) => {
  return { name };
};

export const createPDF = async (projectId) => {
  const response = await fetch("/main.pdf");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  return url;
};
