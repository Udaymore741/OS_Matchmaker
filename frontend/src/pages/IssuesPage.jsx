import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout/Layout';
import IssueList from '../components/issues/IssueList';
import IssueFilters from '../components/issues/IssueFilters';
import IssueDetail from '../components/issues/IssueDetail';
import Modal from '../components/ui/Modal';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all'
  });
  
  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching issues...');
      
      const response = await axios.get('http://localhost:8080/api/github/issues');
      console.log('Response:', response.data);
      
      if (response.data.success) {
        const issuesData = response.data.issues;
        
        if (!Array.isArray(issuesData)) {
          throw new Error('Invalid issues data format');
        }
        
        console.log('Fetched issues:', issuesData);
        
        // Validate and transform issues data
        const validatedIssues = issuesData.map(issue => ({
          id: issue.id,
          number: issue.number,
          title: issue.title,
          bodyText: issue.bodyText,
          createdAt: issue.createdAt,
          author: {
            login: issue.author?.login || 'unknown',
            avatarUrl: issue.author?.avatarUrl
          },
          labels: {
            nodes: issue.labels?.nodes || []
          },
          comments: issue.comments || 0,
          url: issue.url,
          repository: {
            name: issue.repository?.name || 'unknown'
          }
        }));
        
        setIssues(validatedIssues);
        setFilteredIssues(validatedIssues);
      } else {
        throw new Error(response.data.message || 'Failed to fetch issues');
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
      setError(error.message || 'Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchIssues();
  }, []);
  
  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };
  
  // Filter issues by search query
  const filteredBySearch = searchQuery && issues.length > 0
    ? filteredIssues.filter(issue => 
        issue.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.bodyText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.author?.login?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.repository?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (issue.labels?.nodes && issue.labels.nodes.some(label => 
          (typeof label === 'string' ? label : label?.name)?.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      )
    : filteredIssues;
  
  // Show error state
  if (error) {
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
            >
              Retry
            </Button>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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