export interface IUser {
  html_url: string;
  id: number;
  login: string;
  avatar_url: string;
  repo_list?: IRepository[];
}

export interface IRepository {
  node_id: string,
  name: string,
  description: string | null,
  language: string | null,
  forks_count: number,
  html_url: string,
  watchers_count: number,
  stargazers_count: number,
}

export interface ApiError {
  message: string;
  status?: number;
  type: string;
}