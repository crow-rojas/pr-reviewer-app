import React from 'react';
import { Developer } from '../types';
import { UserPlus, Trash2 } from 'lucide-react';

interface DeveloperListProps {
  developers: Developer[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
}

export function DeveloperList({ developers, onAdd, onRemove }: DeveloperListProps) {
  const [newName, setNewName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Developer name"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add
        </button>
      </form>

      <div className="space-y-2">
        {developers.map((dev) => (
          <div
            key={dev.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow"
          >
            <div>
              <h3 className="font-medium">{dev.name}</h3>
              <p className="text-sm text-gray-500">Reviews: {dev.reviewCount}</p>
            </div>
            <button
              onClick={() => onRemove(dev.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}