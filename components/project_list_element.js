import React from 'react';
import { useRouter } from "next/router";

export default function ProjectCard({ obj }) {
    const router = useRouter();

    const handleClick = () => {
    router.push(`/editor?project=${obj.name}`);
  };

    return (
        <div className="project-card" onClick={handleClick}>
            <h3>{obj.name}</h3>
            <p>{obj.description}</p>
        </div>
    );
}