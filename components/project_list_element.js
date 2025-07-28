import React from 'react';
import { useRouter } from "next/router";

export default function ProjectCard({ obj }) {
    const router = useRouter();

    async function edit() {
        router.push('/editor');
    }

    return (
        <div className="project-card" onClick={edit}>
            <h3>{obj.name}</h3>
            <p>{obj.description}</p>
        </div>
    );
}