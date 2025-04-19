import React from 'react';
import PropTypes from 'prop-types';
import { Clock, MessageSquare, Award } from 'lucide-react';
import { Card, CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { useIssues } from '../../context/IssueContext';

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
};

const getMatchScoreColor = (score) => {
  if (score >= 90) return 'success';
  if (score >= 75) return 'primary';
  if (score >= 60) return 'warning';
  return 'danger';
};

const IssueCard = ({ issue, onSelect, savedState }) => {
  const navigate = useNavigate();
  const { saveIssue } = useIssues();

  const handleClick = () => {
    if (onSelect) {
      onSelect(issue);
    } else {
      navigate(`/issues/${issue.id}`);
    }
  };

  const getStatusBadge = () => {
    if (!savedState) return null;
    
    switch (savedState) {
      case 'INTERESTESTED':
        return (
          <Badge variant="info" className="absolute top-2 right-2">
            Interested
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge variant="warning" className="absolute top-2 right-2">
            In Progress
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge variant="success" className="absolute top-2 right-2">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      hover 
      className="relative transition-all duration-200 h-full flex flex-col"
      onClick={handleClick}
    >
      {getStatusBadge()}
      
      <CardBody className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <img 
            src={issue.repository.ownerAvatarUrl} 
            alt={issue.repository.name}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {issue.repository.fullName}
          </span>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
          {issue.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {issue.body}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {issue.labels.map(label => (
            <span 
              key={label.id}
              className="px-2 py-0.5 text-xs rounded-full"
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
        
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{formatDistanceToNow(new Date(issue.createdAt))}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span>{issue.comments}</span>
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between w-full">
          <Badge variant={difficultyColors[issue.difficulty]}>
            {issue.difficulty}
          </Badge>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-yellow-500" />
            <span className="text-sm font-medium">
              {issue.matchScore}% match
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

IssueCard.propTypes = {
  issue: PropTypes.shape({
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
  }).isRequired,
  onSelect: PropTypes.func,
  savedState: PropTypes.oneOf(['INTERESTESTED', 'IN_PROGRESS', 'COMPLETED']),
};

export default IssueCard; 