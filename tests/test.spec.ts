import { test, expect } from '@playwright/test';

test.only('Check News Order', async ({ page }) => {
  await page.goto('https://news.ycombinator.com/');

  const newsLink = page.getByRole('link', { name: 'new', exact: true });
  await expect(newsLink).toBeEnabled();

  // Navigate to the newest news page
  await newsLink.click();

  // Verify the URL
  await expect(page).toHaveURL('https://news.ycombinator.com/newest');


  let totalNews = 0;
  let lastNewOnPage = null;
  let firstNewOnPage = null;
  const errors: string[] = [];

  while (totalNews < 100) {

    // Compare the last article of the previous page with the first article of the current page
    if (totalNews > 0) {
      firstNewOnPage = await page.locator('.age').nth(0).getAttribute('title');

      if (!firstNewOnPage) {
        throw new Error('Timestamp of the first article on the page is missing!');
      };
    
      if (!lastNewOnPage) {
        throw new Error('Timestamp of the last article on the page is missing!');
      };

      if (lastNewOnPage < firstNewOnPage) {
        errors.push(`News ${totalNews} and ${totalNews + 1} are not correctly sorted!`);
      };
    }

    // Count the articles on the current page
    let quantityNewsOnPage = await page.locator('.age').count();

    // Throw an error if no articles are found
    if (quantityNewsOnPage === 0) {
      throw new Error('No news found on the page!');
    }

    // Limit the comparison to the first 100 articles
    if (totalNews + quantityNewsOnPage > 100) {
      quantityNewsOnPage = 100 - totalNews;
    }

    // Compare the timestamps of consecutive articles
    for (let i = 0 ; i < quantityNewsOnPage - 1; i++) {

      const currentDate = await page.locator('.age').nth(i).getAttribute('title');
      const nextDate = await page.locator('.age').nth(i+1).getAttribute('title');

      if (!currentDate) {
        throw new Error('Date of news not found');
      };

      if (!nextDate) {
        throw new Error('Date of news not found');
      };
   
      console.log(totalNews + i + 1,'.comparison:', i + totalNews + 1, '. new date:' , currentDate, i + totalNews + 2, '. new date:', nextDate);

      if (currentDate < nextDate) {
        errors.push(`News ${i + totalNews + 1} and ${i + totalNews + 2} are not correctly sorted!`);
      };

    };
    
    // Store the timestamp of the last article on the current page
    lastNewOnPage = await page.locator('.age').nth(quantityNewsOnPage-1).getAttribute('title');
    
    // Update the total number of checked articles
    totalNews = totalNews + quantityNewsOnPage;

    // Navigate to the next page if fewer than 100 articles have been checked
    if (totalNews < 100) {
      const moreButton = page.locator('.morelink');

      // Throw an error if the More link is missing
      if (await moreButton.count() === 0) {
        throw new Error(`More link not found! Only ${totalNews} news checked.`);
      }

      await moreButton.click();
    }
  }

  console.log(errors);

  expect(totalNews).toBe(100);

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  console.log('SUCCESS: All 100 news articles are correctly sorted!');

})

