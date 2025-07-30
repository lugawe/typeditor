import styles from "@/styles/projects.module.css";
import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/project_list_element";
import {
  getProjects as apiGetProjects,
  createProject as apiCreateProject
} from "@/lib/api/project";
import Breadcrumbs from "@/components/breadcrumbs";

export default function ProjectsIndex() {
  // ...
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const getProjects = async () => {
    const data = await apiGetProjects();
    setProjects(data);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    const newProject = await apiCreateProject(newProjectName.trim(), "");

    setProjects([...projects, newProject]);
    setNewProjectName("");
    setShowInput(false);
  };

  const breadcrumbsItems = [{ label: "Project Overview", href: "/projects" }];

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbContainer}>
        <Breadcrumbs items={breadcrumbsItems} showBack={true} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.projectlist}>
          {projects.map((p) => (
            <ProjectCard obj={p} key={p.id} />
          ))}
        </div>
        {showInput ? (
          <div style={{ marginTop: "1rem", alignItems: "center" }}>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter project name"
              style={{
                padding: "8px",
                borderRadius: "4px",
                marginRight: "8px",
                flex: 1
              }}
            />
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button onClick={handleCreateProject} className={styles.button}>
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowInput(false);
                  setNewProjectName("");
                }}
                className={styles.button}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)} className={styles.button}>
            New Project
          </button>
        )}{" "}
      </div>
    </div>
  );
}
