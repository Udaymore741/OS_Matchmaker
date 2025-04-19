// import React from 'react';
// import PropTypes from 'prop-types';
// import { 
//   User, MapPin, Link2, Twitter, Building2, Clock, 
//   Star, GitFork, Users, Book, History, Mail,
//   Heart, Bookmark, Award
// } from 'lucide-react';

// function ContributionCell({ level }) {
//   const colors = {
//     0: 'bg-gray-100',
//     1: 'bg-emerald-100',
//     2: 'bg-emerald-300',
//     3: 'bg-emerald-500',
//     4: 'bg-emerald-700'
//   };
//   return <div className={`w-2.5 h-2.5 rounded-sm ${colors[level]}`}></div>;
// }

// function ProfilePage() {
//   // Mock data - in a real app, this would come from your backend
//   const user = {
//     name: "John Doe",
//     username: "johndoe",
//     avatar: null, // Using placeholder for now
//     bio: "Full-stack developer | Open source enthusiast | Building cool stuff",
//     location: "San Francisco, CA",
//     website: "https://johndoe.dev",
//     twitter: "@johndoe",
//     organization: "TechCorp",
//     followers: 245,
//     following: 168,
//     joinedDate: "Joined December 2021",
//     email: "john.doe@example.com"
//   };

//   const pinnedRepos = [
//     {
//       name: "awesome-project",
//       description: "A collection of awesome things I've built",
//       language: "TypeScript",
//       stars: 128,
//       forks: 34
//     },
//     {
//       name: "cool-app",
//       description: "A revolutionary app that does amazing things",
//       language: "JavaScript",
//       stars: 89,
//       forks: 12
//     },
//     {
//       name: "utils-library",
//       description: "A utility library for common programming tasks",
//       language: "Python",
//       stars: 245,
//       forks: 56
//     }
//   ];

//   const languageColors = {
//     TypeScript: 'bg-blue-500',
//     JavaScript: 'bg-yellow-400',
//     Python: 'bg-blue-600'
//   };

//   // Generate mock contribution data
//   const contributionData = Array(365).fill(0).map(() => 
//     Math.floor(Math.random() * 5)
//   );

//   return (
//     <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="sticky top-8">
//               {/* Profile Picture */}
//               <div className="relative group">
//                 <div className="h-[296px] w-[296px] rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden">
//                   <User className="w-full h-full p-12 text-gray-400" />
//                 </div>
//                 <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">Change picture</span>
//                 </div>
//               </div>

//               {/* Profile Info */}
//               <div className="mt-4">
//                 <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
//                 <h2 className="text-xl text-gray-600 font-light">{user.username}</h2>
//               </div>

//               <div className="mt-4">
//                 <p className="text-gray-700">{user.bio}</p>
//               </div>

//               <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-1.5 px-4 rounded-md border border-gray-300">
//                 Edit profile
//               </button>

//               <div className="mt-4 space-y-2 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <Building2 className="w-4 h-4" />
//                   <span>{user.organization}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin className="w-4 h-4" />
//                   <span>{user.location}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Link2 className="w-4 h-4" />
//                   <a href={user.website} className="text-blue-600 hover:underline">{user.website}</a>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Twitter className="w-4 h-4" />
//                   <span>{user.twitter}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" />
//                   <span>{user.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-4 h-4" />
//                   <span>{user.joinedDate}</span>
//                 </div>
//               </div>

//               <div className="mt-4 flex items-center gap-4">
//                 <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
//                   <Users className="w-4 h-4" />
//                   <span className="font-medium">{user.followers}</span>
//                   <span>followers</span>
//                 </a>
//                 <span>·</span>
//                 <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
//                   <span className="font-medium">{user.following}</span>
//                   <span>following</span>
//                 </a>
//               </div>

