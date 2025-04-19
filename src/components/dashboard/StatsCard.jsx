import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '../ui/Card';

const StatsCard = ({
  title,
  value,
  icon,
  description,
  change,
  className = '',
}) => {
  return (
    <Card className={`${className}`}>
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            
            {change && (
              <div className="mt-1 flex items-center">
                <span 
                  className={`text-sm font-medium ${
                    change.isPositive 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {change.isPositive ? '+' : ''}{change.value}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
              </div>
            )}
            
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
          
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string,
  change: PropTypes.shape({
    value: PropTypes.number.isRequired,
    isPositive: PropTypes.bool.isRequired,
  }),
  className: PropTypes.string,
};

export default StatsCard; 