import { fetchUserRepositories, fetchFeaturedRepositories, Repository } from '@/utils/github';
import { useState, useEffect } from 'react';

const CUSTOM_DEMO_URLS: Record<string, string> = {
  'Snake-Game': 'https://slikosnek.vercel.app/',
  'Movie-Search': 'https://moviesearch-application.vercel.app/'
};

export function useGithubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [featuredRepos, setFeaturedRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  useEffect(() => {
    if (hasFetched) return;
    
    async function loadRepos() {
      try {
        setIsLoading(true);
        
        const [allRepos, featured] = await Promise.all([
          fetchUserRepositories(),
          fetchFeaturedRepositories()
        ]);
        
        const customizedFeatured = featured.map(repo => {
          if (repo.name && CUSTOM_DEMO_URLS[repo.name]) {
            return {
              ...repo,
              homepage: CUSTOM_DEMO_URLS[repo.name]
            };
          }
          return repo;
        });
        
        setRepos(allRepos);
        setFeaturedRepos(customizedFeatured);
        setHasFetched(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch repositories'));
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadRepos();
    }, 50);
    
    return () => clearTimeout(timer);
  }, [hasFetched]);

  return { repos, featuredRepos, isLoading, error };
}