//               {/* Achievements Section */}
//               <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
//                 <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
//                   <Award className="w-4 h-4" />
//                   Achievements
//                 </h3>
//                 <div className="mt-3 flex gap-2">
//                   <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                     <Star className="w-4 h-4 text-yellow-600" />
//                   </div>
//                   <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                     <Heart className="w-4 h-4 text-purple-600" />
//                   </div>
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                     <Bookmark className="w-4 h-4 text-blue-600" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Navigation */}
//             <nav className="flex items-center gap-6 border-b border-gray-200 mb-6">
//               <a href="#" className="flex items-center gap-2 px-4 py-4 border-b-2 border-orange-500 text-gray-900">
//                 <Book className="w-4 h-4" />
//                 <span className="font-medium">Overview</span>
//               </a>
//               <a href="#" className="flex items-center gap-2 px-4 py-4 text-gray-600 hover:border-b-2 hover:border-gray-300">
//                 <History className="w-4 h-4" />
//                 <span>Activity</span>
//               </a>
//             </nav>

//             {/* Pinned Repositories */}
//             <div className="mb-8">
//               <h2 className="text-base font-medium text-gray-900 mb-4">Popular repositories</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {pinnedRepos.map((repo) => (
//                   <div key={repo.name} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
//                     <div className="flex items-start justify-between">
//                       <a href="#" className="text-blue-600 font-medium hover:underline">{repo.name}</a>
//                       <span className="text-xs text-gray-600 border border-gray-200 rounded-full px-2">Public</span>
//                     </div>
//                     <p className="mt-2 text-sm text-gray-600">{repo.description}</p>
//                     <div className="mt-4 flex items-center gap-4 text-sm">
//                       <div className="flex items-center gap-1">
//                         <span className={`w-3 h-3 rounded-full ${languageColors[repo.language]}`}></span>
//                         <span>{repo.language}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4" />
//                         <span>{repo.stars}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <GitFork className="w-4 h-4" />
//                         <span>{repo.forks}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Contribution Graph */}
//             <div className="bg-white rounded-lg border border-gray-200 p-4">
//               <h2 className="text-base font-medium text-gray-900 mb-4">Contributions</h2>
//               <div className="grid grid-cols-53 gap-0.5">
//                 {contributionData.map((level, i) => (
//                   <ContributionCell key={i} level={level} />
//                 ))}
//               </div>
//               <div className="mt-2 flex items-center justify-end gap-2 text-xs text-gray-600">
//                 <span>Less</span>
//                 <div className="flex gap-0.5">
//                   {[0, 1, 2, 3, 4].map((level) => (
//                     <ContributionCell key={level} level={level} />
//                   ))}
//                 </div>
//                 <span>More</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ContributionCell.propTypes = {
//   level: PropTypes.number.isRequired
// };

// ProfilePage.propTypes = {
//   // Add any prop types if needed
// };

// export default ProfilePage; 

import React, { useEffect, useState } from 'react'

export const ProfilePage = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:8080/api/auth/get-user', {
                method: 'get',
                credentials: 'include',
            })
            const data = await response.json()
            if (response.ok) {
                setUser(data.user)
            }
        }
        getData()
    }, [])

    if (!user) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    
    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Profile Header */}
            <div className="text-center mb-8">
                <img 
                    src={user.avatar_url} 
                    alt="Profile" 
                    className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-gray-200"
                />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <h2 className="text-xl text-gray-600 mb-4">@{user.login}</h2>
                <a 
                    href={user.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    View GitHub Profile
                </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-gray-900">{user.public_repos}</span>
                    <span className="text-gray-600">Repositories</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-gray-900">{user.followers}</span>
                    <span className="text-gray-600">Followers</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-gray-900">{user.following}</span>
                    <span className="text-gray-600">Following</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-gray-900">{user.public_gists}</span>
                    <span className="text-gray-600">Gists</span>
                </div>
            </div>

            {/* Profile Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {user.bio && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Bio</h3>
                        <p className="text-gray-600">{user.bio}</p>
                    </div>
                )}
                
                {user.company && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Company</h3>
                        <p className="text-gray-600">{user.company}</p>
                    </div>
                )}

                {user.location && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                        <p className="text-gray-600">{user.location}</p>
                    </div>
                )}

                {user.blog && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Website</h3>
                        <a 
                            href={user.blog} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {user.blog}
                        </a>
                    </div>
                )}

                {user.twitter_username && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Twitter</h3>
                        <a 
                            href={`https://twitter.com/${user.twitter_username}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            @{user.twitter_username}
                        </a>
                    </div>
                )}

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Member Since</h3>
                    <p className="text-gray-600">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>

                {user.hireable && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
                        <p className="text-green-600 font-medium">Available for hire</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage;
