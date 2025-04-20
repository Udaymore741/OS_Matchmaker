// Labels
export const mockLabels = [
  { id: 'label1', name: 'bug', color: 'D73A4A', description: 'Something isn\'t working' },
  { id: 'label2', name: 'documentation', color: '0075CA', description: 'Improvements or additions to documentation' },
  { id: 'label3', name: 'enhancement', color: 'A2EEEF', description: 'New feature or request' },
  { id: 'label4', name: 'good first issue', color: '7057FF', description: 'Good for newcomers' },
  { id: 'label5', name: 'help wanted', color: '008672', description: 'Extra attention is needed' },
  { id: 'label6', name: 'question', color: 'D876E3', description: 'Further information is requested' },
  { id: 'label7', name: 'frontend', color: 'FEF2C0', description: 'Related to UI/UX' },
  { id: 'label8', name: 'backend', color: 'FBCA04', description: 'Related to server-side logic' },
  { id: 'label9', name: 'performance', color: '0E8A16', description: 'Related to performance issues' },
  { id: 'label10', name: 'security', color: 'B60205', description: 'Related to security issues' },
];

// Repositories
export const mockRepositories = [
  {
    id: 'repo1',
    name: 'react',
    fullName: 'facebook/react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    url: 'https://github.com/facebook/react',
    stars: 218000,
    forks: 45000,
    language: 'JavaScript',
    topics: ['javascript', 'ui', 'frontend', 'library'],
    lastUpdated: '2023-10-15T10:30:45Z',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/69631?v=4',
  },
  {
    id: 'repo2',
    name: 'vscode',
    fullName: 'microsoft/vscode',
    description: 'Visual Studio Code',
    url: 'https://github.com/microsoft/vscode',
    stars: 154000,
    forks: 28000,
    language: 'TypeScript',
    topics: ['editor', 'electron', 'typescript', 'ide'],
    lastUpdated: '2023-10-16T08:25:12Z',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/6154722?v=4',
  },
  {
    id: 'repo3',
    name: 'tensorflow',
    fullName: 'tensorflow/tensorflow',
    description: 'An Open Source Machine Learning Framework for Everyone',
    url: 'https://github.com/tensorflow/tensorflow',
    stars: 178000,
    forks: 88000,
    language: 'C++',
    topics: ['machine-learning', 'deep-learning', 'neural-networks', 'python'],
    lastUpdated: '2023-10-14T22:15:30Z',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/15658638?v=4',
  },
  {
    id: 'repo4',
    name: 'django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    url: 'https://github.com/django/django',
    stars: 72000,
    forks: 30000,
    language: 'Python',
    topics: ['python', 'web-framework', 'backend', 'orm'],
    lastUpdated: '2023-10-12T14:45:20Z',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'repo5',
    name: 'rust',
    fullName: 'rust-lang/rust',
    description: 'Empowering everyone to build reliable and efficient software.',
    url: 'https://github.com/rust-lang/rust',
    stars: 86000,
    forks: 11000,
    language: 'Rust',
    topics: ['rust', 'systems-programming', 'compiler', 'performance'],
    lastUpdated: '2023-10-16T11:10:05Z',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/5430905?v=4',
  },
];

// User and Profile
export const mockUser = {
  id: 'user1',
  name: 'John Doe',
  username: 'johndoe',
  avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  bio: 'Full-stack developer passionate about open source.',
  joinedDate: '2017-05-12T14:32:10Z',
  followers: 254,
  following: 123,
  location: 'San Francisco, CA',
  company: 'Tech Innovators Inc.',
  website: 'https://johndoe.dev',
  twitter: '@johndoedev',
};

