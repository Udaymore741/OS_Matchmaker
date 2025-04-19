import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    login: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
    },
    html_url: {
        type: String,
    },
    bio: {
        type: String,
    },
    company: {
        type: String,
    },
    location: {
        type: String,
    },
    blog: {
        type: String,
    },
    twitter_username: {
        type: String,
    },
    public_repos: {
        type: Number,
        default: 0
    },
    public_gists: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
    hireable: {
        type: Boolean,
    },
    type: {
        type: String,
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema, 'users')
export default User