export interface GithubIssueListItemI {
  title: string;
  user: string;
  labels: string[];
  state: string;
  assignee: string;
  comments: number;
  body: string;
  url: string;
  repo: string;
  created?: string;
  updated?: string;
}

export interface GithubIssueListItemLabelI {
  name: string;
  color: string;
}
