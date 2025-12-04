# Swagger Documentation Updates for User-Defined Swap Amounts

## ✅ Updates Completed

The Swagger documentation has been enhanced to clearly show that users can define their own swap amounts.

## What Changed

### 1. Calculate Swap Endpoint (`POST /swaps/calculate`)

**New Summary:**
> Calculate tokens for user-defined point amount

**New Description:**
> Preview how many $NXT tokens you will receive for ANY amount of points you want to swap (100-50,000 points). This does NOT create a swap, just shows the calculation.

**New Examples in Swagger UI:**
- **Small swap (500 points)** - Shows 500 points example
- **Medium swap (2,500 points)** - Shows 2,500 points example
- **Large swap (10,000 points)** - Shows 10,000 points example

### 2. Create Swap Endpoint (`POST /swaps`)

**New Summary:**
> Create swap for user-defined point amount

**New Description:**
> Create a swap request to convert YOUR CHOSEN amount of paid points to $NXT tokens. You specify exactly how many points (100-50,000) you want to swap.

**New Examples in Swagger UI:**
- **Swap 1,000 points → 1.0 $NXT**
- **Swap 5,000 points → 5.0 $NXT**
- **Swap 10,000 points → 10.0 $NXT**

### 3. Get Config Endpoint (`GET /swaps/config`)

**New Description:**
> Returns the exchange rate and limits. Users can swap any amount between min and max limits.

## How to Test in Swagger UI

### Step 1: Open Swagger UI
```
http://localhost:3001/docs
```

### Step 2: Authorize
1. Click the "Authorize" button at the top
2. Enter API Key: `nxt_live_demo_key_123456789`
3. Click "Authorize" then "Close"

### Step 3: Try Calculate Endpoint

1. Find **"Token Swaps"** section
2. Click **"POST /swaps/calculate"**
3. Click **"Try it out"**
4. You'll see example dropdown with 3 pre-filled examples:
   - Small swap (500 points)
   - Medium swap (2,500 points)
   - Large swap (10,000 points)
5. Select one or enter your own custom amount
6. Click **"Execute"**

**Result:** You'll see exactly how many tokens you'll get!

### Step 4: Try Create Swap Endpoint

1. Click **"POST /swaps"**
2. Click **"Try it out"**
3. You'll see example dropdown with 3 pre-filled examples:
   - Swap 1,000 points → 1.0 $NXT
   - Swap 5,000 points → 5.0 $NXT
   - Swap 10,000 points → 10.0 $NXT
4. Select one or modify the `pointsAmount` field
5. Update the `walletAddress` field
6. Click **"Execute"**

**Result:** Swap will be created for your chosen amount!

## Screenshots of What Users Will See

### Calculate Swap - Swagger UI View
```
POST /swaps/calculate
Calculate tokens for user-defined point amount

Preview how many $NXT tokens you will receive for ANY amount
of points you want to swap (100-50,000 points). This does NOT
create a swap, just shows the calculation.

Request body:
┌─────────────────────────────────────┐
│ Example: ▼ Small swap (500 points) │
├─────────────────────────────────────┤
│ {                                   │
│   "pointsAmount": 500               │
│ }                                   │
└─────────────────────────────────────┘

Examples dropdown:
• Small swap (500 points)
• Medium swap (2,500 points)
• Large swap (10,000 points)
```

### Create Swap - Swagger UI View
```
POST /swaps
Create swap for user-defined point amount

Create a swap request to convert YOUR CHOSEN amount of paid
points to $NXT tokens. You specify exactly how many points
(100-50,000) you want to swap.

Request body:
┌──────────────────────────────────────────┐
│ Example: ▼ Swap 1,000 points → 1.0 $NXT │
├──────────────────────────────────────────┤
│ {                                        │
│   "pointsAmount": 1000,                  │
│   "walletAddress": "0x742d35Cc..."      │
│ }                                        │
└──────────────────────────────────────────┘

Examples dropdown:
• Swap 1,000 points → 1.0 $NXT
• Swap 5,000 points → 5.0 $NXT
• Swap 10,000 points → 10.0 $NXT
```

## DTO Validation Added

