import { test, expect } from '@playwright/test';

test('Scenario 3 - Input Form Submit: validate error then successful submission', async ({ page }) => {
  // 1. Open Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/');
  console.log('Navigated to Selenium Playground');

  // locator type 1: getByRole (link)
  const inputFormLink = page.getByRole('link', { name: 'Input Form Submit' });
  await inputFormLink.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await inputFormLink.click();
  console.log('Clicked "Input Form Submit" link');

  await expect(page).toHaveURL(/input-form-demo/);
  console.log(`URL validated: ${page.url()}`);

  // 2. Click Submit without filling any fields — locator type 2: getByRole (button)
  const submitBtn = page.getByRole('button', { name: 'Submit' });
  await submitBtn.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await submitBtn.click();
  console.log('Clicked Submit without filling form');

  // 3. Assert HTML5 validation fires on the Name field — locator type 3: id selector
  const nameField = page.locator('#name');
  await nameField.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await expect(nameField).toHaveAttribute('required');
  console.log('Name field has required attribute confirmed');

  const validationMessage = await nameField.evaluate(
    (el) => (el as HTMLInputElement).validationMessage
  );
  expect(validationMessage).not.toBe('');
  console.log(`Browser validation message: "${validationMessage}"`);

  // 4. Fill in all form fields using id selectors
  await page.locator('#name').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#name').fill('John Doe');
  console.log('Filled Name: "John Doe"');

  await page.locator('#inputEmail4').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#inputEmail4').fill('johndoe@example.com');
  console.log('Filled Email: "johndoe@example.com"');

  await page.locator('#inputPassword4').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#inputPassword4').fill('Test@1234');
  console.log('Filled Password');

  await page.locator('#company').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#company').fill('TestMu Corp');
  console.log('Filled Company: "TestMu Corp"');

  await page.locator('#websitename').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#websitename').fill('https://example.com');
  console.log('Filled Website: "https://example.com"');

  // 5. Select country — locator type 4: CSS attribute selector
  const countrySelect = page.locator('select[name="country"]');
  await countrySelect.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await countrySelect.selectOption({ label: 'United States' });
  console.log('Selected Country: "United States"');

  await page.locator('#inputCity').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#inputCity').fill('New York');
  console.log('Filled City: "New York"');

  await page.locator('#inputAddress1').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#inputAddress1').fill('123 Main Street');
  console.log('Filled Address 1: "123 Main Street"');

  await page.locator('#inputAddress2').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#inputAddress2').fill('Apt 4B');
  console.log('Filled Address 2: "Apt 4B"');

  await page.locator('#inputState').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#inputState').fill('NY');
  console.log('Filled State: "NY"');

  await page.locator('#inputZip').evaluate(el => el.scrollIntoView({ block: 'center' }));
  await page.locator('#inputZip').fill('10001');
  console.log('Filled Zip code: "10001"');

  // 6. Submit the completed form
  await submitBtn.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await submitBtn.click();
  console.log('Clicked Submit button');

  // 7. Validate success message — locator type 5: getByText
  const successMsg = page.getByText('Thanks for contacting us, we will get back to you shortly.');
  await successMsg.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await expect(successMsg).toBeVisible();
  console.log('Success message validated');
});
