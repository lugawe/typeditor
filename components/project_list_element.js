import React from 'react';

export default function ProjectCard({ obj }) {
    return (
        <div className="project-card">
            <h3>{obj.name}</h3>
            <p>{obj.description}</p>
        </div>
    );
}