# Quick Demo: User-Defined Swap Amounts

## 🎯 The Point: Users Control the Amount!

Users can swap **ANY amount** of points they want (between 100 and 50,000).

## 🚀 Quick Test

### Server is Running
```
✅ Server: http://localhost:3001
✅ Swagger UI: http://localhost:3001/docs
✅ API Key: nxt_live_demo_key_123456789
```

### Test Different Amounts

**Test 1: Small Amount (500 points)**
```bash
curl -X POST 'http://localhost:3001/api/swaps/calculate' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'Content-Type: application/json' \
  -d '{"pointsAmount": 500}'
```
Result: **0.5 $NXT tokens** ✅

**Test 2: Medium Amount (2,500 points)**
```bash
curl -X POST 'http://localhost:3001/api/swaps/calculate' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'Content-Type: application/json' \
  -d '{"pointsAmount": 2500}'
```
Result: **2.5 $NXT tokens** ✅

**Test 3: Custom Amount (1,337 points)**
```bash
curl -X POST 'http://localhost:3001/api/swaps/calculate' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'Content-Type: application/json' \
  -d '{"pointsAmount": 1337}'
```
Result: **1.337 $NXT tokens** ✅

**Test 4: Large Amount (10,000 points)**
```bash
curl -X POST 'http://localhost:3001/api/swaps/calculate' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'Content-Type: application/json' \
  -d '{"pointsAmount": 10000}'
```
Result: **10.0 $NXT tokens** ✅

## 📱 What Your Customer Will See in Swagger UI

### Navigate to Swagger
Open browser: **http://localhost:3001/docs**

### Find Token Swaps Section
Scroll down to **"Token Swaps"** (green section)

### Click "POST /swaps/calculate"
You'll see:

```
POST /swaps/calculate
Calculate tokens for user-defined point amount

Description:
Preview how many $NXT tokens you will receive for ANY amount of
points you want to swap (100-50,000 points). This does NOT create
a swap, just shows the calculation.
```

### Click "Try it out"
You'll see a dropdown with examples:

```
┌─────────────────────────────────────┐
│ Example: ▼                          │
│   • Small swap (500 points)         │
│   • Medium swap (2,500 points)      │
│   • Large swap (10,000 points)      │
└─────────────────────────────────────┘

Request body:
{
  "pointsAmount": 500
}
```

### Select an Example or Enter Custom Amount
Change the number to anything you want:
- 100 (minimum)
- 1,234 (custom)
- 5,000 (medium)
- 50,000 (maximum)

### Click "Execute"
See your result instantly!

```json
{
  "success": true,
  "data": {
    "pointsAmount": 1234,
    "tokenAmount": 1.234,
    "exchangeRate": 0.001,
    "estimatedGasFee": 0.0001,
    "estimatedTimeSeconds": 300
  }
}
```

## 🎨 Visual Flow

```
User Opens Swagger UI
         ↓
Sees "Calculate tokens for user-defined point amount"
         ↓
Clicks "Try it out"
         ↓
Sees Example Dropdown:
  - 500 points
  - 2,500 points
  - 10,000 points
         ↓
Selects example OR types custom amount (e.g., 3,456)
         ↓
Clicks "Execute"
         ↓
Gets result: "3.456 $NXT tokens"
         ↓
User understands: "I can swap ANY amount I want!"
```

## 💡 Key Messages in Swagger

1. **Endpoint Title**: "Calculate tokens for **user-defined point amount**"
2. **Description**: "for **ANY amount** of points you want to swap"
3. **Examples**: Multiple amounts showing flexibility
4. **Schema**: Min: 100, Max: 50,000 (user's choice)

## 📊 Comparison

### Other Systems (Fixed Packages)
```
❌ Package 1: Swap 1,000 points
❌ Package 2: Swap 5,000 points
❌ Package 3: Swap 10,000 points
```
User must choose from fixed options.

### Your System (User-Defined)
```
✅ User enters: 1,234 points
✅ User enters: 5,678 points
✅ User enters: any amount (100-50,000)
```
User has complete control!

## 🎯 Summary

**What Changed:**
- ✅ Swagger now says "user-defined point amount"
- ✅ Multiple examples in dropdown (500, 2500, 10000)
- ✅ Clear description: "ANY amount you want to swap"
- ✅ Schema shows flexible range (100-50,000)

**User Understanding:**
- ✅ Users immediately see they control the amount
- ✅ Examples show different use cases
- ✅ Easy to test with any custom value
- ✅ Professional, clear documentation

**Technical:**
- ✅ Proper DTOs with validation
- ✅ Swagger decorators with examples
- ✅ Min/max constraints visible
- ✅ Type-safe endpoints

Your customer can now demonstrate the API with confidence that users understand they have full control over swap amounts! 🚀
