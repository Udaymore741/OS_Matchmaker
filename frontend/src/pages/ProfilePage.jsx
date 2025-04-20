import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'

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

    if (!user) return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        </Layout>
    )
    
    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-8">
                {/* Profile Header */}
                <div className="text-center mb-8">
                    <img 
                        src={user.avatar_url} 
                        alt="Profile" 
                        className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-700"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h1>
                    <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">@{user.login}</h2>
                    <a 
                        href={user.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block bg-gray-900 dark:bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                        View GitHub Profile
                    </a>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                        <span className="block text-2xl font-bold text-gray-900 dark:text-white">{user.public_repos}</span>
                        <span className="text-gray-600 dark:text-gray-400">Repositories</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                        <span className="block text-2xl font-bold text-gray-900 dark:text-white">{user.followers}</span>
                        <span className="text-gray-600 dark:text-gray-400">Followers</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                        <span className="block text-2xl font-bold text-gray-900 dark:text-white">{user.following}</span>
                        <span className="text-gray-600 dark:text-gray-400">Following</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                        <span className="block text-2xl font-bold text-gray-900 dark:text-white">{user.public_gists}</span>
                        <span className="text-gray-600 dark:text-gray-400">Gists</span>
                    </div>
                </div>

                {/* Profile Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {user.bio && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bio</h3>
                            <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
                        </div>
                    )}
                    
                    {user.company && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Company</h3>
                            <p className="text-gray-600 dark:text-gray-400">{user.company}</p>
                        </div>
                    )}

                    {user.location && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
                            <p className="text-gray-600 dark:text-gray-400">{user.location}</p>
                        </div>
                    )}

                    {user.blog && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Website</h3>
                            <a 
                                href={user.blog} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {user.blog}
                            </a>
                        </div>
                    )}

                    {user.twitter_username && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Twitter</h3>
                            <a 
                                href={`https://twitter.com/${user.twitter_username}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                @{user.twitter_username}
                            </a>
                        </div>
                    )}

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Member Since</h3>
                        <p className="text-gray-600 dark:text-gray-400">{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>

                    {user.hireable && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Status</h3>
                            <p className="text-green-600 dark:text-green-400 font-medium">Available for hire</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default ProfilePage;
