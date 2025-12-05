# N-Point API Server (Demo Version)

A standalone NestJS API server for the N-Point System with dummy data for testing and demonstration purposes.

## Features

- **Point Ledger API**: View balances, earn points, transactions, and statistics
- **API Key Authentication**: Hardcoded API key for easy testing
- **Swagger Documentation**: Interactive API documentation
- **No Database Required**: All data is mocked in memory

**Note:** Purchase and Token Swap endpoints are currently hidden and will be enabled in future updates.

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
curl -X GET "http://localhost:3001/api/points/transactions?page=1&limit=10" \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001"
```

### Earn Points

```bash
curl -X POST http://localhost:3001/api/points/earn \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "DAILY_LOGIN"
  }'
```

### Get User Statistics

```bash
curl -X GET http://localhost:3001/api/points/stats \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001"
```

## Available Endpoints

### Point Ledger (Active)
- `GET /api/points/balance` - Get user balance
- `POST /api/points/earn` - Earn points from user actions
- `GET /api/points/transactions` - Get transaction history
- `GET /api/points/transactions/:id` - Get transaction details
- `GET /api/points/stats` - Get user statistics

### Purchases (Hidden)
_Coming soon - endpoints currently disabled_

### Token Swaps (Hidden)
_Coming soon - endpoints currently disabled_

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
- **Point Balances**: Free points, paid points, and locked points
- **5 Transactions**: Sample transaction history (EARN, SPEND types)
- **9 Earn Actions**: DAILY_LOGIN, COMPLETE_PROFILE, FIRST_GENERATION, SHARE_CONTENT, REFERRAL, WATCH_AD, COMPLETE_TASK, ACHIEVEMENT, BONUS

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
