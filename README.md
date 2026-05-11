Playwright E2E Automation: Multi-Step Enrollment & Payment Suite
This repository contains a professional-grade End-to-End (E2E) automation framework built with Playwright and TypeScript. It is designed to validate a complex enrollment application featuring multi-step forms, dynamic UI states, and secure third-party payment integrations.

🚀 Key Features
Page Object Model (POM): Clean separation of page logic and test scripts for high maintainability.

"Powerhouse" Data Factory: A flexible data generation strategy using Faker.js and TypeScript Partial<T> interfaces.

Iframe Mastery: Specialized handling for secure, cross-origin payment iframes (Stripe/Braintree).

Dynamic State Validation: Automated verification of "Pay" button activation based on Terms & Conditions compliance.

Environment Variable Integration: Support for .env files to manage sensitive test data and credentials.

🛠️ Tech Stack
Language: TypeScript

Framework: Playwright

Data Generation: Faker.js

Configuration: Dotenv

🏗️ Architecture: The "Powerhouse" Pattern
One of the core strengths of this suite is the Data Override Pattern. Instead of hardcoding data, the framework uses a hierarchical approach:

Manual Overrides: Specific data passed for negative testing (e.g., intentionally wrong CVV).

Environment Variables: Secure, real test data pulled from .env.

Faker Defaults: Randomly generated valid data as a fallback.

TypeScript
// Example of the "Powerhouse" helper in action
await fillOutCardDetails(page, { 
    overrides: { cardNumber: '123' }, // Target specific field for negative test
    clickPay: false                   // Assert error messages without submitting
});
🧪 Testing Coverage (User Stories)
This suite automates critical Acceptance Criteria (SEPs) including:

@sep16: Next button navigation and Stepper state transitions.

@sep26: Enabling the "Pay" button via Terms & Conditions toggle.

@sep28-29: Frontend validation for invalid Card Numbers, CVCs, and Expiry Dates.

@sep23: Successful "Happy Path" enrollment and payment confirmation.

⚙️ Setup & Execution
1. Installation
Bash
npm install
npx playwright install
2. Environment Setup
Create a .env file in the root directory:

Bash
CARD_NUMBER=4242424242424242
CARD_EXPIRATION_DATE=1228
CARD_SECURITY_CODE=123
ZIP_CODE=90210
3. Running Tests
Bash
# Run all tests (Headless)
npx playwright test

# Run a specific user story
npx playwright test -g @sep26

# View HTML Report
npx playwright show-report
🔍 Implementation Highlights
Event Triggering: Implemented page.keyboard.press('Tab') and blur() sequences to reliably trigger frontend validation scripts inside secure iframes.

Selector Strategy: Utilized resilient locators combining ARIA roles, IDs, and text-based filters to minimize test flakiness.

Consolidated Suites: Grouped related SEPs into unified spec files to optimize browser context usage and execution speed.
