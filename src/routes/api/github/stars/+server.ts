import { GITHUB_TOKEN } from "$env/static/private";

export async function GET() {
  const REPO_OWNER = 'retrotheft';
  const REPO_NAME = 'svelte-mainloop';

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    // Return response with cache control headers
    return new Response(JSON.stringify({ stars: data.stargazers_count }), {
      headers: {
        'Content-Type': 'application/json',
        // Cache for 1 hour on Vercel's edge
        'Cache-Control': 'public, max-age=60, s-maxage=3600',
        // Optional: different cache settings for browsers
        'CDN-Cache-Control': 'public, s-maxage=3600',
        // Optional: Vercel-specific cache settings
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return new Response(
      JSON.stringify({ stars: null, error: 'Failed to load GitHub stars' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