### CalculateSwapDto
```typescript
{
  pointsAmount: number  // Required, minimum 100
}
```

**Swagger Schema:**
- Type: number
- Minimum: 100
- Example: 1000
- Description: "Number of points to swap"

### CreateSwapDto
```typescript
{
  pointsAmount: number,      // Required, min 100, max 50000
  walletAddress: string,     // Required
  idempotencyKey?: string    // Optional
}
```

**Swagger Schema:**
- pointsAmount:
  - Type: number
  - Minimum: 100
  - Maximum: 50000
  - Example: 1000
  - Description: "Number of paid points to swap to tokens"

- walletAddress:
  - Type: string
  - Example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  - Description: "Wallet address to receive tokens (Ethereum format)"

## Testing Custom Amounts

### Test 1: Exact Amount (1,234 points)
```bash
curl -X POST 'http://localhost:3001/api/swaps/calculate' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'Content-Type: application/json' \
  -d '{"pointsAmount": 1234}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pointsAmount": 1234,
    "tokenAmount": 1.234,
    "exchangeRate": 0.001
  }
}
```

### Test 2: Small Amount (250 points)
```bash
curl -X POST 'http://localhost:3001/api/swaps/calculate' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'Content-Type: application/json' \
  -d '{"pointsAmount": 250}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pointsAmount": 250,
    "tokenAmount": 0.25,
    "exchangeRate": 0.001
  }
}
```

### Test 3: Large Amount (25,000 points)
```bash
curl -X POST 'http://localhost:3001/api/swaps/calculate' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'Content-Type: application/json' \
  -d '{"pointsAmount": 25000}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pointsAmount": 25000,
    "tokenAmount": 25.0,
    "exchangeRate": 0.001
  }
}
```

## User Experience Improvements

### Before Update
❌ Not clear that users can choose amount
❌ No examples in Swagger UI
❌ Generic descriptions

### After Update
✅ **Clear messaging**: "user-defined point amount"
✅ **Multiple examples**: Small, medium, large swaps
✅ **Descriptive text**: "YOUR CHOSEN amount", "ANY amount"
✅ **Validation shown**: Min 100, max 50,000
✅ **Dropdown examples**: Easy to test without typing

## Files Modified

1. **`src/swaps/swaps.controller.ts`**
   - Added `@ApiBody` decorators with examples
   - Updated `@ApiOperation` descriptions
   - Changed parameter types to use DTOs
   - Added multiple example values

2. **`src/swaps/dto/calculate-swap.dto.ts`** (New)
   - Validation: Min 100 points
   - Swagger documentation
   - Clear property descriptions

3. **`src/swaps/dto/create-swap.dto.ts`** (New)
   - Validation: Min 100, Max 50,000 points
   - Wallet address validation
   - Idempotency key support
   - Swagger documentation

## Key Swagger Features Used

1. **`@ApiBody` with Examples**
   - Multiple pre-filled examples
   - Shows realistic use cases
   - Easy dropdown selection

2. **`@ApiOperation` with Descriptions**
   - Clear summary text
   - Detailed descriptions
   - User-friendly language

3. **DTO Class Validators**
   - `@Min()` - Minimum value validation
   - `@Max()` - Maximum value validation
   - `@IsNumber()` - Type validation
   - Automatically shows in Swagger schema

4. **`@ApiProperty` Decorators**
   - Example values
   - Min/max constraints
   - Field descriptions

## Verification

The updates are live and can be verified at:

1. **Swagger UI**: http://localhost:3001/docs
2. **Swagger JSON**: http://localhost:3001/docs-json

Look for:
- "Calculate tokens for user-defined point amount"
- "Create swap for user-defined point amount"
- Example dropdowns with multiple swap amounts
- Clear indication that users choose the amount

## Summary

✅ Swagger documentation now **clearly shows** users can define their own swap amounts
✅ Multiple **real examples** (500, 1000, 2500, 5000, 10000 points)
✅ **Descriptive text** emphasizes user control
✅ **Easy testing** with pre-filled example dropdowns
✅ **Validation rules** visible in the schema (100-50,000 points)
✅ **Professional presentation** for your customer

Your customer can now open Swagger UI and immediately see that they have full control over swap amounts! 🎉
