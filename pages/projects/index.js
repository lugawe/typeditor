import styles from "@/styles/projects.module.css";
import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/project_list_element";
import { getProjects as apiGetProjects } from "@/lib/api/project";

export default function ProjectsIndex() {
  // ...
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const data = await apiGetProjects();
    setProjects(data);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.projectlist}>
        {projects.map((p) => (
          <ProjectCard obj={p} key={p.id} />
        ))}
      </div>
      <button className={styles.button}>New Project</button>
    </div>
  );
}
