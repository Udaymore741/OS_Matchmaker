import express from 'express';
import { getGitHubIssues } from '../controllers/github.controller.js';

const GithubRouter = express.Router();

GithubRouter.get('/issues', getGitHubIssues);

export default GithubRouter; 