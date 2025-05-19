import React from 'react';
import Image from 'next/image';
import { Repository } from '@/utils/github';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  project: Repository;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatProjectName = (name: string) => {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCardStyle = () => {
    const hash = project.name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return { backgroundImage: `linear-gradient(135deg, rgba(86, 84, 73, 1) 0%, rgba(65, 63, 55, 0.95) 100%)` };
  };  return (    <div 
      className="bg-[var(--card-bg)] rounded-md p-5 transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px] hover:scale-[1.02] flex flex-col h-[280px] relative overflow-hidden cursor-pointer border-2 border-[#565449] group"
      style={getCardStyle()}
    ><div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(216,207,188,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>      <h3 className="text-base font-semibold mb-1.5 text-[var(--primary)] break-words">
        {project.name ? formatProjectName(project.name) : "Unnamed Project"}
      </h3>        <div className="flex items-center gap-2 mb-2 flex-wrap">        {project.language && (
          <span className="text-xs bg-[#11120d] border border-[var(--primary)] border-opacity-40 text-[var(--primary)] py-0.5 px-2 rounded-md font-medium">
            {project.language}
          </span>
        )}
          {project.topics?.slice(0, 1).map((topic, index) => (
          <span 
            key={index} 
            className="text-xs bg-[#11120d] border border-[var(--primary)] border-opacity-30 text-[var(--primary)] py-0.5 px-2 rounded-md font-medium"
          >
            {topic}
          </span>
        ))}      </div>        <div className="mb-3 flex-grow overflow-y-auto custom-scrollbar hide-scrollbar pr-1">
          <p className="text-xs md:text-sm text-[var(--foreground)] opacity-90 whitespace-pre-wrap">
            {project.description || "No description available for this project. Visit the GitHub repository for more details."}
          </p>
        </div>
        <div className="flex gap-2 mt-1">
        <a 
          href={project.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-primary text-xs py-1 flex-1 flex items-center justify-center gap-1.5"
        >
          <FaGithub className="text-sm" />
          GitHub
        </a>
        
        {project.homepage && (
          <a 
            href={project.homepage} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary text-xs py-1 flex-1 flex items-center justify-center gap-1.5"
          >
            <FiExternalLink className="text-sm" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
