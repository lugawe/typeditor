import React from 'react';
import styles from '../styles/projects.module.css';
import ProjectCard from '@/components/project_list_element';

export default function ProjectsOverview() {
    const projects = [
        { id: 1, name: 'Project 1', description: '…' },
        { id: 2, name: 'Project 2', description: '…' },
        { id: 3, name: 'Project 3', description: '…' },
    ];
    return (
        <div className={styles.wrapper}>
            <div className={styles.projectlist}>
                {projects.map(p => (
                    <ProjectCard obj={p} key={p.id} />
                ))}
            </div>
            <button className={styles.button}>New Project</button>
        </div>
    );
}
