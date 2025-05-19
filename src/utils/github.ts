import { Octokit } from '@octokit/rest';

const octokit = new Octokit();
const USERNAME = 'hammadaiy';

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
}

export async function fetchUserRepositories(): Promise<Repository[]> {
  try {
    const response = await octokit.repos.listForUser({
      username: USERNAME,
      sort: 'updated',
      per_page: 100,
    });
    
    return response.data as Repository[];
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

export async function fetchFeaturedRepositories(): Promise<Repository[]> {
  const allRepos = await fetchUserRepositories();
  
  const featuredRepoNames = [
    'Line-Follower-with-Obstacle-Avoidance-Robot',
    'Snake-Game',
    'Movie-Search',
    'ChatSphere-An-AI-Chatbot',
    'Student-Management-System'
  ];
  
  const featuredRepos = featuredRepoNames
    .map(name => allRepos.find(repo => repo.name === name))
    .filter(repo => repo !== undefined) as Repository[];
    
  return featuredRepos;
}
