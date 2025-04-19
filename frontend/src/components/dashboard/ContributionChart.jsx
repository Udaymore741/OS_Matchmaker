import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardBody } from '../ui/Card';

const ContributionChart = ({
  data,
  title = "Contribution Activity",
  className = '',
}) => {
  // Format the data for display
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    count: item.count,
  }));
  
  // Get the maximum count for the Y-axis domain
  const maxCount = Math.max(...data.map(item => item.count), 5);
  
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      </CardHeader>
      <CardBody>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tickMargin={8}
                interval="preserveStartEnd"
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
                barSize={30}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default ContributionChart; 