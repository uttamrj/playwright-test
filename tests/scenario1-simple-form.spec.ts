import { test, expect } from '@playwright/test';

test('Scenario 1 - Simple Form Demo: enter message and validate output', async ({ page }) => {
  const message = 'Welcome to TestMu AI';

  // 1. Open Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/');
  console.log('Navigated to Selenium Playground');

  // 2. Click "Simple Form Demo" — locator type: getByRole (link)
  const simpleFormLink = page.getByRole('link', { name: 'Simple Form Demo' });
  await simpleFormLink.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await simpleFormLink.click();
  console.log('Clicked "Simple Form Demo" link');

  // 3. Validate URL contains "simple-form-demo"
  await expect(page).toHaveURL(/simple-form-demo/);
  console.log(`URL validated: ${page.url()}`);

  // 4. Enter message in the text box — locator type: getByPlaceholder
  const messageInput = page.getByPlaceholder('Please enter your Message');
  await messageInput.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await messageInput.fill(message);
  console.log(`Entered message: "${message}"`);

  // 5. Click "Get Checked Value" — locator type: CSS :has-text selector
  const getCheckedBtn = page.locator('button:has-text("Get Checked Value")');
  await getCheckedBtn.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await getCheckedBtn.click();
  console.log('Clicked "Get Checked Value" button');

  // 6. Validate output message — locator type: id selector
  const outputMessage = page.locator('#message');
  await outputMessage.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await expect(outputMessage).toHaveText(message);
  console.log(`Output message validated: "${message}"`);
});
