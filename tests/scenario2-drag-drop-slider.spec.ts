import { test, expect } from '@playwright/test';

test('Scenario 2 - Drag & Drop Slider: set Default value 15 slider to 95', async ({ page }) => {
  // 1. Open Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/');
  console.log('Navigated to Selenium Playground');

  // locator type: getByRole (link)
  const sliderLink = page.getByRole('link', { name: 'Drag & Drop Sliders' });
  await sliderLink.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await sliderLink.click();
  console.log('Clicked "Drag & Drop Sliders" link');

  // 2. Locate the "Default value 15" slider — locator type: CSS attribute selector
  const slider = page.locator('input.sp__range[value="15"]');
  await slider.waitFor({ state: 'visible' });
  await slider.evaluate(el => el.scrollIntoView({ block: 'center' }));
  console.log('Slider "Default value 15" located and visible');

  // Get bounding box to calculate drag positions
  const box = await slider.boundingBox();
  if (!box) throw new Error('Could not find slider bounding box');
  console.log(`Slider bounding box — x: ${box.x.toFixed(0)}, width: ${box.width.toFixed(0)}`);

  // Range: min=1, max=100 → drag from value 15 to value 95
  const y = box.y + box.height / 2;
  const startX = box.x + ((15 - 1) / 99) * box.width;
  const endX = box.x + ((95 - 1) / 99) * box.width;

  await page.mouse.move(startX, y);
  await page.mouse.down();
  await page.mouse.move(endX, y, { steps: 30 });
  await page.mouse.up();
  console.log('Dragged slider from 15 towards 95');

  // Use fill() to set exact value and trigger output update
  await slider.fill('95');
  console.log('Set slider value to exactly 95');

  // 3. Validate output shows 95 — locator type: id selector on <output> element
  const rangeOutput = page.locator('#rangeSuccess');
  await rangeOutput.evaluate(el => el.scrollIntoView({ block: 'center' }));
  await expect(rangeOutput).toHaveText('95');
  console.log('Slider value validated: 95');
});
