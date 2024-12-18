import React, { useState, useEffect } from 'react';
import { Developer, ReviewHistory, PullRequest } from './types';
import { loadDevelopers, saveDevelopers, loadHistory, saveHistory } from './utils/storage';
import { selectReviewer } from './utils/reviewer';
import { DeveloperList } from './components/DeveloperList';
import { ReviewHistoryList } from './components/ReviewHistory';
import { PullRequestForm } from './components/forms/PullRequestForm';
import { Github } from 'lucide-react';

function App() {
  const [developers, setDevelopers] = useState<Developer[]>(loadDevelopers());
  const [history, setHistory] = useState<ReviewHistory[]>(loadHistory());

  useEffect(() => {
    saveDevelopers(developers);
  }, [developers]);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addDeveloper = (name: string) => {
    setDevelopers([
      ...developers,
      { id: crypto.randomUUID(), name, reviewCount: 0 },
    ]);
  };

  const removeDeveloper = (id: string) => {
    setDevelopers(developers.filter((dev) => dev.id !== id));
  };

  const handlePullRequest = (pr: PullRequest) => {
    const reviewer = selectReviewer(developers, pr);
    if (!reviewer) return;

    // Update reviewer's review count
    setDevelopers(
      developers.map((dev) =>
        dev.id === reviewer.id
          ? { ...dev, reviewCount: dev.reviewCount + 1 }
          : dev
      )
    );

    // Add to history
    const newReview: ReviewHistory = {
      id: crypto.randomUUID(),
      developerId: reviewer.id,
      assigneeId: pr.assigneeId,
      date: new Date().toISOString(),
      prTitle: pr.title,
      prUrl: pr.prUrl,
      jiraUrl: pr.jiraUrl,
    };

    setHistory([newReview, ...history]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Github />
            PR Reviewer Assignment
          </h1>
          <p className="text-gray-600 mt-2">
            Fairly distribute pull request reviews among team members
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <DeveloperList
            developers={developers}
            onAdd={addDeveloper}
            onRemove={removeDeveloper}
          />

          <div className="border-t pt-6">
            <PullRequestForm
              developers={developers}
              onSubmit={handlePullRequest}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ReviewHistoryList
            history={history}
            developers={Object.fromEntries(developers.map((dev) => [dev.id, dev.name]))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;