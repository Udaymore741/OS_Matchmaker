import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
export const Login = async (req, res) => {
    try {
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

        let user
        user = await User.findOne({ email })
        if (!user) {
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
        } else {
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
        }
        
        user = user.toObject({ getters: true })
        
        // Only store essential information in the token
        const tokenPayload = {
            _id: user._id,
            email: user.email
        }
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET)

        res.cookie('access_token', token, {
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: 'Login success.'
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}
export const getData = async (req, res) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'User not found',
            })
        }
 
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        
        // Fetch the latest user data from the database
        const user = await User.findById(tokenData._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            })
        }

        res.status(200).json({
            success: true,
            user: user.toObject({ getters: true })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}