export interface Developer {
  id: string;
  name: string;
  reviewCount: number;
}

export interface ReviewHistory {
  id: string;
  developerId: string;
  assigneeId: string;
  date: string;
  prTitle: string;
  prUrl: string;
  jiraUrl: string;
}

export interface PullRequest {
  title: string;
  assigneeId: string;
  prUrl: string;
  jiraUrl: string;
}