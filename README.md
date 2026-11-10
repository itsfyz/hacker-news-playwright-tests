# Hacker News Sorting Test – Playwright & TypeScript

## Overview

This project is an automated test developed with **Playwright and TypeScript** to verify that the first 100 articles on [Hacker News](https://news.ycombinator.com/newest) are sorted from newest to oldest.

The project is based on the QA Wolf QA Engineer take-home assignment. I implemented my own solution using TypeScript and the Playwright Test Runner.

## Technologies

- Playwright
- TypeScript
- Node.js

## Test Scenario

The test performs the following steps:

1. Navigate to Hacker News and open the newest articles page.
2. Retrieve the publication timestamps of the articles.
3. Compare consecutive articles to verify descending chronological order.
4. Navigate through multiple pages until 100 articles have been checked.
5. Verify the chronological order between the last article of one page and the first article of the next page.
6. Collect sorting errors and fail the test if any incorrect order is detected.

## Error Handling

The test also checks for:

- Missing articles on a page.
- Missing publication timestamps.
- Missing **More** link before reaching 100 articles.
- An incorrect total number of checked articles.

## Installation

Install the dependencies:

```bash
npm install
npx playwright install
```

## Running the Test

Run the test:

```bash
npx playwright test
```

Run the test in headed mode:

```bash
npx playwright test --headed
```

## Expected Result

The test passes when the first 100 articles are sorted from newest to oldest.

If any sorting errors are detected, the test fails and reports the positions of the affected articles.

## Credits

Based on the [QA Wolf](https://www.qawolf.com/) QA Engineer take-home assignment. The test implementation was developed independently using Playwright and TypeScript.