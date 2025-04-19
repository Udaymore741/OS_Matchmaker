import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout/Layout';
import { useIssues } from '../context/IssueContext';
import IssueList from '../components/issues/IssueList';
import IssueDetail from '../components/issues/IssueDetail';
import Modal from '../components/ui/Modal';
import { Bookmark, Play, CheckCircle, LayoutGrid } from 'lucide-react';
import Badge from '../components/ui/Badge';

const SavedIssuesPage = () => {
  const { savedIssues } = useIssues();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };
  
  // Filter issues by saved state
  const filteredIssues = activeTab === 'all'
    ? savedIssues
    : savedIssues.filter(issue => issue.savedState === activeTab);
  
  const interestedCount = savedIssues.filter(i => i.savedState === 'interested').length;
  const inProgressCount = savedIssues.filter(i => i.savedState === 'in_progress').length;
  const completedCount = savedIssues.filter(i => i.savedState === 'completed').length;
  
  const tabs = [
    { id: 'all', label: 'All', icon: <LayoutGrid size={18} />, count: savedIssues.length },
    { id: 'interested', label: 'Interested', icon: <Bookmark size={18} />, count: interestedCount },
    { id: 'in_progress', label: 'In Progress', icon: <Play size={18} />, count: inProgressCount },
    { id: 'completed', label: 'Completed', icon: <CheckCircle size={18} />, count: completedCount },
  ];
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Saved Issues
        </h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 rounded-full px-4 py-2 
                ${activeTab === tab.id 
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }
                transition-colors duration-200
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <Badge
                variant={activeTab === tab.id ? 'primary' : 'default'}
                size="sm"
                className={activeTab === tab.id ? 'bg-blue-500 text-white' : ''}
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>
        
        {/* Issue list */}
        <IssueList 
          issues={filteredIssues}
          isSaved={true}
          onSelect={handleIssueSelect}
          emptyMessage={
            activeTab === 'all'
              ? "You haven't saved any issues yet. Browse the recommendations to find issues to work on."
              : `You don't have any ${activeTab.replace('_', ' ')} issues.`
          }
        />
        
        {/* Issue detail modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal}
          title="Issue Details"
          size="lg"
        >
          {selectedIssue && (
            <IssueDetail issue={selectedIssue} onClose={closeModal} />
          )}
        </Modal>
      </div>
    </Layout>
  );
};

SavedIssuesPage.propTypes = {
  // Add any prop types if needed
};

export default SavedIssuesPage; 