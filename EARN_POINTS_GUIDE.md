# Earn Points Endpoint Guide

## Overview

The **Earn Points** endpoint allows users to receive free N-Points for completing various actions in your application.

## Endpoint

```
POST /api/points/earn
```

## Authentication

Requires API key in header:
```
X-API-Key: nxt_live_demo_key_123456789
```

## Available Actions

Users can earn points from these actions:

### 1. DAILY_LOGIN
**Default Points:** 50
**Description:** Daily login bonus
**Example:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{"action": "DAILY_LOGIN"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pointsEarned": 50,
    "newBalance": {
      "freePoints": 5050,
      "paidPoints": 10000,
      "totalPoints": 15050
    }
  },
  "message": "You earned 50 free points for daily login bonus!"
}
```

### 2. COMPLETE_PROFILE
**Default Points:** 100
**Description:** Completing user profile
**Example:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{"action": "COMPLETE_PROFILE"}'
```

### 3. FIRST_GENERATION
**Default Points:** 200
**Description:** Creating first AI generation
**Example:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{"action": "FIRST_GENERATION"}'
```

### 4. SHARE_CONTENT
**Default Points:** 25
**Description:** Sharing content on social media
**Example:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{"action": "SHARE_CONTENT"}'
```

### 5. REFERRAL
**Default Points:** 500
**Description:** Referring a friend
**Example with metadata:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "REFERRAL",
    "metadata": {"referredUserId": "user-002"}
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pointsEarned": 500,
    "newBalance": {
      "freePoints": 5500,
      "paidPoints": 10000,
      "totalPoints": 15500
    }
  },
  "message": "You earned 500 free points for referring user-002!"
}
```

### 6. WATCH_AD
**Default Points:** 10
**Description:** Watching an advertisement
**Example:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{"action": "WATCH_AD"}'
```

### 7. COMPLETE_TASK
**Default Points:** 100
**Description:** Completing a task
**Custom Amount Supported:** Yes
**Example with custom amount:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "COMPLETE_TASK",
    "amount": 150,
    "metadata": {
      "taskId": "task-001",
      "taskName": "Create 5 AI images"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pointsEarned": 150,
    "newBalance": {
      "freePoints": 5150,
      "paidPoints": 10000,
      "totalPoints": 15150
    },
    "transaction": {
      "id": "trans-1764898383017",
      "description": "Create 5 AI images"
    }
  },
  "message": "You earned 150 free points for Create 5 AI images!"
}
```

### 8. ACHIEVEMENT
**Default Points:** 150
**Description:** Unlocking an achievement
**Example:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "ACHIEVEMENT",
    "metadata": {
      "achievementId": "ach-001",
      "achievementName": "Power User"
    }
  }'
```

### 9. BONUS
**Default Points:** 50
**Description:** General bonus points
**Example:**
```bash
curl -X POST 'http://localhost:3001/api/points/earn' \
  -H 'X-API-Key: nxt_live_demo_key_123456789' \
  -H 'X-User-Id: user-001' \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "BONUS",
    "amount": 75,
    "metadata": {"reason": "Customer appreciation"}
  }'
```

## Request Schema

```typescript
{
  action: string,        // Required: Action type (enum)
  amount?: number,       // Optional: Custom amount (overrides default)
  metadata?: object      // Optional: Additional context
}
```

## Response Schema

```typescript
{
  success: boolean,
  data: {
    transactionId: string,
    action: string,
    pointsEarned: number,
    newBalance: {
      freePoints: number,
      paidPoints: number,
      totalPoints: number
    },
    transaction: {
      id: string,
      userId: string,
      transactionType: "EARN",
      pointType: "FREE",
      amount: number,
      balanceAfter: number,
      description: string,
      referenceType: string,
      referenceId: string | null,
      metadata: object,
      createdAt: string
    }
  },
  message: string,
  timestamp: string
}
```

## Default Point Amounts

