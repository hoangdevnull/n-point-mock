# N-Point API Server - Complete API Summary

## 🚀 Server Information

- **Base URL**: http://localhost:3001/api
- **Swagger UI**: http://localhost:3001/docs
- **API Key**: `nxt_live_demo_key_123456789`

## 📊 Total Endpoints: 18

### Point Ledger API (5 endpoints)

#### 1. GET /points/balance
Get user's current point balance (free + paid points)

**Swagger**: ✅ Documented
**Example Response:**
```json
{
  "freePoints": 5000,
  "paidPoints": 10000,
  "totalPoints": 15000
}
```

#### 2. POST /points/earn ⭐ NEW!
**Earn free points from user actions**

**Swagger**: ✅ Documented with 4 examples
- Daily login bonus (+50 points)
- Share content (+25 points)
- Complete task (+100 points)
- Referral bonus (+500 points)

**9 Action Types:**
1. `DAILY_LOGIN` - 50 points
2. `COMPLETE_PROFILE` - 100 points
3. `FIRST_GENERATION` - 200 points
4. `SHARE_CONTENT` - 25 points
5. `REFERRAL` - 500 points
6. `WATCH_AD` - 10 points
7. `COMPLETE_TASK` - 100 points (customizable)
8. `ACHIEVEMENT` - 150 points
9. `BONUS` - 50 points (customizable)

**Example:**
```bash
curl -X POST '/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -d '{"action": "DAILY_LOGIN"}'
```

#### 3. GET /points/transactions
Get paginated transaction history with filters

**Swagger**: ✅ Documented
**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)
- `type` (EARN, SPEND, PURCHASE, SWAP, etc.)
- `pointType` (FREE, PAID)
- `startDate`, `endDate`
- `search`

#### 4. GET /points/transactions/:id
Get details of a specific transaction

**Swagger**: ✅ Documented

#### 5. GET /points/stats
Get user statistics (balance, lifetime earned/spent, activity)

**Swagger**: ✅ Documented

---

### Purchase API (7 endpoints)

#### 6. GET /purchases/packages
List all available purchase packages

**Swagger**: ✅ Documented
**Packages:**
- Starter Pack (100 points - $0.99)
- Basic Pack (550 points - $4.99)
- Popular Pack (1200 points - $9.99)

#### 7. GET /purchases/packages/:id
Get details of a specific package

**Swagger**: ✅ Documented

#### 8. POST /purchases/stripe/checkout
Create Stripe checkout session

**Swagger**: ✅ Documented

#### 9. POST /purchases/crypto/initiate
Initiate cryptocurrency payment

**Swagger**: ✅ Documented

#### 10. GET /purchases/crypto/:id/status
Check crypto payment status and confirmations

**Swagger**: ✅ Documented

#### 11. GET /purchases/history
Get user's purchase history

**Swagger**: ✅ Documented
**Filters:** status, paymentMethod, date range

#### 12. GET /purchases/:id
Get details of a specific purchase

**Swagger**: ✅ Documented

---

### Token Swap API (6 endpoints)

#### 13. GET /swaps/config
Get current swap configuration (exchange rate, limits)

**Swagger**: ✅ Documented
**Response:**
```json
{
  "exchangeRate": 0.001,
  "minSwapAmount": 100,
  "maxSwapAmount": 50000,
  "dailySwapLimit": 10000,
  "monthlySwapLimit": 100000
}
```

#### 14. POST /swaps/calculate ⭐ User-Defined Amount
**Calculate tokens for any amount of points you choose**

**Swagger**: ✅ Documented with 3 examples
- Small swap (500 points)
- Medium swap (2,500 points)
- Large swap (10,000 points)

**User can specify ANY amount (100-50,000 points)**

**Example:**
```bash
curl -X POST '/api/swaps/calculate' \
  -d '{"pointsAmount": 1234}'

Response: 1.234 $NXT tokens
```

#### 15. POST /swaps ⭐ User-Defined Amount
**Create swap for your chosen point amount**

**Swagger**: ✅ Documented with 3 examples
- Swap 1,000 points → 1.0 $NXT
- Swap 5,000 points → 5.0 $NXT
- Swap 10,000 points → 10.0 $NXT

**User specifies exact amount to swap**

**Example:**
```bash
curl -X POST '/api/swaps' \
  -d '{
    "pointsAmount": 3000,
    "walletAddress": "0x742d35Cc..."
  }'
```

#### 16. GET /swaps
Get swap history with pagination

**Swagger**: ✅ Documented
**Filters:** status, date range

#### 17. GET /swaps/:id
Get details of a specific swap

**Swagger**: ✅ Documented

#### 18. GET /swaps/limits
Get user's current swap limits (daily/monthly)

**Swagger**: ✅ Documented

---

## 🎯 Key Features

