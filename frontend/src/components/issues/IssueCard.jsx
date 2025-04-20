import React from 'react';
import PropTypes from 'prop-types';
import { Clock, MessageSquare, Award, BookmarkPlus } from 'lucide-react';
import { Card, CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from '../../utils/dateUtils';

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

  const handleClick = () => {
    if (onSelect) {
      onSelect(issue);
    } else {
      // Ensure we have a valid issue number before navigating
      if (issue?.number) {
        navigate(`/issue/${issue.number}`, { state: { issue } });
      } else {
        console.error('Invalid issue number:', issue);
      }
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    // Save functionality can be implemented later
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
      className="relative transition-all duration-200 h-full flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      {getStatusBadge()}
      
      <CardBody className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <img 
            src={issue.author?.avatarUrl || 'https://github.com/identicons/default.png'} 
            alt={issue.author?.login || 'Author'}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {issue.author?.login || 'Unknown'}
          </span>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
          {issue.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {issue.bodyText}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {issue.labels?.nodes?.map((label, index) => (
            <span 
              key={index}
              className="px-2 py-0.5 text-xs rounded-full"
              style={{ 
                backgroundColor: `#${label?.color || 'a2eeef'}20`, 
                color: `#${label?.color || 'a2eeef'}`,
                border: `1px solid #${label?.color || 'a2eeef'}40`
              }}
            >
              {typeof label === 'object' ? label.name : label}
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
            <span>{issue.comments?.totalCount || 0} comments</span>
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between w-full">
          <Badge variant={difficultyColors[issue.difficulty] || 'primary'}>
            {issue.difficulty || issue.state || 'open'}
          </Badge>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-yellow-500" />
            <span className="text-sm font-medium">
              {issue.matchScore || 0}% match
            </span>
            {!savedState && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                leftIcon={<BookmarkPlus size={16} />}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

IssueCard.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    state: PropTypes.string,
    difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']),
    matchScore: PropTypes.number,
    comments: PropTypes.shape({
      totalCount: PropTypes.number
    }),
    author: PropTypes.shape({
      login: PropTypes.string,
      avatarUrl: PropTypes.string
    }),
    labels: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string
          })
        ])
      )
    })
  }).isRequired,
  onSelect: PropTypes.func,
  savedState: PropTypes.oneOf(['INTERESTESTED', 'IN_PROGRESS', 'COMPLETED'])
};

export default IssueCard; 