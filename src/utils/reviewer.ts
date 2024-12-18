import { Developer, PullRequest } from '../types';

export function selectReviewer(developers: Developer[], pr: PullRequest): Developer | null {
  if (developers.length <= 1) return null;

  // Filter out the assignee
  const eligibleDevelopers = developers.filter(dev => dev.id !== pr.assigneeId);
  if (eligibleDevelopers.length === 0) return null;

  // Find developers with minimum review count
  const minReviews = Math.min(...eligibleDevelopers.map(dev => dev.reviewCount));
  const candidateDevelopers = eligibleDevelopers.filter(dev => dev.reviewCount === minReviews);

  // Randomly select one of the candidates
  return candidateDevelopers[Math.floor(Math.random() * candidateDevelopers.length)];
}