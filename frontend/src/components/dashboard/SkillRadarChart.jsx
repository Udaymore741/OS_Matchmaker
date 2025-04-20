import React from 'react';
import PropTypes from 'prop-types';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardBody } from '../ui/Card';

const SkillRadarChart = ({
  skills,
  title = "Skill Profile",
  className = '',
}) => {
  // Format the skills data for the chart
  const chartData = skills.map(skill => ({
    skill: skill.name,
    level: skill.level,
    experience: skill.experience,
    usage: skill.recentUsage * 10, // Scale to 0-100
    fullMark: 100
  }));

  // Add months data
  const months = [
    'May 2024', 'June 2024', 'July 2024', 'August 2024', 'September 2024', 'October 2024',
    'November 2024', 'December 2024', 'January 2025', 'February 2025', 'March 2025', 'April 2025'
  ];
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white mb-1">{data.skill}</p>
          <div className="text-sm">
            <p className="text-blue-600 dark:text-blue-400">
              Skill Level: {data.level}%
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Experience: {Math.floor(data.experience / 12)} years, {data.experience % 12} months
            </p>
            <p className="text-green-600 dark:text-green-400">
              Recent Usage: {data.usage / 10}/10
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      </CardHeader>
      <CardBody>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
                tickCount={12}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tickCount={5} 
                tick={false} 
                axisLine={false} 
              />
              <Radar 
                name="Skill Level" 
                dataKey="level" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.5}
                animationDuration={1000}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};

SkillRadarChart.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      experience: PropTypes.number.isRequired,
      recentUsage: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default SkillRadarChart; 