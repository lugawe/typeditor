import React from "react";
import { useRouter } from "next/router";

export default function ProjectCard({ obj }) {
  const router = useRouter();

  const handleClick = async () => {
    await router.push("/projects/" + obj.id);
  };

  return (
    <div className="project-card" onClick={handleClick}>
      <h3>{obj.name}</h3>
      <p>{obj.description}</p>
    </div>
  );
}
