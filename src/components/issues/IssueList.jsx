import React from 'react';
import PropTypes from 'prop-types';
import IssueCard from './IssueCard';
import { AlertCircle } from 'lucide-react';

const IssueList = ({ 
  issues,
  loading = false,
  emptyMessage = "No issues found",
  onSelect,
  isSaved = false
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }
  
  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <AlertCircle size={40} className="text-gray-400 dark:text-gray-500 mb-3" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
          No issues found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {emptyMessage}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map(issue => {
        const savedIssue = isSaved ? issue : undefined;
        return (
          <IssueCard 
            key={issue.id} 
            issue={issue} 
            onSelect={onSelect}
            savedState={savedIssue?.savedState}
          />
        );
      })}
    </div>
  );
};

IssueList.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']).isRequired,
      matchScore: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
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
      savedState: PropTypes.oneOf(['INTERESTED', 'IN_PROGRESS', 'COMPLETED']),
    })
  ).isRequired,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onSelect: PropTypes.func,
  isSaved: PropTypes.bool,
};

export default IssueList; 