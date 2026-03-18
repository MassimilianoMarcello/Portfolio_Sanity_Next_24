// components/Project_Home/ProjectListClient.tsx
// Client Component — handles interactive state (drawer open/close)
"use client";

import { useState, useCallback } from 'react';
import { Project } from '@/types/projects';
import ProjectList from './ProjectList';

interface ProjectListClientProps {
  projects: Project[];
}

export default function ProjectListClient({ projects }: ProjectListClientProps) {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const toggleProjectInfo = useCallback((projectId: string | null) => {
    setOpenProjectId((prev) => (prev === projectId ? null : projectId));
  }, []);

  return (
    <ProjectList
      projects={projects}
      openProjectId={openProjectId}
      toggleProjectInfo={toggleProjectInfo}
    />
  );
}