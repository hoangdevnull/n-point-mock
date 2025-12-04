# N-Point API Server (Demo Version)

A standalone NestJS API server for the N-Point System with dummy data for testing and demonstration purposes.

## Features

- **Point Ledger API**: View balances, transactions, and statistics
- **Purchase API**: Browse packages, initiate purchases (Stripe & Crypto)
- **Token Swap API**: Calculate swaps, create swap requests, view history
- **API Key Authentication**: Hardcoded API key for easy testing
- **Swagger Documentation**: Interactive API documentation
- **No Database Required**: All data is mocked in memory

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
# Development mode with auto-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The server will start on **http://localhost:3001**

### 3. Access Swagger Documentation

Open your browser and navigate to:

```
http://localhost:3001/docs
```

## API Authentication

All endpoints require an API key in the header:

```bash
X-API-Key: nxt_live_demo_key_123456789
```

## User Identification

You can specify which user's data to retrieve using the header:

```bash
X-User-Id: user-001
```

Available demo users:
- `user-001` (default if not specified)
- `user-002`

## Example API Requests

### Get Point Balance

```bash
curl -X GET http://localhost:3001/api/v1/points/balance \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001"
```

**Response:**
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

### Get Transaction History

```bash
curl -X GET "http://localhost:3001/api/v1/points/transactions?page=1&limit=10" \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001"
```

### List Purchase Packages

```bash
curl -X GET http://localhost:3001/api/v1/purchases/packages \
  -H "X-API-Key: nxt_live_demo_key_123456789"
```

### Create Stripe Checkout

```bash
curl -X POST http://localhost:3001/api/v1/purchases/stripe/checkout \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "pkg-001",
    "successUrl": "https://example.com/success",
    "cancelUrl": "https://example.com/cancel"
  }'
```

### Calculate Token Swap

```bash
curl -X POST http://localhost:3001/api/v1/swaps/calculate \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001" \
  -H "Content-Type: application/json" \
  -d '{
    "pointsAmount": 1000
  }'
```

### Create Token Swap

```bash
curl -X POST http://localhost:3001/api/v1/swaps \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001" \
  -H "Content-Type: application/json" \
  -d '{
    "pointsAmount": 1000,
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }'
```

## Available Endpoints

### Point Ledger
- `GET /api/v1/points/balance` - Get user balance
- `GET /api/v1/points/transactions` - Get transaction history
- `GET /api/v1/points/transactions/:id` - Get transaction details
- `GET /api/v1/points/stats` - Get user statistics

### Purchases
- `GET /api/v1/purchases/packages` - List packages
- `GET /api/v1/purchases/packages/:id` - Get package details
- `POST /api/v1/purchases/stripe/checkout` - Create Stripe checkout
- `POST /api/v1/purchases/crypto/initiate` - Initiate crypto payment
- `GET /api/v1/purchases/crypto/:id/status` - Check crypto payment status
- `GET /api/v1/purchases/history` - Get purchase history
- `GET /api/v1/purchases/:id` - Get purchase details

### Token Swaps
- `GET /api/v1/swaps/config` - Get swap configuration
- `POST /api/v1/swaps/calculate` - Calculate token amount
- `POST /api/v1/swaps` - Create swap request
- `GET /api/v1/swaps` - Get swap history
- `GET /api/v1/swaps/:id` - Get swap details
- `GET /api/v1/swaps/limits` - Get user swap limits

## Configuration

Edit the `.env` file to customize:

```env
PORT=3001
API_PREFIX=api/v1
API_KEY=nxt_live_demo_key_123456789
CORS_ORIGIN=*
```

## Dummy Data

The server includes pre-populated dummy data:

- **2 Demo Users**: user-001, user-002
- **5 Transactions**: Various types (EARN, SPEND, PURCHASE, SWAP)
- **3 Purchase Packages**: Starter, Basic, Popular
- **2 Purchase Records**: One completed (Stripe), one processing (Crypto)
- **2 Swap Records**: One completed, one processing
- **Swap Configuration**: Exchange rates, limits, etc.

You can find and modify the dummy data in `src/common/data/dummy-data.ts`

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  },
  "timestamp": "2025-12-04T10:30:00.000Z"
}
```

Common error codes:
- `UNAUTHORIZED` - Invalid or missing API key
- `NOT_FOUND` - Resource not found
- `UNSUPPORTED_CURRENCY` - Cryptocurrency not supported

## Development

### Project Structure

```
n-point-api-server/
├── src/
│   ├── common/
│   │   ├── data/
│   │   │   └── dummy-data.ts       # All dummy data
│   │   ├── decorators/
│   │   │   └── user-id.decorator.ts
│   │   └── guards/
│   │       └── api-key.guard.ts    # API key authentication
│   ├── points/
│   │   ├── points.controller.ts
│   │   └── points.module.ts
│   ├── purchases/
│   │   ├── purchases.controller.ts
│   │   └── purchases.module.ts
│   ├── swaps/
│   │   ├── swaps.controller.ts
│   │   └── swaps.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
└── README.md
```

### Adding New Endpoints

1. Add dummy data to `src/common/data/dummy-data.ts`
2. Create a new controller method
3. Add Swagger decorators for documentation
4. Test via Swagger UI or curl

### Customizing Authentication

To change the API key, edit `.env`:

```env
API_KEY=your_custom_api_key_here
```

Or modify `src/common/guards/api-key.guard.ts` for more complex logic.

## Limitations

This is a **demo server** with the following limitations:

- **No Database**: All data is in-memory and resets on restart
- **No State Persistence**: Changes don't persist between requests
- **No Real Payments**: Stripe and crypto integrations are mocked
- **No Real Blockchain**: Token swaps don't interact with actual blockchain
- **Hardcoded API Key**: Single API key for all requests
- **Limited Users**: Only 2 demo users available

## Next Steps

To build a production-ready version:

1. Add database integration (PostgreSQL + TypeORM)
2. Implement real Stripe SDK integration
3. Add blockchain integration for crypto payments
4. Implement proper API key management
5. Add rate limiting and security features
6. Implement user authentication (JWT)
7. Add comprehensive error handling
8. Set up logging and monitoring

Refer to the full implementation plan in the main project:
- `docs/n-point-system/IMPLEMENTATION_PLAN.md`
- `docs/n-point-system/DATABASE_MIGRATIONS.md`
- `docs/n-point-system/API_SPECIFICATION.md`

## Support

For questions or issues:
- Check the Swagger documentation at `/docs`
- Review the dummy data in `src/common/data/dummy-data.ts`
- Refer to the main project documentation

## License

[Your License Here]
