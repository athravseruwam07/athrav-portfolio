// Static-export friendly config (Vercel or GitHub Pages)
const isGithub = process.env.GITHUB_ACTIONS === 'true';
// For GitHub Pages, set REPO_NAME in Actions or replace below with your repo name
const repoName = process.env.REPO_NAME || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Enable these two lines for GitHub Pages. For Vercel, leave them blank.
  basePath: isGithub && repoName ? `/${repoName}` : undefined,
  assetPrefix: isGithub && repoName ? `/${repoName}/` : undefined
};

export default nextConfig;