import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { 
  Clock, MessageSquare, GitBranch, Star, Eye, 
  Award, BookmarkPlus, PlayCircle, CheckCircle, 
  ExternalLink, FileCode, Calendar, Lightbulb
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
    window.open(issue.url, '_blank');
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={issue.author?.avatarUrl || 'https://github.com/identicons/default.png'} 
                alt={issue.author?.login || 'Author'}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {issue.author?.login || 'Unknown'}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                #{issue.number}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {issue.title}
            </h2>
            
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
          </div>
          
          <Badge
            variant={getMatchScoreColor(issue.matchScore || 0)}
            size="lg"
          >
            {issue.matchScore || 0}% match
          </Badge>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Why This Issue is Recommended
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This issue has been selected based on your skills and interests. It's a great opportunity to:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                  <li>Contribute to an open-source project</li>
                  <li>Gain experience with {issue.labels?.nodes?.[0]?.name || 'relevant technologies'}</li>
                  <li>Work on a {issue.difficulty || 'beginner'}-level task</li>
                  <li>Collaborate with the open-source community</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {issue.bodyText}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              <span>Created {formatDate(issue.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MessageSquare size={16} />
              <span>{issue.comments?.totalCount || 0} comments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock size={16} />
              <span>{issue.state || 'open'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Award size={16} />
              <span>{issue.difficulty || 'unknown'}</span>
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
              Visit Issue
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
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    state: PropTypes.string,
    difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']),
    matchScore: PropTypes.number,
    url: PropTypes.string,
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
  onClose: PropTypes.func
};

export default IssueDetail; 