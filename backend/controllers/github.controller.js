import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getGitHubIssues = async (req, res) => {
    try {
        console.log('Fetching GitHub issues...');
        const filePath = path.join(__dirname, '../github_issues.json');
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error('File not found at path:', filePath);
            return res.status(404).json({
                success: false,
                message: 'GitHub issues file not found'
            });
        }

        // Read and parse the JSON file
        const rawData = fs.readFileSync(filePath, 'utf8');
        let issuesData;
        
        try {
            issuesData = JSON.parse(rawData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({
                success: false,
                message: 'Error parsing GitHub issues data'
            });
        }

        // Transform the nested structure into a flat array
        const allIssues = [];
        for (const [repoName, repoIssues] of Object.entries(issuesData)) {
            if (Array.isArray(repoIssues)) {
                repoIssues.forEach(issue => {
                    if (issue && typeof issue === 'object') {
                        allIssues.push({
                            id: issue.number,
                            number: issue.number,
                            title: issue.title,
                            bodyText: issue.bodyText,
                            createdAt: issue.createdAt,
                            author: {
                                login: issue.author?.login || 'unknown',
                                avatarUrl: issue.author?.avatarUrl
                            },
                            labels: {
                                nodes: issue.labels?.nodes || []
                            },
                            comments: issue.comments || 0,
                            url: issue.url,
                            repository: {
                                name: repoName
                            }
                        });
                    }
                });
            }
        }

        console.log(`Successfully processed ${allIssues.length} issues from ${Object.keys(issuesData).length} repositories`);
        
        res.status(200).json({
            success: true,
            issues: allIssues
        });
    } catch (error) {
        console.error('Error fetching GitHub issues:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 