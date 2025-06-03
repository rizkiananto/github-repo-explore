export interface IUser {
  id: number;
  login: string;
  avatar_url: string;
  repo_list?: IRepository[];
}

export interface IRepository {
  node_id: string,
  name: string,
  description: string,
  language: string,
  forks_count: number,
  html_url: string,
  watchers_count: number,
  stargazers_count: number,
}