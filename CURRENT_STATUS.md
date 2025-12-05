# N-Point API Server - Current Status

## 🟢 Active Endpoints (5)

### Point Ledger Module

All point-related endpoints are **active and functional**:

1. **GET /api/points/balance** - View current point balance
   ```bash
   curl -X GET http://localhost:3001/api/points/balance \
     -H "X-API-Key: nxt_live_demo_key_123456789" \
     -H "X-User-Id: user-001"
   ```

2. **POST /api/points/earn** - Earn points from user actions
   ```bash
   curl -X POST http://localhost:3001/api/points/earn \
     -H "X-API-Key: nxt_live_demo_key_123456789" \
     -H "X-User-Id: user-001" \
     -H "Content-Type: application/json" \
     -d '{"action": "DAILY_LOGIN"}'
   ```

   **Available Actions:**
   - `DAILY_LOGIN` (50 points)
   - `COMPLETE_PROFILE` (100 points)
   - `FIRST_GENERATION` (200 points)
   - `SHARE_CONTENT` (25 points)
   - `REFERRAL` (500 points)
   - `WATCH_AD` (10 points)
   - `COMPLETE_TASK` (100 points, customizable)
   - `ACHIEVEMENT` (150 points)
   - `BONUS` (50 points, customizable)

3. **GET /api/points/transactions** - View transaction history
   ```bash
   curl -X GET "http://localhost:3001/api/points/transactions?page=1&limit=10" \
     -H "X-API-Key: nxt_live_demo_key_123456789" \
     -H "X-User-Id: user-001"
   ```

4. **GET /api/points/transactions/:id** - Get specific transaction details
   ```bash
   curl -X GET http://localhost:3001/api/points/transactions/trans-001 \
     -H "X-API-Key: nxt_live_demo_key_123456789" \
     -H "X-User-Id: user-001"
   ```

5. **GET /api/points/stats** - View user statistics
   ```bash
   curl -X GET http://localhost:3001/api/points/stats \
     -H "X-API-Key: nxt_live_demo_key_123456789" \
     -H "X-User-Id: user-001"
   ```

## 🔴 Hidden Endpoints

### Purchase Module (7 endpoints)
**Status:** Temporarily disabled
**Reason:** Will be enabled in future updates

- GET /api/purchases/packages
- GET /api/purchases/packages/:id
- POST /api/purchases/stripe/checkout
- POST /api/purchases/crypto/initiate
- GET /api/purchases/crypto/:id/status
- GET /api/purchases/history
- GET /api/purchases/:id

### Token Swaps Module (6 endpoints)
**Status:** Temporarily disabled
**Reason:** Will be enabled in future updates

- GET /api/swaps/config
- POST /api/swaps/calculate
- POST /api/swaps
- GET /api/swaps
- GET /api/swaps/:id
- GET /api/swaps/limits

## 🚀 Server Information

- **Base URL**: http://localhost:3001/api
- **Swagger UI**: http://localhost:3001/docs
- **API Key**: `nxt_live_demo_key_123456789`
- **Port**: 3001

## 📊 Summary

| Module | Endpoints | Status |
|--------|-----------|--------|
| Point Ledger | 5 | ✅ Active |
| Purchases | 7 | 🔴 Hidden |
| Token Swaps | 6 | 🔴 Hidden |
| **Total** | **18** | **5 Active** |

## 🔧 How to Re-enable Hidden Modules

To re-enable the Purchase and Swap modules, edit `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PointsModule } from './points/points.module';
import { PurchasesModule } from './purchases/purchases.module';  // Uncomment
import { SwapsModule } from './swaps/swaps.module';              // Uncomment

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PointsModule,
    PurchasesModule,  // Uncomment
    SwapsModule,      // Uncomment
  ],
})
export class AppModule {}
```

The server will automatically reload with all endpoints active.

## 📚 Documentation

- [README.md](README.md) - Main documentation
- [SETUP.md](SETUP.md) - Setup guide
- [EARN_POINTS_GUIDE.md](EARN_POINTS_GUIDE.md) - Earn points details
- [API_SUMMARY.md](API_SUMMARY.md) - Complete API overview
- [SWAGGER_UPDATES.md](SWAGGER_UPDATES.md) - Swagger documentation details

## ✅ Verification

Test the active server:

```bash
# Test balance endpoint
curl http://localhost:3001/api/points/balance \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001"

# Test earn points
curl -X POST http://localhost:3001/api/points/earn \
  -H "X-API-Key: nxt_live_demo_key_123456789" \
  -H "X-User-Id: user-001" \
  -H "Content-Type: application/json" \
  -d '{"action": "DAILY_LOGIN"}'

# Verify hidden endpoints return 404
curl http://localhost:3001/api/swaps/config \
  -H "X-API-Key: nxt_live_demo_key_123456789"
# Expected: {"message":"Cannot GET /api/swaps/config","error":"Not Found","statusCode":404}
```

---

**Last Updated**: December 5, 2025
**Server Version**: 1.0.0
**Status**: Running in development mode
