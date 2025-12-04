import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { UserId } from '../common/decorators/user-id.decorator';
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
