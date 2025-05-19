import React from 'react';
import { Repository } from '@/utils/github';

interface RepoListItemProps {
  repo: Repository;
}

export default function RepoListItem({ repo }: RepoListItemProps) {
  const formatRepoName = (name: string) => {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };  
  
  return (    
    <div className="p-2 mb-1.5 border-2 border-[#565449] hover:bg-[var(--card-hover)] 
                  transition-all duration-300 rounded-md hover:translate-x-1 hover:shadow-md
                  relative group overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1 bg-[var(--primary)] opacity-30 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>      <a 
        href={repo.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <h4 className="font-medium text-[var(--primary)] hover:underline truncate text-sm flex items-center gap-2">
          {formatRepoName(repo.name)}
        </h4>
        
        <p className="text-xs text-[var(--primary)] opacity-70 my-1.5 line-clamp-1">
          {repo.description || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs bg-[#11120d] border border-[var(--primary)] border-opacity-40 px-2 py-0.5 rounded-md text-[var(--primary)] opacity-90">
            {repo.language || 'None'}
          </span>
          <div className="flex items-center gap-3 text-xs text-[var(--primary)] opacity-70">
            <span className="flex items-center">⭐ {repo.stargazers_count}</span>
            <span className="flex items-center">🍴 {repo.forks_count}</span>
          </div>
        </div>
      </a>
    </div>
  );
}
