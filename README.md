# Personal portfolio with free hosting on GitHub Pages

This repo contains the code for a simple personal portfolio website that can be hosted for free using GitHub Pages. The site is built using HTML, CSS, and JavaScript, and it fetches data from the GitHub API to display your repositories. Everything built using the O1 model of ChatGPT.

## Steps to Host Your HTML File on GitHub Pages

### 1. Create a New Repository

- **Log in to GitHub** and click on the **"New"** button to create a new repository.
- **Name the repository** `username.github.io`, replacing `username` with your GitHub username. For you, it would be `carlosmgv02.github.io`.
- Ensure the repository is set to **Public**.
- You can add a **README** file if you'd like, but it's not necessary.
- Click on **"Create repository"**.

### 2. Upload Your `index.html` File

#### Option A: Using Git on Your Local Machine

- **Clone the repository** to your local machine using Git:

  ```bash
  git clone https://github.com/carlosmgv02/carlosmgv02.github.io.git
  ```

- **Copy your `index.html` file** into the cloned repository folder.

- **Commit and push** the changes:

  ```bash
  cd carlosmgv02.github.io
  git add index.html
  git commit -m "Add personal portfolio website"
  git push origin main
  ```

#### Option B: Using the GitHub Web Interface

- Go to your repository on GitHub.
- Click on **"Add file"** > **"Upload files"**.
- Drag and drop your `index.html` file.
- Scroll down and click on **"Commit changes"**.

### 3. Enable GitHub Pages

- In your repository, go to **"Settings"**.
- Click on **"Pages"** in the left sidebar.
- Under **"Source"**, ensure that **"Deploy from a branch"** is selected.
- Choose the **main** branch and keep the root folder (`/`).
- Click **"Save"**.
- After a few minutes, your site should be available at:

  ```
  https://carlosmgv02.github.io/
  ```

### 4. Access Your Website

- Open a web browser and navigate to `https://carlosmgv02.github.io/` to see your portfolio live!

## Additional Tips

- **Custom Domain (Optional):** If you have a custom domain, you can set it up in the **"Custom domain"** section under **"Pages"** settings.
- **Updating Your Site:** Any changes you push to the `main` branch will automatically update your live site.
- **Assets and Resources:** Ensure that all assets (images, CSS files, scripts) referenced in your HTML are correctly linked and uploaded to the repository.
- **API Usage:** Since your page fetches data from the GitHub API, be aware of the API rate limits, especially if your site gets a lot of traffic.

## Troubleshooting

- **Site Not Showing Up:** If your site doesn't appear after a few minutes, double-check that your `index.html` file is in the root of the repository and that GitHub Pages is enabled.
- **Console Errors:** Use the browser's developer console to check for any JavaScript errors or issues with API calls.
- **CORS Issues:** When fetching data from the GitHub API, you shouldn't run into CORS issues, but if you do, consider using a proxy or server-side code.

## Useful Resources

- [Official GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Quickstart Guide](https://docs.github.com/en/pages/quickstart)
- [GitHub API Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)

---
