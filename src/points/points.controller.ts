import { Controller, Get, Post, Query, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiHeader, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { UserId } from '../common/decorators/user-id.decorator';
import { EarnPointsDto, EarnAction } from './dto/earn-points.dto';
import {
  DUMMY_BALANCES,
  DUMMY_TRANSACTIONS,
  DUMMY_USERS,
} from '../common/data/dummy-data';

@ApiTags('Point Ledger')
@ApiSecurity('api-key')
@Controller('points')
@UseGuards(ApiKeyGuard)
export class PointsController {
  @Get('balance')
  @ApiOperation({ summary: 'Get user point balance' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  getBalance(@UserId() userId: string) {
    const balance = DUMMY_BALANCES[userId] || DUMMY_BALANCES['user-001'];
    const totalPoints = balance.freePoints + balance.paidPoints;

    return {
      success: true,
      data: {
        ...balance,
        totalPoints,
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Post('earn')
  @ApiOperation({
    summary: 'Earn free points from user actions',
    description: 'Award free points to users for completing various actions like daily login, sharing, completing tasks, etc.',
  })
  @ApiBody({
    type: EarnPointsDto,
    description: 'Specify the action that earns points',
    examples: {
      dailyLogin: {
        value: { action: 'DAILY_LOGIN' },
        summary: 'Daily login bonus (+50 points)',
      },
      shareContent: {
        value: { action: 'SHARE_CONTENT' },
        summary: 'Share content (+25 points)',
      },
      completeTask: {
        value: {
          action: 'COMPLETE_TASK',
          amount: 100,
          metadata: { taskId: 'task-001', taskName: 'Create first AI image' }
        },
        summary: 'Complete task (+100 points)',
      },
      referral: {
        value: {
          action: 'REFERRAL',
          amount: 500,
          metadata: { referredUserId: 'user-002' }
        },
        summary: 'Referral bonus (+500 points)',
      },
    },
  })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  earnPoints(@UserId() userId: string, @Body() dto: EarnPointsDto) {
    const { action, amount, metadata } = dto;

    // Default point amounts for different actions
    const defaultAmounts: Record<EarnAction, number> = {
      [EarnAction.DAILY_LOGIN]: 50,
      [EarnAction.COMPLETE_PROFILE]: 100,
      [EarnAction.FIRST_GENERATION]: 200,
      [EarnAction.SHARE_CONTENT]: 25,
      [EarnAction.REFERRAL]: 500,
      [EarnAction.WATCH_AD]: 10,
      [EarnAction.COMPLETE_TASK]: 100,
      [EarnAction.ACHIEVEMENT]: 150,
      [EarnAction.BONUS]: 50,
    };

    const pointsEarned = amount || defaultAmounts[action];
    const balance = DUMMY_BALANCES[userId] || DUMMY_BALANCES['user-001'];
    const newBalance = balance.freePoints + pointsEarned;

    // Create transaction
    const transaction = {
      id: `trans-${Date.now()}`,
      userId,
      transactionType: 'EARN',
      pointType: 'FREE',
      amount: pointsEarned,
      balanceAfter: newBalance,
      description: this.getActionDescription(action, metadata),
      referenceType: action,
      referenceId: metadata?.taskId || metadata?.achievementId || null,
      metadata,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: {
        transactionId: transaction.id,
        action,
        pointsEarned,
        newBalance: {
          freePoints: newBalance,
          paidPoints: balance.paidPoints,
          totalPoints: newBalance + balance.paidPoints,
        },
        transaction,
      },
      message: `You earned ${pointsEarned} free points for ${this.getActionDescription(action, metadata)}!`,
      timestamp: new Date().toISOString(),
    };
  }

  private getActionDescription(action: EarnAction, metadata?: any): string {
    const descriptions: Record<EarnAction, string> = {
      [EarnAction.DAILY_LOGIN]: 'daily login bonus',
      [EarnAction.COMPLETE_PROFILE]: 'completing your profile',
      [EarnAction.FIRST_GENERATION]: 'your first AI generation',
      [EarnAction.SHARE_CONTENT]: 'sharing content',
      [EarnAction.REFERRAL]: `referring ${metadata?.referredUserId || 'a friend'}`,
      [EarnAction.WATCH_AD]: 'watching an advertisement',
      [EarnAction.COMPLETE_TASK]: metadata?.taskName || 'completing a task',
      [EarnAction.ACHIEVEMENT]: metadata?.achievementName || 'unlocking an achievement',
      [EarnAction.BONUS]: metadata?.reason || 'bonus points',
    };

    return descriptions[action];
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get transaction history' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'pointType', required: false, type: String })
  getTransactions(
    @UserId() userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('type') type?: string,
    @Query('pointType') pointType?: string,
  ) {
    // Filter transactions by user
    let transactions = DUMMY_TRANSACTIONS.filter((tx) => tx.userId === userId);

    // Apply filters
    if (type) {
      transactions = transactions.filter((tx) => tx.transactionType === type);
    }
    if (pointType) {
      transactions = transactions.filter((tx) => tx.pointType === pointType);
    }

    // Pagination
    const total = transactions.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = transactions.slice(startIndex, endIndex);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('transactions/:id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  getTransaction(@UserId() userId: string, @Param('id') id: string) {
    const transaction = DUMMY_TRANSACTIONS.find(
      (tx) => tx.id === id && tx.userId === userId,
    );

    if (!transaction) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Transaction not found',
        },
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      data: transaction,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user point statistics' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  getStats(@UserId() userId: string) {
    const balance = DUMMY_BALANCES[userId] || DUMMY_BALANCES['user-001'];
    const transactions = DUMMY_TRANSACTIONS.filter((tx) => tx.userId === userId);

    const earnedTransactions = transactions.filter(
      (tx) => tx.amount > 0,
    ).length;
    const spentTransactions = transactions.filter((tx) => tx.amount < 0).length;

    return {
      success: true,
      data: {
        balance: {
          freePoints: balance.freePoints,
          paidPoints: balance.paidPoints,
          lockedPoints: balance.lockedPoints,
          totalPoints: balance.freePoints + balance.paidPoints,
        },
        lifetime: {
          totalEarned: balance.totalEarned,
          totalSpent: balance.totalSpent,
          netBalance: balance.totalEarned - balance.totalSpent,
        },
        activity: {
          totalTransactions: transactions.length,
          earnedTransactions,
          spentTransactions,
          lastTransaction: transactions[0]?.createdAt || null,
        },
      },
      timestamp: new Date().toISOString(),
    };
  }
}
