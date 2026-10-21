import React from 'react';
import { Code } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative z-10">
      <div className="flex items-center space-x-4 mb-12">
        <Code className="w-8 h-8 text-lime-400" />
        <h2 className="text-3xl font-bold font-mono tracking-widest uppercase">
          Active_Modules<span className="text-lime-400">::Projects</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  );
};
