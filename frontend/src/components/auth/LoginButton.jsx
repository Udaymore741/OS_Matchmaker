import React from "react";
import PropTypes from "prop-types";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

import { signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { auth, provider } from '../../../Firebase'

const LoginButton = ({ className = "" }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Set loading state
      login({ isLoading: true });

      // Sign in with GitHub
      const loginResponse = await signInWithPopup(auth, provider);
      const user = loginResponse.user;

      // Get GitHub access token from credentials
      const credential = GithubAuthProvider.credentialFromResult(loginResponse);
      const token = credential.accessToken;

      // Fetch user data from GitHub API using the access token
      const githubResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const githubData = await githubResponse.json();

      // Prepare user data for backend
      const userData = {
        name: githubData.name || user.displayName,
        email: user.email,
        login: githubData.login,
        avatar_url: githubData.avatar_url,
        html_url: githubData.html_url,
        bio: githubData.bio,
        company: githubData.company,
        location: githubData.location,
        blog: githubData.blog,
        twitter_username: githubData.twitter_username,
        public_repos: githubData.public_repos,
        public_gists: githubData.public_gists,
        followers: githubData.followers,
        following: githubData.following,
        created_at: githubData.created_at,
        updated_at: githubData.updated_at,
        hireable: githubData.hireable,
        type: githubData.type,
      };

      // Send user data to backend through AuthContext
      await login(userData);

    } catch (error) {
      console.error("Login error:", error);
      login({ isLoading: false });
      alert(error.message || "Failed to login. Please try again.");
    }
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleLogin}
      leftIcon={<Github size={20} />}
      className={`font-medium ${className}`}
    >
      Sign in with GitHub
    </Button>
  );
};

LoginButton.propTypes = {
  className: PropTypes.string,
};

export default LoginButton;
