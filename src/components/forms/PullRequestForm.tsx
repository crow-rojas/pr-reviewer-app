import React from 'react';
import { Developer, PullRequest } from '../../types';
import { LinkIcon } from 'lucide-react';
import { DeveloperSelect } from '../ui/DeveloperSelect';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface PullRequestFormProps {
  developers: Developer[];
  onSubmit: (pr: PullRequest) => void;
}

export function PullRequestForm({ developers, onSubmit }: PullRequestFormProps) {
  const [title, setTitle] = React.useState('');
  const [assigneeId, setAssigneeId] = React.useState('');
  const [prUrl, setPrUrl] = React.useState('');
  const [jiraUrl, setJiraUrl] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && assigneeId) {
      onSubmit({
        title: title.trim(),
        assigneeId,
        prUrl: prUrl.trim(),
        jiraUrl: jiraUrl.trim(),
      });
      setTitle('');
      setAssigneeId('');
      setPrUrl('');
      setJiraUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="PR Title"
        value={title}
        onChange={setTitle}
        placeholder="Enter PR title"
        required
      />

      <DeveloperSelect
        label="Assignee"
        developers={developers}
        value={assigneeId}
        onChange={setAssigneeId}
        placeholder="Select PR assignee"
        required
      />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <LinkIcon size={16} className="text-gray-500" />
          <Input
            value={prUrl}
            onChange={setPrUrl}
            placeholder="GitHub PR URL (optional)"
          />
        </div>

        <div className="flex items-center gap-2">
          <LinkIcon size={16} className="text-gray-500" />
          <Input
            value={jiraUrl}
            onChange={setJiraUrl}
            placeholder="Jira ticket URL (optional)"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!title.trim() || !assigneeId}
        className="w-full"
      >
        Assign Reviewer
      </Button>
    </form>
  );
}