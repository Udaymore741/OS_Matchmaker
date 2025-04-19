import PropTypes from 'prop-types';

// User PropTypes
export const UserPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  joinedDate: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  location: PropTypes.string,
  company: PropTypes.string,
  website: PropTypes.string,
  twitter: PropTypes.string,
};

// Skill PropTypes
export const SkillPropTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired, // 1-100
  experience: PropTypes.number.isRequired, // in months
  recentUsage: PropTypes.number.isRequired, // 1-10 (how recently/frequently used)
};

// UserProfile PropTypes
export const UserProfilePropTypes = {
  ...UserPropTypes,
  skills: PropTypes.arrayOf(PropTypes.shape(SkillPropTypes)).isRequired,
  topLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
  contributionStreak: PropTypes.number.isRequired,
  totalContributions: PropTypes.number.isRequired,
  preferredTopics: PropTypes.arrayOf(PropTypes.string).isRequired,
  learningInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Repository PropTypes
export const RepositoryPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  forks: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastUpdated: PropTypes.string.isRequired,
  ownerAvatarUrl: PropTypes.string.isRequired,
};

// Label PropTypes
export const LabelPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string,
};

// Issue PropTypes
export const IssuePropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  repository: PropTypes.shape(RepositoryPropTypes).isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape(LabelPropTypes)).isRequired,
  state: PropTypes.oneOf(['open', 'closed']).isRequired,
  assignees: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']).isRequired,
  matchScore: PropTypes.number.isRequired, // 0-100
  estimatedTime: PropTypes.string, // e.g. "2-4 hours"
  aiSummary: PropTypes.string,
};

// Saved Issue PropTypes
export const SavedIssuePropTypes = {
  ...IssuePropTypes,
  savedState: PropTypes.oneOf(['interested', 'in_progress', 'completed', 'none']).isRequired,
  startedAt: PropTypes.string,
  completedAt: PropTypes.string,
  notes: PropTypes.string,
};

// Contribution Stat PropTypes
export const ContributionStatPropTypes = {
  date: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  repositories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Skill Progress PropTypes
export const SkillProgressPropTypes = {
  skill: PropTypes.string.isRequired,
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// Filter Options PropTypes
export const FilterOptionsPropTypes = {
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficulties: PropTypes.arrayOf(
    PropTypes.oneOf(['beginner', 'intermediate', 'advanced'])
  ).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  minMatchScore: PropTypes.number.isRequired,
}; 