import React from 'react';
import { ReviewHistory } from '../types';
import { ExternalLink } from 'lucide-react';

interface ReviewHistoryListProps {
  history: ReviewHistory[];
  developers: { [key: string]: string };
}

export function ReviewHistoryList({ history, developers }: ReviewHistoryListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Review History</h2>
      <div className="space-y-2">
        {history.map((review) => (
          <div
            key={review.id}
            className="p-4 bg-white rounded-lg shadow"
          >
            <p className="font-medium">{review.prTitle}</p>
            <div className="mt-2 space-y-1 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Assignee: {developers[review.assigneeId]}</span>
                <span>Reviewer: {developers[review.developerId]}</span>
              </div>
              <div className="flex justify-between">
                <span>{new Date(review.date).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  {review.prUrl && (
                    <a
                      href={review.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                    >
                      PR <ExternalLink size={14} />
                    </a>
                  )}
                  {review.jiraUrl && (
                    <a
                      href={review.jiraUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                    >
                      Jira <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}