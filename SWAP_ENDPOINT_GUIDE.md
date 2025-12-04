# Token Swap Endpoint - User-Defined Amount Guide

## Overview

The swap endpoints already support **user-defined point amounts**. Users can specify exactly how many points they want to swap to tokens.

## How It Works

### 1. Calculate Swap (Preview)

**Endpoint:** `POST /api/swaps/calculate`

**Purpose:** Calculate how many tokens the user will receive for a specific number of points **without creating an actual swap**.

**Request:**
```bash
curl -X POST http://localhost:3001/api/swaps/calculate \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001" \
  -H "Content-Type: application/json" \
  -d '{
    "pointsAmount": 1000
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pointsAmount": 1000,
    "tokenAmount": 1.0,
    "exchangeRate": 0.001,
    "estimatedGasFee": 0.0001,
    "estimatedTimeSeconds": 300,
    "userLimits": {
      "dailyRemaining": 9000,
      "monthlyRemaining": 95000
    }
  },
  "timestamp": "2025-12-04T10:30:00.000Z"
}
```

### 2. Create Swap (Execute)

**Endpoint:** `POST /api/swaps`

**Purpose:** Create an actual swap request for a user-specified number of points.

**Request:**
```bash
curl -X POST http://localhost:3001/api/swaps \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001" \
  -H "Content-Type: application/json" \
  -d '{
    "pointsAmount": 1000,
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "swapId": "swap-1733330400000",
    "pointsAmount": 1000,
    "tokenAmount": 1.0,
    "exchangeRate": 0.001,
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "status": "PENDING",
    "estimatedCompletionTime": "2025-12-04T10:35:00.000Z",
    "createdAt": "2025-12-04T10:30:00.000Z"
  },
  "message": "Swap request created successfully. Points have been locked and will be processed shortly. (DEMO MODE)",
  "timestamp": "2025-12-04T10:30:00.000Z"
}
```

## User Flow

### Step 1: User Chooses Amount
The user decides how many points they want to swap. For example:
- 100 points → 0.1 $NXT tokens
- 500 points → 0.5 $NXT tokens
- 1000 points → 1.0 $NXT tokens
- 5000 points → 5.0 $NXT tokens

### Step 2: Calculate (Optional)
The user can call `/swaps/calculate` to preview:
- How many tokens they'll receive
- If they have enough points
- If it's within their limits
- Updated balance after swap

### Step 3: Create Swap
The user submits the swap request with their chosen amount:
```json
{
  "pointsAmount": 1000,  // User-specified amount
  "walletAddress": "0x..."
}
```

## Request Parameters

### Calculate Swap DTO
```typescript
{
  "pointsAmount": number  // User specifies: 100 - 50000
}
```

### Create Swap DTO
```typescript
{
  "pointsAmount": number,      // User specifies: 100 - 50000
  "walletAddress": string,     // User's wallet address
  "idempotencyKey": string     // Optional: prevent duplicates
}
```

## Validation & Limits

The system validates the user-specified amount against:

### 1. System Limits
- **Minimum:** 100 points (from config)
- **Maximum:** 50,000 points per transaction (from config)

### 2. User Balance
- Must have enough **paid points** (not free points)
- Example: User has 10,000 paid points, can swap up to 10,000

### 3. Daily Limit
- Default: 10,000 points per day
- Tracks cumulative swaps within 24 hours

### 4. Monthly Limit
- Default: 100,000 points per month
- Tracks cumulative swaps within 30 days

## Example User Scenarios

### Scenario 1: Small Swap
```json
// User wants to test with small amount
{
  "pointsAmount": 100,
  "walletAddress": "0x..."
}
// Result: 0.1 $NXT tokens
```

### Scenario 2: Medium Swap
```json
// User wants moderate amount
{
  "pointsAmount": 5000,
  "walletAddress": "0x..."
}
// Result: 5.0 $NXT tokens
```

