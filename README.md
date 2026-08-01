# Playwright 101 - TestMu AI Certification Assignment

Automated test suite for the [TestMu AI Selenium Playground](https://www.testmuai.com/selenium-playground/) built with Playwright (TypeScript).

## Test Scenarios

| # | Scenario | Page | What it validates |
|---|---|---|---|
| 1 | Simple Form Demo | `/simple-form-demo` | Enter a message and verify it appears in the output |
| 2 | Drag & Drop Slider | `/drag-drop-range-sliders-demo` | Move the "Default value 15" slider to 95 and verify the output |
| 3 | Input Form Submit | `/input-form-demo` | Verify HTML5 validation fires on empty submit, then fill and submit the full form |

## Locator Types Used

- `getByRole()` — links and buttons
- `getByPlaceholder()` — text inputs
- `locator('#id')` — id selectors
- `locator('css[attr]')` — CSS attribute selectors
- `getByText()` — text content

## Project Structure

```
playwright-test/
├── tests/
│   ├── scenario1-simple-form.spec.ts
│   ├── scenario2-drag-drop-slider.spec.ts
│   └── scenario3-input-form.spec.ts
├── playwright.config.ts          # Local runs (Chromium + Firefox)
├── playwright.config.testmu.ts   # TestMu AI cloud runs
├── .github/workflows/
│   └── playwright.yml            # CI via TestMu AI cloud
└── .env                          # Credentials (not committed)
```

## Prerequisites

- Node.js 18+
- Playwright: `npm install`
- Local browsers: `npx playwright install`

## Running Locally

```bash
# All scenarios (Chromium + Firefox)
npm test

# Individual scenarios
npm run test:scenario1
npm run test:scenario2
npm run test:scenario3

# View HTML report
npm run report
```

## Running on TestMu AI Cloud

Create a `.env` file in the project root:

```
LT_USERNAME=your_lambdatest_username
LT_ACCESS_KEY=your_lambdatest_access_key
```

```bash
# Both browsers (Windows 10 Chrome + macOS Sonoma Firefox)
npm run test:testmu

# Chrome only
npm run test:testmu:chrome

# Firefox only
npm run test:testmu:firefox
```

## CI/CD

GitHub Actions runs all tests on **TestMu AI cloud** on every push to `main`.

Add the following secrets to your repository (**Settings → Secrets → Actions**):

| Secret | Value |
|---|---|
| `LT_USERNAME` | Your LambdaTest username |
| `LT_ACCESS_KEY` | Your LambdaTest access key |

## Cloud Configuration

- **Build:** `Playwright 101 Assignment`
- **Project:** `TestMu AI Certification`
- **Browsers:** Chrome 150 on Windows 10 · Firefox (latest) on macOS Sonoma
- **Features enabled:** Video · Network logs · Console logs · Screenshots
