import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout/Layout';
import IssueList from '../components/issues/IssueList';
import IssueFilters from '../components/issues/IssueFilters';
import IssueDetail from '../components/issues/IssueDetail';
import Modal from '../components/ui/Modal';
import { useIssues } from '../context/IssueContext';
import { Search, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';

const IssuesPage = () => {
  const { filteredIssues, loading, filters, setFilters, fetchIssues } = useIssues();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);
  
  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };
  
  // Filter issues by search query
  const filteredBySearch = searchQuery
    ? filteredIssues.filter(issue => 
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.repository.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.repository.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.labels.some(label => label.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredIssues;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Issues
          </h1>
          
          <Button
            variant="outline"
            leftIcon={<RefreshCw size={16} />}
            onClick={() => fetchIssues()}
            isLoading={loading}
          >
            Refresh
          </Button>
        </div>
        
        {/* Search input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search issues..."
            className="w-full py-2 pl-10 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
        </div>
        
        {/* Filters */}
        <IssueFilters 
          filters={filters} 
          onFiltersChange={setFilters} 
        />
        
        {/* Issue list */}
        <IssueList 
          issues={filteredBySearch} 
          loading={loading}
          onSelect={handleIssueSelect}
          emptyMessage={
            searchQuery 
              ? "No issues found matching your search criteria." 
              : "No issues found. Try adjusting your filters."
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

IssuesPage.propTypes = {
  // Add any prop types if needed
};

export default IssuesPage; 