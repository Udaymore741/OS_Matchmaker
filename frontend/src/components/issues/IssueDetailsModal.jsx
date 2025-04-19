import React from 'react';
import PropTypes from 'prop-types';
import { X, Clock, MessageSquare, Award, Calendar, GitBranch, Timer } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import Badge from '../ui/Badge';

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
};

const IssueDetailsModal = ({ issue, onClose }) => {
  if (!issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={issue.repository.ownerAvatarUrl} 
              alt={issue.repository.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {issue.repository.fullName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {issue.title}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <GitBranch size={16} />
              <span>Repository:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {issue.repository.name}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              <span>Created:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDate(issue.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MessageSquare size={16} />
              <span>Comments:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {issue.comments}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Timer size={16} />
              <span>Est. Time:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {issue.estimatedTime}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {issue.labels.map(label => (
              <span 
                key={label.id}
                className="px-2 py-1 text-sm rounded-full"
                style={{ 
                  backgroundColor: `#${label.color}20`, 
                  color: `#${label.color}`,
                  border: `1px solid #${label.color}40`
                }}
              >
                {label.name}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Description
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {issue.body}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant={difficultyColors[issue.difficulty]} size="lg">
              {issue.difficulty}
            </Badge>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-yellow-500" />
              <span className="text-lg font-medium">
                {issue.matchScore}% match
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

IssueDetailsModal.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']).isRequired,
    matchScore: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    estimatedTime: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
    repository: PropTypes.shape({
      name: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      ownerAvatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default IssueDetailsModal; 