import React from 'react';

interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

export default function SkillCategory({ title, skills, icon }: SkillCategoryProps) {
  return (    <div className="mb-4">      <div className="flex items-center gap-2 mb-1">
        <span className="text-[var(--primary)] bg-[var(--background)] bg-opacity-30 p-1 rounded-md">{icon}</span>
        <h3 className="text-sm font-semibold text-[var(--primary)]">{title}</h3>
      </div>
      <div className="h-0.5 w-16 bg-[#565449] opacity-60 mb-2 ml-6 rounded-full"></div>
        <div className="flex flex-wrap gap-1.5">        {skills.map((skill, index) => {
          const getSkillBackground = () => {
            return {
              backgroundColor: '#565449',
              borderLeft: `3px solid var(--primary)`,
              opacity: 0.85
            };
          };
            return (
            <span
              key={index}              className="px-2 py-1 text-xs text-[var(--primary)] rounded-md transition-all duration-300 
                      hover:opacity-100 hover:scale-105 border border-[var(--primary)] border-opacity-20
                      animate-fade-in"
              style={{
                ...getSkillBackground(),
                animationDelay: `${index * 100}ms`
              }}
            >
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
}
