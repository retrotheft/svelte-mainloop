import { type LoadEvent } from '@sveltejs/kit'

export async function load({ fetch }: { fetch: LoadEvent['fetch'] }) {
  try {
    // Now fetch from your own API endpoint instead of GitHub directly
    const response = await fetch('/api/github/stars');

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      stars: data.stars
    };
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return {
      stars: null,
      error: 'Failed to load GitHub stars'
    };
  }
}
