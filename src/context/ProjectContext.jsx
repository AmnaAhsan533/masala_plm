
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { mockProjects } from "../data/mockProjects";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("masalaplm_projects");

    return savedProjects
      ? JSON.parse(savedProjects)
      : mockProjects;
  });

  useEffect(() => {
    localStorage.setItem(
      "masalaplm_projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: `PRJ-${String(Date.now()).slice(-6)}`,
      status: "Draft",
      currentStage: 1,
      progress: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProjects((prev) => [newProject, ...prev]);

    return newProject;
  };

  const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
  };

  const updateProject = (id, updates) => {
  setProjects((prev) =>
    prev.map((project) =>
      project.id === id
        ? { ...project, ...updates }
        : project
    )
  );
};

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        getProjectById,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjects must be used inside ProjectProvider"
    );
  }

  return context;
}
