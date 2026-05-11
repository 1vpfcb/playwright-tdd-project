# Playwright E2E Automation Suite
## Multi-Step Enrollment and Payment Testing

A professional end-to-end automation framework built with **Playwright** and **TypeScript** to validate a complex enrollment workflow with multi-step forms, dynamic UI states, and secure third-party payment integrations [web:1][web:3].

This suite is designed to support reliable, maintainable, and scalable UI testing for critical user journeys, including form validation, step navigation, iframe-based payment handling, and final confirmation flows [web:1][web:4].

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Test Coverage](#test-coverage)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Implementation Highlights](#implementation-highlights)

## Overview

This repository contains a production-style E2E automation framework for validating a multi-step enrollment application. It focuses on test stability, clean abstraction boundaries, and realistic test data management through a structured data override pattern [web:3][web:7].

The framework is intended to make complex workflows easier to test while keeping test code readable, reusable, and resilient to UI changes [web:1][web:4].

## Key Features

- Page Object Model (POM) for clean separation of page logic and test flow [web:1][web:4].
- Flexible data factory using Faker.js and TypeScript `Partial<T>` overrides.
- Secure iframe handling for third-party payment providers such as Stripe and Braintree.
- Dynamic validation of payment button state based on Terms and Conditions acceptance.
- Environment variable support through `.env` files for secure configuration management [web:3][web:6].

## Architecture

The suite follows a **Data Override Pattern** to reduce hardcoded values and improve test flexibility.

### Data priority

1. Manual overrides for targeted negative and edge-case testing.
2. Environment variables for secure, real test inputs.
3. Faker-generated defaults as a fallback for valid randomized data.

### Example

```ts
await fillOutCardDetails(page, {
  overrides: { cardNumber: '123' },
  clickPay: false,
});
```

This approach makes it easy to reuse the same flow across both happy-path and negative scenarios without duplicating setup logic.

## Test Coverage

This suite automates the following acceptance criteria:

- `@sep16`: Next button navigation and stepper state transitions.
- `@sep26`: Enabling the Pay button through the Terms & Conditions toggle.
- `@sep28-29`: Frontend validation for invalid card numbers, CVVs, and expiration dates.
- `@sep23`: Successful enrollment flow and payment confirmation.

## Tech Stack

- Language: TypeScript
- Automation Framework: Playwright
- Data Generation: Faker.js
- Environment Configuration: dotenv

## Setup

### 1. Install dependencies

```bash
npm install
npx playwright install
```

### 2. Create environment variables

Create a `.env` file in the repository root:

```bash
CARD_NUMBER=4242424242424242
CARD_EXPIRATION_DATE=1228
CARD_SECURITY_CODE=123
ZIP_CODE=90210
```

## Running Tests

### Run the full suite

```bash
npx playwright test
```

### Run a specific user story

```bash
npx playwright test -g @sep26
```

### Open the HTML report

```bash
npx playwright show-report
```

## Implementation Highlights

- Reliable validation triggering using `page.keyboard.press('Tab')` and `blur()` inside secure iframe contexts.
- Resilient selector strategy combining ARIA roles, IDs, and text-based filters to reduce flakiness.
- Consolidated spec files for related scenarios to improve execution efficiency and browser context reuse [web:1][web:4].

## Contributing

Contributions are welcome. Please keep changes focused, maintain test readability, and follow the existing Page Object Model and data factory patterns.


<img width="999" height="727" alt="Screenshot 2026-05-11 115819" src="https://github.com/user-attachments/assets/84277315-02a3-43d2-8e27-a7c3040014a1" />