### Scenario 3: Maximum Swap
```json
// User wants to swap maximum allowed
{
  "pointsAmount": 50000,
  "walletAddress": "0x..."
}
// Result: 50.0 $NXT tokens
```

### Scenario 4: Custom Amount
```json
// User wants specific amount
{
  "pointsAmount": 1337,
  "walletAddress": "0x..."
}
// Result: 1.337 $NXT tokens
```

## Error Handling

### Insufficient Points
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_POINTS",
    "message": "You don't have enough paid points for this swap",
    "details": {
      "required": 10000,
      "available": 5000
    }
  }
}
```

### Below Minimum
```json
{
  "success": false,
  "error": {
    "code": "BELOW_MINIMUM",
    "message": "Minimum swap amount is 100 points",
    "details": {
      "provided": 50,
      "minimum": 100
    }
  }
}
```

### Above Maximum
```json
{
  "success": false,
  "error": {
    "code": "ABOVE_MAXIMUM",
    "message": "Maximum swap amount is 50000 points per transaction",
    "details": {
      "provided": 100000,
      "maximum": 50000
    }
  }
}
```

### Daily Limit Exceeded
```json
{
  "success": false,
  "error": {
    "code": "DAILY_LIMIT_EXCEEDED",
    "message": "This swap would exceed your daily limit",
    "details": {
      "requested": 5000,
      "dailyRemaining": 3000
    }
  }
}
```

## Swagger UI Testing

1. Open http://localhost:3001/docs
2. Click "Authorize" and enter API key
3. Find "Token Swaps" section
4. Try "POST /swaps/calculate":
   - Click "Try it out"
   - Enter pointsAmount (e.g., 1000)
   - Click "Execute"
5. Try "POST /swaps":
   - Click "Try it out"
   - Enter pointsAmount and walletAddress
   - Click "Execute"

## Configuration

Current swap configuration (in dummy data):
```typescript
{
  exchangeRate: 0.001,        // 1 point = 0.001 $NXT tokens
  dailySwapLimit: 10000,      // 10,000 points per day
  monthlySwapLimit: 100000,   // 100,000 points per month
  minSwapAmount: 100,         // Minimum: 100 points
  maxSwapAmount: 50000,       // Maximum: 50,000 points per tx
  isActive: true
}
```

## Frontend Integration Example

### React Component
```typescript
const SwapForm = () => {
  const [pointsAmount, setPointsAmount] = useState(1000);
  const [calculation, setCalculation] = useState(null);

  // Calculate preview when amount changes
  const calculateSwap = async () => {
    const response = await fetch('/api/swaps/calculate', {
      method: 'POST',
      headers: {
        'X-API-Key': 'nxt_live_demo_key_123456789',
        'X-User-Id': 'user-001',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pointsAmount }),
    });
    const data = await response.json();
    setCalculation(data.data);
  };

  // Create actual swap
  const createSwap = async () => {
    const response = await fetch('/api/swaps', {
      method: 'POST',
      headers: {
        'X-API-Key': 'nxt_live_demo_key_123456789',
        'X-User-Id': 'user-001',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pointsAmount,
        walletAddress: userWallet,
      }),
    });
    const data = await response.json();
    // Handle success
  };

  return (
    <div>
      <input
        type="number"
        value={pointsAmount}
        onChange={(e) => setPointsAmount(Number(e.target.value))}
        min={100}
        max={50000}
      />
      <button onClick={calculateSwap}>Preview</button>
      <button onClick={createSwap}>Swap Now</button>

      {calculation && (
        <div>
          You will receive: {calculation.tokenAmount} $NXT tokens
        </div>
      )}
    </div>
  );
};
```

## Summary

✅ **Users can specify ANY amount** they want to swap (within limits)
✅ **Calculate endpoint** shows preview without commitment
✅ **Create endpoint** executes the swap with user-chosen amount
✅ **Validation** ensures amount is within limits
✅ **Error messages** guide users if amount is invalid
✅ **Flexible** - supports 100 to 50,000 points per transaction

The swap system is fully **user-controlled** - they decide exactly how many points to swap!
