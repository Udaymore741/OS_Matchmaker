import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

const ContributionChart = ({
  title = "Monthly Contributions",
  className = '',
}) => {
  const { user } = useAuth();
  const [monthlyContributions, setMonthlyContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      if (!user?.login) return;

      try {
        const response = await fetch(`https://api.github.com/users/${user.login}/events`);
        const events = await response.json();

        // Initialize monthly data array for May 2024 to April 2025
        const monthlyData = Array(12).fill(0).map((_, index) => {
          const date = new Date(2024, 4 + index); // Start from May 2024 (month 4)
          if (date.getMonth() > 3) { // If month is after April
            date.setFullYear(2024);
          } else {
            date.setFullYear(2025);
          }
          return {
            date: date.toISOString().split('T')[0],
            count: 0
          };
        });

        // Count contributions for each month
        events.forEach(event => {
          const eventDate = new Date(event.created_at);
          const monthIndex = eventDate.getMonth() - 4; // Adjust for May start
          const year = eventDate.getFullYear();
          
          if (year === 2024 && monthIndex >= 0 && monthIndex < 8) {
            monthlyData[monthIndex].count++;
          } else if (year === 2025 && monthIndex >= -4 && monthIndex < 0) {
            monthlyData[monthIndex + 12].count++;
          }
        });

        setMonthlyContributions(monthlyData);
      } catch (error) {
        console.error('Error fetching contributions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [user?.login]);

  // Format the data for display
  const chartData = monthlyContributions.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    count: item.count,
  }));
  
  // Get the maximum count for the Y-axis domain
  const maxCount = Math.max(...monthlyContributions.map(item => item.count), 5);
  
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-0">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        </CardHeader>
        <CardBody>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      </CardHeader>
      <CardBody>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tickMargin={8}
                minTickGap={0}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                domain={[0, maxCount]}
                tickCount={6}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: 'none',
                  padding: '0.5rem 0.75rem',
                }}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                formatter={(value) => [`${value} contributions`, 'Contributions']}
                labelFormatter={(label) => label}
              />
              <Bar 
                dataKey="count" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                barSize={20}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};

ContributionChart.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default ContributionChart; 