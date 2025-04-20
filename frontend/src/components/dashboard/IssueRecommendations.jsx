import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IssueList from '../issues/IssueList';
import IssueDetailsModal from '../issues/IssueDetailsModal';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const IssueRecommendations = ({
  issues,
  loading = false,
  title = "Recommended Issues",
  limit = 3,
  showViewAll = true
}) => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
  };
  
  const closeModal = () => {
    setSelectedIssue(null);
  };
  
  const displayedIssues = issues.slice(0, limit);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        {showViewAll && (
          <Button
            variant="ghost"
            size="sm"
            rightIcon={<ArrowRight size={16} />}
            onClick={() => navigate('/issues')}
          >
            View All
          </Button>
        )}
      </div>
      
      <IssueList 
        issues={displayedIssues} 
        loading={loading} 
        onSelect={handleIssueSelect}
        emptyMessage="No recommendations yet. Try refreshing or adjusting your filters."
      />
      
      {showViewAll && issues.length > limit && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/issues')}
          >
            View All Recommendations
          </Button>
        </div>
      )}
      
      {selectedIssue && (
        <IssueDetailsModal 
          issue={selectedIssue} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

IssueRecommendations.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']).isRequired,
      matchScore: PropTypes.number.isRequired,
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
    })
  ).isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  limit: PropTypes.number,
  showViewAll: PropTypes.bool,
};

export default IssueRecommendations; 