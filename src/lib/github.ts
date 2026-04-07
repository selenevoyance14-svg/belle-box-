
/**
 * GitHub API Helper to update files
 */

const REPO_OWNER = 'selenevoyance14-svg';
const REPO_NAME = 'oracle';
const DEFAULT_Path = 'belle-box/data/affiliate-links.yaml'; // Default Path in the repo

export async function updateGitHubFile(content: string, message: string, relativePath?: string) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        console.warn("Skipping GitHub save: Missing GITHUB_TOKEN");
        return null;
    }

    // Ensure path is relative to repo root. If project is in a subdir (belle-box), prepend it.
    // Assuming simple structure where bell-box is root project name for now inside repo oracle.
    // The user has oracle/belle-box structure.
    const pathInRepo = relativePath ? `belle-box/${relativePath}` : DEFAULT_Path;

    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${pathInRepo}`;

    // 1. Get current SHA
    const getRes = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
        }
    });

    let sha = null;
    if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
    } else if (getRes.status !== 404) {
        const err = await getRes.text();
        console.error("GitHub Fetch Error:", err);
        throw new Error(`Failed to fetch file info from GitHub: ${getRes.statusText}`);
    }

    // 2. Update file
    const body = {
        message: message,
        content: Buffer.from(content).toString('base64'),
        sha: sha // If null, it creates the file
    };

    const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    if (!putRes.ok) {
        const err = await putRes.text();
        console.error(`GitHub Update Error (Repo: ${REPO_OWNER}/${REPO_NAME}, Url: ${url})`, err);
        throw new Error(`Failed to update file on GitHub: ${err}`);
    }

    return await putRes.json();
}
