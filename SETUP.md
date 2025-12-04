# Quick Setup Guide

## Prerequisites

- Node.js >= 16.0.0
- npm or yarn

## Installation & Running

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

**Development mode (with auto-reload):**
```bash
npm run start:dev
```

**Production mode:**
```bash
npm run build
npm run start:prod
```

The server will start on **http://localhost:3001**

## Testing the API

### Option 1: Use Swagger UI (Recommended)

Open your browser and navigate to:
```
http://localhost:3001/docs
```

Click "Authorize" and enter the API key:
```
nxt_live_demo_key_123456789
```

### Option 2: Use curl

**Test Point Balance:**
```bash
curl -X GET http://localhost:3001/api/points/balance \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user-001",
    "freePoints": 5000,
    "paidPoints": 10000,
    "lockedPoints": 500,
    "totalPoints": 15000,
    "totalEarned": 50000,
    "totalSpent": 35500,
    "lastUpdated": "2025-12-04T10:30:00.000Z"
  },
  "timestamp": "2025-12-04T10:30:00.000Z"
}
```

**List Purchase Packages:**
```bash
curl -X GET http://localhost:3001/api/purchases/packages \
  -H "X-API-Key: nxt_live_demo_key_123456789"
```

**Get Swap Configuration:**
```bash
curl -X GET http://localhost:3001/api/swaps/config \
  -H "X-API-Key: nxt_live_demo_key_123456789"
```

**Create a Swap (POST request):**
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

## Available Endpoints

### Point Ledger (4 endpoints)
- `GET /api/points/balance` - Get user balance
- `GET /api/points/transactions` - Get transaction history with pagination
- `GET /api/points/transactions/:id` - Get specific transaction
- `GET /api/points/stats` - Get user statistics

### Purchases (7 endpoints)
- `GET /api/purchases/packages` - List all packages
- `GET /api/purchases/packages/:id` - Get package details
- `POST /api/purchases/stripe/checkout` - Create Stripe session
- `POST /api/purchases/crypto/initiate` - Initiate crypto payment
- `GET /api/purchases/crypto/:id/status` - Check payment status
- `GET /api/purchases/history` - Get purchase history
- `GET /api/purchases/:id` - Get purchase details

### Token Swaps (6 endpoints)
- `GET /api/swaps/config` - Get swap configuration
- `POST /api/swaps/calculate` - Calculate token amount
- `POST /api/swaps` - Create swap request
- `GET /api/swaps` - Get swap history
- `GET /api/swaps/:id` - Get swap details
- `GET /api/swaps/limits` - Get user swap limits

## Demo Users

You can test with these users by setting the `X-User-Id` header:

- `user-001` (default) - Has 5000 free points, 10000 paid points
- `user-002` - Has 2000 free points, 5000 paid points

## Configuration

Edit `.env` to customize:

```env
PORT=3001
API_PREFIX=api
API_KEY=nxt_live_demo_key_123456789
CORS_ORIGIN=*
```

## Troubleshooting

### Port already in use

If port 3001 is already in use, change it in `.env`:
```env
PORT=3002
```

### Authentication errors

Make sure you're including the API key header:
```
X-API-Key: nxt_live_demo_key_123456789
```

### Module not found errors

Run:
```bash
npm install
```

## Next Steps

For full implementation with database, real payments, and blockchain:
- See `../docs/n-point-system/IMPLEMENTATION_PLAN.md`
- See `../docs/n-point-system/DATABASE_MIGRATIONS.md`
- See `../docs/n-point-system/API_SPECIFICATION.md`

## Demo Mode Notice

⚠️ This is a **demo server** with:
- Hardcoded API key
- In-memory dummy data
- No database persistence
- Mocked payment responses
- No actual blockchain integration

Perfect for testing, prototyping, and demonstrating the API structure!