export const mockUserProfile = {
  ...mockUser,
  skills: [
    { name: 'JavaScript', level: 85, experience: 48, recentUsage: 10 },
    { name: 'TypeScript', level: 78, experience: 36, recentUsage: 9 },
    { name: 'React', level: 82, experience: 30, recentUsage: 10 },
    { name: 'Node.js', level: 75, experience: 42, recentUsage: 8 },
    { name: 'Python', level: 65, experience: 24, recentUsage: 6 },
    { name: 'GraphQL', level: 70, experience: 18, recentUsage: 7 },
    { name: 'Docker', level: 60, experience: 12, recentUsage: 5 },
    { name: 'AWS', level: 55, experience: 10, recentUsage: 4 },
    { name: 'CSS', level: 80, experience: 48, recentUsage: 9 },
    { name: 'HTML', level: 90, experience: 60, recentUsage: 9 },
  ],
  topLanguages: [
    { name: 'JavaScript', percentage: 42 },
    { name: 'TypeScript', percentage: 28 },
    { name: 'Python', percentage: 15 },
    { name: 'CSS', percentage: 10 },
    { name: 'HTML', percentage: 5 },
  ],
  contributionStreak: 15,
  totalContributions: 1248,
  preferredTopics: ['web-development', 'ui-frameworks', 'api-design', 'performance'],
  learningInterests: ['Rust', 'Machine Learning', 'WebAssembly', 'Blockchain'],
};

// Issues
export const mockIssues = [
  {
    id: 'issue1',
    title: 'Fix responsive layout in mobile view',
    number: 1423,
    repository: mockRepositories[0],
    createdAt: '2023-10-10T15:30:00Z',
    updatedAt: '2023-10-15T11:22:33Z',
    labels: [mockLabels[1], mockLabels[6]],
    state: 'open',
    assignees: [],
    body: 'The responsive layout is not working correctly in mobile view. The sidebar overlaps with the main content on screens smaller than 768px. We need to adjust the CSS to make it responsive.',
    difficulty: 'beginner',
    matchScore: 92,
    estimatedTime: '1-2 hours',
    aiSummary: 'Fix mobile layout issue where sidebar overlaps content. Requires CSS adjustments for media queries.',
  },
  {
    id: 'issue2',
    title: 'Implement authentication with JWT',
    number: 982,
    repository: mockRepositories[3],
    createdAt: '2023-10-05T09:15:22Z',
    updatedAt: '2023-10-16T10:45:11Z',
    labels: [mockLabels[2], mockLabels[7]],
    state: 'open',
    assignees: [],
    body: 'We need to implement JWT authentication for the API. This includes token generation, validation, refresh tokens, and proper error handling.',
    difficulty: 'intermediate',
    matchScore: 85,
    estimatedTime: '4-6 hours',
    aiSummary: 'Implement JWT authentication including token generation/validation and refresh tokens.',
  },
  {
    id: 'issue3',
    title: 'Optimize database queries for better performance',
    number: 567,
    repository: mockRepositories[3],
    createdAt: '2023-10-01T13:45:30Z',
    updatedAt: '2023-10-14T08:30:25Z',
    labels: [mockLabels[8], mockLabels[9]],
    state: 'open',
    assignees: [],
    body: 'The database queries in the user service are causing performance issues. We need to optimize them by adding proper indexes, rewriting some of the complex queries, and implementing caching where appropriate.',
    difficulty: 'advanced',
    matchScore: 78,
    estimatedTime: '8-10 hours',
    aiSummary: 'Optimize slow DB queries by adding indexes, rewriting complex queries, and implementing caching.',
  },
  {
    id: 'issue4',
    title: 'Add unit tests for utility functions',
    number: 325,
    repository: mockRepositories[1],
    createdAt: '2023-10-08T16:20:15Z',
    updatedAt: '2023-10-15T14:10:05Z',
    labels: [mockLabels[3], mockLabels[1]],
    state: 'open',
    assignees: [],
    body: 'We need to add unit tests for the utility functions in the src/utils directory. The test coverage is currently low, and we\'d like to increase it to at least 80%.',
    difficulty: 'beginner',
    matchScore: 88,
    estimatedTime: '2-3 hours',
    aiSummary: 'Add unit tests for utility functions to increase test coverage to at least 80%.',
  },
  {
    id: 'issue5',
    title: 'Implement dark mode theme',
    number: 742,
    repository: mockRepositories[0],
    createdAt: '2023-10-09T11:05:55Z',
    updatedAt: '2023-10-16T09:30:40Z',
    labels: [mockLabels[6], mockLabels[2]],
    state: 'open',
    assignees: [],
    body: 'We want to add a dark mode theme to our application. This includes creating a theme switcher, defining dark mode color variables, and ensuring all components respect the selected theme.',
    difficulty: 'intermediate',
    matchScore: 90,
    estimatedTime: '5-7 hours',
    aiSummary: 'Implement dark mode with theme switcher and ensure all components support both themes.',
  },
  {
    id: 'issue6',
    title: 'Fix memory leak in event listeners',
    number: 129,
    repository: mockRepositories[0],
    createdAt: '2023-10-12T10:15:30Z',
    updatedAt: '2023-10-15T16:45:22Z',
    labels: [mockLabels[0], mockLabels[8]],
    state: 'open',
    assignees: [],
    body: 'There\'s a memory leak caused by event listeners not being properly removed when components unmount. We need to identify where this is happening and ensure all listeners are cleaned up properly.',
    difficulty: 'intermediate',
    matchScore: 82,
    estimatedTime: '3-5 hours',
    aiSummary: 'Fix memory leak by properly cleaning up event listeners when components unmount.',
  },
  {
    id: 'issue7',
    title: 'Add keyboard shortcuts for common actions',
    number: 456,
    repository: mockRepositories[1],
    createdAt: '2023-10-07T14:25:10Z',
    updatedAt: '2023-10-16T12:15:30Z',
    labels: [mockLabels[2], mockLabels[4]],
    state: 'open',
    assignees: [],
    body: 'We want to enhance user experience by adding keyboard shortcuts for common actions like save, cancel, navigate, etc. This should include a keyboard shortcut guide for users.',
    difficulty: 'beginner',
    matchScore: 75,
    estimatedTime: '2-4 hours',
    aiSummary: 'Enhance UX by adding keyboard shortcuts for common actions and include a shortcut guide.',
  },
];

