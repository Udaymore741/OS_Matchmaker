import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useIssues } from '../context/IssueContext';
import StatsCard from '../components/dashboard/StatsCard';
import IssueRecommendations from '../components/dashboard/IssueRecommendations';
import ContributionChart from '../components/dashboard/ContributionChart';
import SkillRadarChart from '../components/dashboard/SkillRadarChart';
import LanguageDonutChart from '../components/dashboard/LanguageDonutChart';
import { Code, Award, Clock, GitPullRequest } from 'lucide-react';

const DashboardPage = () => {
  const { userProfile } = useAuth();
  const { issues, filteredIssues, savedIssues, loading, fetchIssues } = useIssues();
  
  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);
  
  // Get recommended issues (those with highest match score)
  const recommendedIssues = [...issues]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
  
  // Get in-progress issues
  const inProgressIssues = savedIssues.filter(issue => 
    issue.savedState === 'in_progress'
  );
  
  // Calculate stats
  const [totalContributions, setTotalContributions] = React.useState(0);
  
  useEffect(() => {
    const fetchReceivedEvents = async () => {
      try {
        const username = userProfile?.login;
        if (!username) return;
        
        const response = await fetch(`https://api.github.com/users/${username}/received_events`);
        const data = await response.json();
        setTotalContributions(data.length);
      } catch (error) {
        console.error('Error fetching received events:', error);
        setTotalContributions(0);
      }
    };
    
    fetchReceivedEvents();
  }, [userProfile?.login]);
  
  const currentStreak = userProfile?.contributionStreak || 0;
  const completedIssues = savedIssues.filter(issue => issue.savedState === 'completed').length;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome back, {userProfile?.name?.split(' ')[0] || 'Developer'}!
        </h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-auto sm:grid-cols-auto lg:grid-cols-2 gap-6 mb-8">
          <StatsCard
            title="Total Contributions"
            value={totalContributions}
            icon={<Code size={24} />}
            change={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Current Streak"
            value={`${currentStreak} days`}
            icon={<Award size={24} />}
            change={{ value: 5, isPositive: true }}
          />
        </div>
        
        {/* Top row charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ContributionChart title="Monthly Contributions" />
          
          <SkillRadarChart 
            skills={userProfile?.skills || []} 
            title="Your Skills Profile"
          />
        </div>
        
        {/* Middle row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <IssueRecommendations 
              issues={recommendedIssues} 
              loading={loading}
              title="Top Recommendations"
            />
          </div>
          
          <LanguageDonutChart 
            data={userProfile?.topLanguages || []} 
            title="Your Languages"
          />
        </div>
        
        {/* In progress issues */}
        {inProgressIssues.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              In Progress Issues
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressIssues.map(issue => (
                <div key={issue.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {issue.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {issue.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {issue.repository?.name || 'Unknown Repository'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {issue.language}
                    </span>
                  </div>  
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

DashboardPage.propTypes = {
  // Add any prop types if needed
};

export default DashboardPage; 