### User-Controlled Amounts
✅ **Swap endpoints** - Users define point amounts (100-50,000)
✅ **Earn endpoints** - Custom amounts for tasks/bonuses
✅ **Multiple examples** in Swagger for each endpoint

### Comprehensive Swagger Documentation
✅ All 18 endpoints documented
✅ Request/response examples
✅ Multiple use-case examples
✅ Clear descriptions
✅ Dropdown examples for easy testing

### Point Earning System
✅ 9 different action types
✅ Default point amounts
✅ Custom amount support
✅ Metadata for context
✅ Transaction tracking

### Flexible Point System
✅ Free points (earned)
✅ Paid points (purchased)
✅ Point history tracking
✅ Balance management

---

## 📚 Documentation Files

1. **[README.md](./README.md)** - Main documentation
2. **[SETUP.md](./SETUP.md)** - Quick setup guide
3. **[EARN_POINTS_GUIDE.md](./EARN_POINTS_GUIDE.md)** - ⭐ NEW! Earn points documentation
4. **[SWAP_ENDPOINT_GUIDE.md](./SWAP_ENDPOINT_GUIDE.md)** - Swap endpoint details
5. **[SWAGGER_UPDATES.md](./SWAGGER_UPDATES.md)** - Swagger enhancements
6. **[QUICK_DEMO.md](./QUICK_DEMO.md)** - Visual demo guide
7. **[API_SUMMARY.md](./API_SUMMARY.md)** - This file

---

## 🧪 Quick Test Commands

### Earn Points
```bash
# Daily login
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{"action": "DAILY_LOGIN"}'

# Result: +50 free points
```

### Calculate Swap
```bash
# Calculate for custom amount
curl -X POST 'http://localhost:3001/api/swaps/calculate' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{"pointsAmount": 2500}'

# Result: 2.5 $NXT tokens
```

### Create Swap
```bash
# Swap user-defined amount
curl -X POST 'http://localhost:3001/api/swaps' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{
    "pointsAmount": 5000,
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  }'

# Result: Swap created for 5.0 $NXT tokens
```

### Get Balance
```bash
curl 'http://localhost:3001/api/points/balance' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001'
```

---

## 🎨 Swagger UI Experience

### Point Ledger Section
- **5 endpoints** all documented
- **Earn Points** has 4 dropdown examples
- Clear action descriptions
- Easy testing

### Purchase Section
- **7 endpoints** all documented
- Package examples with pricing
- Payment method examples
- Status tracking

### Token Swaps Section
- **6 endpoints** all documented
- **User-defined amounts** emphasized
- Multiple example amounts (500, 2500, 10000)
- Clear "ANY amount" messaging

---

## 📊 Endpoint Statistics

| Module | Endpoints | Swagger Documented | Examples |
|--------|-----------|-------------------|----------|
| Point Ledger | 5 | ✅ All | 4+ |
| Purchases | 7 | ✅ All | 3+ |
| Token Swaps | 6 | ✅ All | 6+ |
| **Total** | **18** | **✅ 100%** | **13+** |

---

## 🔑 Authentication

All endpoints require:
```
X-API-Key: nxt_live_demo_key_123456789
```

Optional user identification:
```
X-User-Id: user-001 (or user-002)
```

---

## ⭐ What's New

### Latest Updates:
1. ✅ **Earn Points Endpoint** (`POST /points/earn`)
   - 9 action types
   - Custom amounts
   - Metadata support
   - Swagger documented with examples

2. ✅ **Enhanced Swap Swagger**
   - Clear "user-defined amount" messaging
   - Multiple amount examples
   - Dropdown selection

3. ✅ **Complete Documentation**
   - All 18 endpoints documented
   - 13+ Swagger examples
   - 7 documentation files

---

## 🚀 Getting Started

1. **Start Server:**
   ```bash
   npm run start:dev
   ```

2. **Open Swagger UI:**
   ```
   http://localhost:3001/docs
   ```

3. **Authorize:**
   - Click "Authorize"
   - Enter: `nxt_live_demo_key_123456789`

4. **Try Endpoints:**
   - Each endpoint has "Try it out" button
   - Examples in dropdown menus
   - Instant results

---

## 💡 Use Cases

### For Users:
- Earn points through app engagement
- Purchase points with fiat or crypto
- Swap points to tokens (any amount they choose)
- View complete transaction history

### For Developers:
- Award points for any user action
- Flexible point amounts
- Complete API for point lifecycle
- Easy integration with examples

---

## 🎯 Summary

✅ **18 endpoints** fully functional
✅ **100% Swagger documented** with examples
✅ **User-controlled amounts** for swaps and bonuses
✅ **9 earn actions** for user engagement
✅ **Flexible** point earning and spending
✅ **Professional documentation** for customers
✅ **Demo-ready** with realistic data

Your N-Point API server is complete and ready to demo! 🎉
