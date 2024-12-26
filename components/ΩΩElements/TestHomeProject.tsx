"use client"; // Assicurati che tu stia usando il contesto Client in Next.js

import React, { useState, useEffect } from 'react';
import { getTestProject } from "@/sanity/sanity.query";
import { TestProject } from "@/types/TestProject";
import "./proj.scss";

export default function ProjectTest() {
    const [projectsTest, setProjectsTest] = useState<TestProject[]>([]);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchProjects = async () => {
            const fetchedProjects: TestProject[] = await getTestProject();
            setProjectsTest(fetchedProjects);
        };
        fetchProjects();
    }, []);

    // Ottieni un array unico di tecnologie
    const uniqueTechnologies = Array.from(new Set(projectsTest.flatMap(project => project.technologies.map(tech => tech.name))));

    // Filtra i progetti in base alla tecnologia selezionata
    const filteredProjects = selectedTech 
        ? projectsTest.filter(project => project.technologies.some(tech => tech.name === selectedTech))
        : projectsTest;

    return (
        <div>
            <h2>Filtra per tecnologia:</h2>
            <div className="tech-buttons">
                <button onClick={() => setSelectedTech(null)}>Tutte le tecnologie</button>
                {uniqueTechnologies.map(tech => (
                    <button 
                        key={tech} 
                        onClick={() => setSelectedTech(tech)} 
                        className={selectedTech === tech ? 'active' : ''} // Aggiungi una classe attiva se selezionata
                    >
                        {tech}
                    </button>
                ))}
            </div>

            {filteredProjects.map((project) => (
                <div key={project._id} className={project.importance === 'main' ? 'main' : 'other-style'}>
                    <h3>{project.name}</h3>
                    <h3>{project.importance}</h3>
                    <ul>
                        {project.technologies.map((tech) => (
                            <li key={tech._id}>{tech.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

