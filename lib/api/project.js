import api from "./client";

export const getProjects = async () => {
  return [
    { id: 1, name: "Project 1", description: "..." },
    { id: 2, name: "Project 2", description: "..." },
    { id: 3, name: "Project 3", description: "..." }
  ];
};

export const createProject = async (name, description) => {
  return { name, description };
};

export const createPDF = async (projectId) => {
  const response = await fetch("/main.pdf");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  return url;
};
