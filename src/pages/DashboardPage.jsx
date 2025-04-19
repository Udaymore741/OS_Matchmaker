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
import { mockContributions } from '../data/mockData';
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
  const totalContributions = userProfile?.totalContributions || 0;
  const currentStreak = userProfile?.contributionStreak || 0;
  const completedIssues = savedIssues.filter(issue => issue.savedState === 'completed').length;
  
  // Get recent contributions for the chart
  const recentContributions = mockContributions.slice(-14);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome back, {userProfile?.name?.split(' ')[0] || 'Developer'}!
        </h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <StatsCard
            title="Completed Issues"
            value={completedIssues}
            icon={<GitPullRequest size={24} />}
            change={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="In Progress"
            value={inProgressIssues.length}
            icon={<Clock size={24} />}
          />
        </div>
        
        {/* Top row charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ContributionChart 
            data={recentContributions} 
            title="Recent Contributions"
          />
          
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
            <IssueRecommendations 
              issues={inProgressIssues} 
              title="In Progress Issues"
              showViewAll={false}
            />
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