// Saved Issues
export const mockSavedIssues = [
  {
    ...mockIssues[0],
    savedState: 'interested',
    savedAt: '2023-10-10T16:45:22Z',
  },
  {
    ...mockIssues[1],
    savedState: 'in_progress',
    savedAt: '2023-10-05T10:30:15Z',
  },
  {
    ...mockIssues[2],
    savedState: 'completed',
    savedAt: '2023-10-01T14:20:30Z',
  },
];

// Contribution Stats
export const mockContributions = [
  { date: '2023-10-01', count: 3 },
  { date: '2023-10-02', count: 5 },
  { date: '2023-10-03', count: 2 },
  { date: '2023-10-04', count: 4 },
  { date: '2023-10-05', count: 6 },
  { date: '2023-10-06', count: 1 },
  { date: '2023-10-07', count: 3 },
  { date: '2023-10-08', count: 4 },
  { date: '2023-10-09', count: 2 },
  { date: '2023-10-10', count: 5 },
  { date: '2023-10-11', count: 3 },
  { date: '2023-10-12', count: 4 },
  { date: '2023-10-13', count: 2 },
  { date: '2023-10-14', count: 3 },
  { date: '2023-10-15', count: 5 },
  { date: '2023-10-16', count: 4 },
];

// Filter Options
export const getFilteredIssues = (filters = {}) => {
  let filtered = [...mockIssues];

  if (filters.difficulty) {
    filtered = filtered.filter(issue => issue.difficulty === filters.difficulty);
  }

  if (filters.language) {
    filtered = filtered.filter(issue => issue.repository.language === filters.language);
  }

  if (filters.topic) {
    filtered = filtered.filter(issue => 
      issue.repository.topics.includes(filters.topic) ||
      issue.labels.some(label => label.name === filters.topic)
    );
  }

  if (filters.timeEstimate) {
    filtered = filtered.filter(issue => {
      const [min, max] = issue.estimatedTime.split('-').map(t => parseInt(t));
      return min <= filters.timeEstimate && max >= filters.timeEstimate;
    });
  }

  return filtered;
}; 