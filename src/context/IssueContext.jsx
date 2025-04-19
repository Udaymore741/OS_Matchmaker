import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { mockIssues, mockSavedIssues, getFilteredIssues } from '../data/mockData';

const IssueContext = createContext({
  issues: [],
  savedIssues: [],
  filteredIssues: [],
  filters: {},
  loading: false,
  saveIssue: () => {},
  updateSavedIssue: () => {},
  removeSavedIssue: () => {},
  setFilters: () => {},
  fetchIssues: async () => {},
});

const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState(mockIssues);
  const [savedIssues, setSavedIssues] = useState(mockSavedIssues);
  const [filters, setFiltersState] = useState({});
  const [filteredIssues, setFilteredIssues] = useState(mockIssues);
  const [loading, setLoading] = useState(false);

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would be fetching from GitHub API
      setIssues(mockIssues);
      setFilteredIssues(getFilteredIssues(filters));
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const setFilters = useCallback((newFilters) => {
    setFiltersState(prevFilters => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      setFilteredIssues(getFilteredIssues(updatedFilters));
      return updatedFilters;
    });
  }, []);

  const saveIssue = useCallback((issue, state, notes) => {
    const now = new Date().toISOString();
    const savedIssue = {
      ...issue,
      savedState: state,
      notes,
    };
    
    if (state === 'in_progress') {
      savedIssue.startedAt = now;
    } else if (state === 'completed') {
      savedIssue.startedAt = savedIssue.startedAt || now;
      savedIssue.completedAt = now;
    }
    
    setSavedIssues(prev => {
      // If already exists, update it
      const exists = prev.find(si => si.id === issue.id);
      if (exists) {
        return prev.map(si => si.id === issue.id ? savedIssue : si);
      }
      // Otherwise add new
      return [...prev, savedIssue];
    });
  }, []);

  const updateSavedIssue = useCallback((issueId, updates) => {
    setSavedIssues(prev => 
      prev.map(issue => 
        issue.id === issueId ? { ...issue, ...updates } : issue
      )
    );
  }, []);

  const removeSavedIssue = useCallback((issueId) => {
    setSavedIssues(prev => prev.filter(issue => issue.id !== issueId));
  }, []);

  return (
    <IssueContext.Provider 
      value={{
        issues,
        savedIssues,
        filteredIssues,
        filters,
        loading,
        saveIssue,
        updateSavedIssue,
        removeSavedIssue,
        setFilters,
        fetchIssues,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};

IssueProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useIssues = () => {
  const context = React.useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};

export { IssueProvider, useIssues }; 