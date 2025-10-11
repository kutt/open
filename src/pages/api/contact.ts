// API endpoint to submit contact form as GitHub issue
export async function POST({ request }) {
  try {
    const { title, body, labels } = await request.json();

    // Get GitHub token and repo from environment variables
    const githubToken = import.meta.env.GITHUB_TOKEN;
    const githubRepo = import.meta.env.GITHUB_REPO; // Format: "owner/repo"

    if (!githubToken || !githubRepo) {
      console.error("Missing GitHub configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create GitHub issue
    const issueResponse = await fetch(
      `https://api.github.com/repos/${githubRepo}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          labels: labels || ["contact-form"],
        }),
      }
    );

    if (!issueResponse.ok) {
      const errorData = await issueResponse.json();
      console.error("GitHub API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to create GitHub issue" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const issueData = await issueResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        issueUrl: issueData.html_url,
        issueNumber: issueData.number,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
