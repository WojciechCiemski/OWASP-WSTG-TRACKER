# OWASP WSTG Tracker

Interactive tracker for the 110 tests from the [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/). The application is a static site that runs entirely in the browser, stores your progress locally, and supports importing/exporting results.

## Getting Started

You can run the tracker either directly from the cloned repository or by serving it through a small static server.

### GitHub Pages

The repository is ready to be published through GitHub Pages. Once the repository is pushed to GitHub:

1. Open the repository settings.
2. Navigate to the **Pages** section.
3. Select the **Deploy from a branch** option.
4. Choose the `main` branch and the `/ (root)` directory.
5. Save. GitHub Pages will provide a public URL when the deployment finishes.

### Local Development

Requirements: Node.js 18 or newer.

```bash
npm start
```

`npm start` launches a minimal static file server on port `4173`. The console will print the exact URL.

Alternatively, open `index.html` directly in your browser without using Node.js. All application data is loaded client-side.

## Features

- Filter and search by test name, category, and status.
- Update the progress state for every OWASP WSTG test (not started, blocked, in progress, done, not applicable).
- Add free-form notes to each test.
- Review overall completion statistics.
- Export your progress to JSON and import it later.

## License

[MIT](LICENSE)
