import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Filter, Sliders, X } from 'lucide-react';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { mockLabels, mockRepositories } from '../../data/mockData';

const IssueFilters = ({ onFiltersChange, filters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  
  // Extract unique languages and topics from repositories
  const languages = Array.from(new Set(mockRepositories.map(repo => repo.language)));
  const allTopics = mockRepositories.flatMap(repo => repo.topics);
  const topics = Array.from(new Set(allTopics));
  const labels = mockLabels.map(label => label.name);
  
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };
  
  const applyFilters = () => {
    onFiltersChange(localFilters);
  };
  
  const resetFilters = () => {
    const emptyFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== undefined
  );
  
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Filter size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
              Active
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              leftIcon={<X size={16} />}
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            leftIcon={<Sliders size={16} />}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Language filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <select 
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300"
                value={localFilters.languages?.[0] || ''}
                onChange={(e) => handleFilterChange('languages', e.target.value ? [e.target.value] : [])}
              >
                <option value="">Any language</option>
                {languages.map(language => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Topic filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Topic
              </label>
              <select 
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300"
                value={localFilters.topics?.[0] || ''}
                onChange={(e) => handleFilterChange('topics', e.target.value ? [e.target.value] : [])}
              >
                <option value="">Any topic</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Label filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Label
              </label>
              <select 
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300"
                value={localFilters.labels?.[0] || ''}
                onChange={(e) => handleFilterChange('labels', e.target.value ? [e.target.value] : [])}
              >
                <option value="">Any label</option>
                {labels.map(label => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Difficulty filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Difficulty
              </label>
              <select 
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-300"
                value={localFilters.difficulty || ''}
                onChange={(e) => handleFilterChange('difficulty', e.target.value || undefined)}
              >
                <option value="">Any difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

IssueFilters.propTypes = {
  onFiltersChange: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.string),
    topics: PropTypes.arrayOf(PropTypes.string),
    labels: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']),
  }),
};

export default IssueFilters; 