| Action | Points | Description |
|--------|--------|-------------|
| DAILY_LOGIN | 50 | Daily login bonus |
| COMPLETE_PROFILE | 100 | Complete user profile |
| FIRST_GENERATION | 200 | First AI generation |
| SHARE_CONTENT | 25 | Share content |
| REFERRAL | 500 | Refer a friend |
| WATCH_AD | 10 | Watch advertisement |
| COMPLETE_TASK | 100 | Complete a task |
| ACHIEVEMENT | 150 | Unlock achievement |
| BONUS | 50 | General bonus |

## Custom Amounts

You can override the default amount for any action:

```json
{
  "action": "COMPLETE_TASK",
  "amount": 250
}
```

This is useful for:
- Variable difficulty tasks
- Special events (double points)
- VIP bonuses
- Seasonal promotions

## Metadata

Add context to transactions with metadata:

```json
{
  "action": "COMPLETE_TASK",
  "metadata": {
    "taskId": "task-001",
    "taskName": "Create first masterpiece",
    "difficulty": "hard",
    "category": "creative"
  }
}
```

**Common metadata fields:**
- `taskId`: Task identifier
- `taskName`: Human-readable task name
- `achievementId`: Achievement identifier
- `achievementName`: Achievement name
- `referredUserId`: ID of referred user
- `reason`: Bonus reason
- `campaignId`: Marketing campaign ID

## Integration Examples

### Daily Login System
```typescript
// When user logs in
async function handleDailyLogin(userId: string) {
  // Check if already claimed today
  const lastLogin = await getLastLogin(userId);
  if (isToday(lastLogin)) {
    return { alreadyClaimed: true };
  }

  // Award points
  const response = await fetch('/api/points/earn', {
    method: 'POST',
    headers: {
      'X-API-Key': API_KEY,
      'X-User-Id': userId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'DAILY_LOGIN' }),
  });

  return response.json();
}
```

### Task Completion
```typescript
// When user completes a task
async function completeTask(userId: string, task: Task) {
  const response = await fetch('/api/points/earn', {
    method: 'POST',
    headers: {
      'X-API-Key': API_KEY,
      'X-User-Id': userId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'COMPLETE_TASK',
      amount: task.pointReward,
      metadata: {
        taskId: task.id,
        taskName: task.name,
        difficulty: task.difficulty,
      },
    }),
  });

  return response.json();
}
```

### Referral Program
```typescript
// When referral is confirmed
async function awardReferralBonus(referrerId: string, newUserId: string) {
  const response = await fetch('/api/points/earn', {
    method: 'POST',
    headers: {
      'X-API-Key': API_KEY,
      'X-User-Id': referrerId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'REFERRAL',
      metadata: {
        referredUserId: newUserId,
      },
    }),
  });

  return response.json();
}
```

## Swagger UI

In Swagger UI, you'll see examples for:
- Daily login bonus (+50 points)
- Share content (+25 points)
- Complete task (+100 points)
- Referral bonus (+500 points)

Each example can be selected from a dropdown and executed immediately.

## Use Cases

### Gaming & Engagement
- Daily login streaks
- Level up bonuses
- Achievement unlocks
- Competition rewards

### Social & Viral
- Share to social media
- Invite friends
- Content creation
- Community participation

### Marketing
- Watch advertisements
- Complete surveys
- Try new features
- Seasonal promotions

### Retention
- Come back bonuses
- Milestone rewards
- Loyalty points
- VIP perks

## Best Practices

1. **Use appropriate actions**: Match the action to the user behavior
2. **Add metadata**: Include context for better analytics
3. **Custom amounts**: Adjust points for difficulty/value
4. **Descriptive metadata**: Makes transactions easier to understand
5. **Track in analytics**: Use transactionId for tracking

## Testing in Swagger

1. Open http://localhost:3001/docs
2. Navigate to "Point Ledger" section
3. Find "POST /points/earn"
4. Click "Try it out"
5. Select an example from dropdown
6. Click "Execute"
7. See points awarded instantly!

## Summary

✅ **9 action types** for different user behaviors
✅ **Default point amounts** for each action
✅ **Custom amounts** for flexibility
✅ **Metadata support** for context
✅ **Transaction tracking** for every award
✅ **Swagger examples** for easy testing
✅ **Real-time balance updates**

Users can now earn free N-Points for engaging with your app! 🎉
