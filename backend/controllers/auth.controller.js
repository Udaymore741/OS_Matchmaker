import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    try {
        console.log('Login request body:', req.body);
        
        const { 
            name, 
            email, 
            login,
            avatar_url,
            html_url,
            bio,
            company,
            location,
            blog,
            twitter_username,
            public_repos,
            public_gists,
            followers,
            following,
            created_at,
            updated_at,
            hireable,
            type
        } = req.body

        // Validate required fields
        if (!email || !name || !login) {
            console.error('Missing required fields:', { email, name, login });
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        let user
        try {
            user = await User.findOne({ email })
            console.log('User found:', user ? 'yes' : 'no');
        } catch (dbError) {
            console.error('Database error:', dbError);
            throw dbError;
        }

        if (!user) {
            console.log('Creating new user');
            try {
                const newUser = new User({
                    name,
                    email,
                    login,
                    avatar_url,
                    html_url,
                    bio,
                    company,
                    location,
                    blog,
                    twitter_username,
                    public_repos,
                    public_gists,
                    followers,
                    following,
                    created_at,
                    updated_at,
                    hireable,
                    type
                })
                user = await newUser.save()
                console.log('New user created successfully');
            } catch (saveError) {
                console.error('Error saving new user:', saveError);
                throw saveError;
            }
        } else {
            console.log('Updating existing user');
            try {
                // Update existing user with new GitHub data
                user.name = name;
                user.login = login;
                user.avatar_url = avatar_url;
                user.html_url = html_url;
                user.bio = bio;
                user.company = company;
                user.location = location;
                user.blog = blog;
                user.twitter_username = twitter_username;
                user.public_repos = public_repos;
                user.public_gists = public_gists;
                user.followers = followers;
                user.following = following;
                user.created_at = created_at;
                user.updated_at = updated_at;
                user.hireable = hireable;
                user.type = type;
                
                await user.save();
                console.log('User updated successfully');
            } catch (updateError) {
                console.error('Error updating user:', updateError);
                throw updateError;
            }
        }
        
        user = user.toObject({ getters: true })
        
        // Only store essential information in the token
        const tokenPayload = {
            id: user._id,
            email: user.email
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET)
        console.log('Token generated successfully');

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })

        res.status(200).json({
            success: true,
            message: 'Login success.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                login: user.login,
                avatar_url: user.avatar_url,
                html_url: user.html_url,
                bio: user.bio,
                company: user.company,
                location: user.location,
                blog: user.blog,
                twitter_username: user.twitter_username,
                public_repos: user.public_repos,
                public_gists: user.public_gists,
                followers: user.followers,
                following: user.following,
                created_at: user.created_at,
                updated_at: user.updated_at,
                hireable: user.hireable,
                type: user.type
            }
        })
    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        res.status(500).json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        })
    }
}

export const getData = async (req, res) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                login: user.login,
                avatar_url: user.avatar_url,
                html_url: user.html_url,
                bio: user.bio,
                company: user.company,
                location: user.location,
                blog: user.blog,
                twitter_username: user.twitter_username,
                public_repos: user.public_repos,
                public_gists: user.public_gists,
                followers: user.followers,
                following: user.following,
                created_at: user.created_at,
                updated_at: user.updated_at,
                hireable: user.hireable,
                type: user.type
            }
        });
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};