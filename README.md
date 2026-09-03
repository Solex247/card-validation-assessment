# Card Number Validation API

A backend service that validates card numbers using the Luhn algorithm, built with NestJS and TypeScript.

**Live API:** https://card-validation-assessment.onrender.com
**Live frontend:** https://card-validation-frontend.vercel.app

> Note: the backend runs on Render's free tier, which spins down after
> inactivity. The first request after a period of no traffic can take up to
> ~50 seconds to respond while the instance wakes up.

...
## Tech Stack
- Node.js + TypeScript (`strict: true`)
- NestJS
- Jest (testing)
- class-validator / class-transformer (input validation)

## Getting Started

```bash
npm install
npm run start:dev
```

The server runs on `http://localhost:3000` by default.
The live link of this server = https://card-validation-assessment.onrender.com

## Running Tests

```bash
npm run test
```

## API

### `POST /card/validate`
https://card-validation-assessment.onrender.com/card/validate

**Request body:**
```json
{ "cardNumber": "4532015112830366" }
```

**Response (200):**
```json
{ "cardNumber": "4532015112830366", "valid": true }
```

**Response (400) — invalid input:**
```json
{
  "statusCode": 400,
  "message": ["cardNumber is required"],
  "error": "Bad Request"
}
```

## Design Decisions

- **`cardNumber` is a string, not a number.** Card numbers can have leading zeros and exceed `Number.MAX_SAFE_INTEGER`, so a numeric type risks silent data corruption.
- **Input is validated at the DTO layer** using `class-validator` (digits only, 8-19 chars) before it reaches business logic. Malformed input is rejected with a 400 automatically via NestJS's global `ValidationPipe`, rather than manual `if` checks scattered through the controller.
- **Spaces, dashes, and any non-digit characters are rejected, not stripped.** The DTO regex (`^\d{8,19}$`) only accepts pure digit strings. This was a deliberate scope decision — normalizing input formats (e.g. stripping `"4532-0151-1283-0366"`) is a reasonable next step but was left out to keep validation rules unambiguous within the assessment window.
- **`stopAtFirstError: true` is set on the global `ValidationPipe`**, so a request returns one clear error message instead of every failed rule at once. Decorator order matters here — `class-validator` runs decorators bottom-up (closest to the property first), so `@IsNotEmpty` is placed nearest `cardNumber` to ensure "cardNumber is required" is the message returned for missing/empty input, rather than a less intuitive pattern-mismatch message.
- **The Luhn check is a pure, framework-independent function** (`luhn.util.ts`), separate from the NestJS service layer. This keeps it trivially unit-testable and keeps the service layer free to grow (e.g. card network detection) without touching the core algorithm.
- **Response returns `200 OK`, not `201 Created`** — this endpoint checks a value, it doesn't create a resource.

## What I'd Add With More Time
- Card network detection (Visa/Mastercard/Amex by prefix)
- Integration tests on the HTTP layer (supertest)
- Option to normalize input (strip spaces/dashes) instead of rejecting it outright
- Rate limiting / request logging