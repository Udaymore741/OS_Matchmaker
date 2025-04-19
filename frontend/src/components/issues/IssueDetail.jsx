import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { 
  Clock, MessageSquare, GitBranch, Star, Eye, 
  Award, BookmarkPlus, PlayCircle, CheckCircle, 
  ExternalLink, FileCode, Calendar
} from 'lucide-react';
import { useIssues } from '../../context/IssueContext';
import { formatDate } from '../../utils/dateUtils';

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

const IssueDetail = ({ issue, onClose }) => {
  const { saveIssue, updateSavedIssue, removeSavedIssue } = useIssues();
  const [notes, setNotes] = useState(
    issue.savedState ? issue.notes || '' : ''
  );
  
  const savedState = issue.savedState || 'NONE';
  
  const handleSave = (state) => {
    if (issue.savedState) {
      if (state === 'NONE') {
        removeSavedIssue(issue.id);
      } else {
        updateSavedIssue(issue.id, { savedState: state, notes });
      }
    } else {
      saveIssue(issue, state, notes);
    }
    if (onClose) onClose();
  };
  
  const visitRepository = () => {
    window.open(issue.repository.url, '_blank');
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={issue.repository.ownerAvatarUrl} 
                alt={issue.repository.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {issue.repository.fullName}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                #{issue.number}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {issue.title}
            </h2>
            
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
                  title={label.description}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>
          
          <Badge
            variant={getMatchScoreColor(issue.matchScore)}
            size="lg"
          >
            {issue.matchScore}% match
          </Badge>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {issue.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <FileCode size={16} />
              <span>{issue.language}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              <span>Created {formatDate(issue.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MessageSquare size={16} />
              <span>{issue.comments} comments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Eye size={16} />
              <span>{issue.views} views</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Repository Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Star size={16} />
                <span>{issue.repository.stars} stars</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <GitBranch size={16} />
                <span>{issue.repository.forks} forks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Eye size={16} />
                <span>{issue.repository.watchers} watchers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Award size={16} />
                <span>{issue.repository.score} score</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Notes
            </h3>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes here..."
            />
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={visitRepository}
              rightIcon={<ExternalLink size={16} />}
            >
              Visit Repository
            </Button>
          </div>
          
          <div className="flex gap-2">
            {savedState === 'NONE' ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSave('INTERESTED')}
                  leftIcon={<BookmarkPlus size={16} />}
                >
                  Save
                </Button>
                <Button
                  onClick={() => handleSave('IN_PROGRESS')}
                  leftIcon={<PlayCircle size={16} />}
                >
                  Start Working
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSave('NONE')}
                >
                  Remove
                </Button>
                {savedState === 'INTERESTED' && (
                  <Button
                    onClick={() => handleSave('IN_PROGRESS')}
                    leftIcon={<PlayCircle size={16} />}
                  >
                    Start Working
                  </Button>
                )}
                {savedState === 'IN_PROGRESS' && (
                  <Button
                    onClick={() => handleSave('COMPLETED')}
                    leftIcon={<CheckCircle size={16} />}
                  >
                    Mark Complete
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

IssueDetail.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']).isRequired,
    matchScore: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
    repository: PropTypes.shape({
      name: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      ownerAvatarUrl: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      stars: PropTypes.number.isRequired,
      forks: PropTypes.number.isRequired,
      watchers: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    }).isRequired,
    savedState: PropTypes.oneOf(['NONE', 'INTERESTED', 'IN_PROGRESS', 'COMPLETED']),
    notes: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func,
};

export default IssueDetail; 