# Feedback Access Card — QA Automation Portfolio

An end-to-end UI automation project for the Feedback Access Card application. It demonstrates how I use Playwright and TypeScript to check core user journeys, form validation, role-based access, and card status behavior.

## What this project tests

| Area | Example checks |
| --- | --- |
| Smoke testing | Successful login, dashboard visibility, and navigation to administration pages |
| Access card details | Updating a card status and confirming notes appear in the history timeline |
| Input validation | Accepting valid notes, including special characters, and rejecting empty or whitespace-only notes |
| Role-based access | Checking which roles can access card and card-status actions |
| Card status | Checking status-page controls, default active behavior, and newly created cards |

The tests use Page Object Model classes to keep page interactions separate from test scenarios.

## Tools

- [Playwright Test](https://playwright.dev/)
- TypeScript
- Node.js and npm
- Google Chrome (the configured Playwright project uses the `chrome` channel)

## Project structure

```text
.
├── pages/                      # Page Object Model classes
├── tests/
│   ├── smoke-test.spec.ts      # Core application smoke scenarios
│   ├── detail card-epass-automation/
│   ├── role access-epass-automation/
│   └── status card-epass-automation/
├── playwright.config.ts        # Test, browser, and report configuration
└── package.json                # Project scripts and dependencies
```

## Getting started

### Prerequisites

- Node.js and npm
- Access to an authorized test environment and test accounts
- Google Chrome installed on your machine

### Install dependencies

```bash
npm install
npx playwright install chrome
```

### Run the tests

Set the credentials for the scenarios you want to run in your environment before starting Playwright. The tests fail with a list of missing variable names if credentials are not configured.

| Test account | Environment variables |
| --- | --- |
| General user (smoke, detail-card, and status-card tests) | `FAC_GENERAL_USERNAME`, `FAC_GENERAL_PASSWORD` |
| System administrator | `FAC_SYSADMIN_USERNAME`, `FAC_SYSADMIN_PASSWORD` |
| Network operator | `FAC_NETWORK_OP_USERNAME`, `FAC_NETWORK_OP_PASSWORD` |
| TL Network Operator | `FAC_TL_NETWORK_OP_USERNAME`, `FAC_TL_NETWORK_OP_PASSWORD` |
| Shift Leader | `FAC_SHIFT_LEADER_USERNAME`, `FAC_SHIFT_LEADER_PASSWORD` |

On PowerShell, set them for the current terminal session before running tests:

```powershell
$env:FAC_GENERAL_USERNAME = "<authorized test username>"
$env:FAC_GENERAL_PASSWORD = "<authorized test password>"
npm test
```

Set the other role credentials when running role-access tests. Never commit credentials or paste them into source files.

```bash
# Run the full suite
npm test

# Run tests with the browser visible
npm run test:headed
```

To run one test file:

```bash
npx playwright test tests/smoke-test.spec.ts
```

The configured base URL is `https://dashboard.devepass3dc.dti.co.id`. Tests run against that application and some scenarios update card data or role permissions. Run them only when you have authorization and are using an environment where those changes are appropriate.

## Test results and debugging

The HTML reporter is enabled in [playwright.config.ts](./playwright.config.ts). After a run, open the generated report with:

```bash
npm run report
```

The configuration also captures traces, screenshots, and videos to help investigate failures. Playwright writes generated results to `playwright-report/` and `test-results/`.

## Security before publishing

Credentials are read from environment variables and are not stored in the repository. If any credentials previously present in the test source were real, rotate them. Do not commit passwords, tokens, `.env` files, or other secrets.

## Portfolio note

This repository is a demonstration of QA automation practices: readable test scenarios, reusable page objects, assertions on user-visible behavior, and browser artifacts for debugging. Test results depend on the availability and data of the configured application.
