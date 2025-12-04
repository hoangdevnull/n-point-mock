import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiHeader, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { UserId } from '../common/decorators/user-id.decorator';
import { CalculateSwapDto } from './dto/calculate-swap.dto';
import { CreateSwapDto } from './dto/create-swap.dto';
import {
  DUMMY_SWAP_CONFIG,
  DUMMY_SWAPS,
  DUMMY_SWAP_LIMITS,
} from '../common/data/dummy-data';

@ApiTags('Token Swaps')
@ApiSecurity('api-key')
@Controller('swaps')
@UseGuards(ApiKeyGuard)
export class SwapsController {
  @Get('config')
  @ApiOperation({
    summary: 'Get current swap configuration',
    description: 'Returns the exchange rate and limits. Users can swap any amount between min and max limits.',
  })
  getConfig() {
    return {
      success: true,
      data: DUMMY_SWAP_CONFIG,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('calculate')
  @ApiOperation({
    summary: 'Calculate tokens for user-defined point amount',
    description: 'Preview how many $NXT tokens you will receive for ANY amount of points you want to swap (100-50,000 points). This does NOT create a swap, just shows the calculation.',
  })
  @ApiBody({
    type: CalculateSwapDto,
    description: 'Specify how many points you want to swap',
    examples: {
      small: {
        value: { pointsAmount: 500 },
        summary: 'Small swap (500 points)',
      },
      medium: {
        value: { pointsAmount: 2500 },
        summary: 'Medium swap (2,500 points)',
      },
      large: {
        value: { pointsAmount: 10000 },
        summary: 'Large swap (10,000 points)',
      },
    },
  })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  calculateSwap(
    @UserId() userId: string,
    @Body() dto: CalculateSwapDto,
  ) {
    const { pointsAmount } = dto;
    const { exchangeRate } = DUMMY_SWAP_CONFIG;

    const tokenAmount = pointsAmount * exchangeRate;
    const limits = DUMMY_SWAP_LIMITS[userId] || DUMMY_SWAP_LIMITS['user-001'];

    return {
      success: true,
      data: {
        pointsAmount,
        tokenAmount,
        exchangeRate,
        estimatedGasFee: 0.0001,
        estimatedTimeSeconds: 300,
        userLimits: {
          dailyRemaining: limits.daily.remaining,
          monthlyRemaining: limits.monthly.remaining,
        },
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create swap for user-defined point amount',
    description: 'Create a swap request to convert YOUR CHOSEN amount of paid points to $NXT tokens. You specify exactly how many points (100-50,000) you want to swap.',
  })
  @ApiBody({
    type: CreateSwapDto,
    description: 'Specify how many points you want to swap and your wallet address',
    examples: {
      example1: {
        value: {
          pointsAmount: 1000,
          walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        },
        summary: 'Swap 1,000 points → 1.0 $NXT',
      },
      example2: {
        value: {
          pointsAmount: 5000,
          walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        },
        summary: 'Swap 5,000 points → 5.0 $NXT',
      },
      example3: {
        value: {
          pointsAmount: 10000,
          walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        },
        summary: 'Swap 10,000 points → 10.0 $NXT',
      },
    },
  })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  createSwap(
    @UserId() userId: string,
    @Body() dto: CreateSwapDto,
  ) {
    const { pointsAmount, walletAddress } = dto;
    const { exchangeRate } = DUMMY_SWAP_CONFIG;
    const tokenAmount = pointsAmount * exchangeRate;

    const swapId = `swap-${Date.now()}`;

    return {
      success: true,
      data: {
        swapId,
        pointsAmount,
        tokenAmount,
        exchangeRate,
        walletAddress,
        status: 'PENDING',
        estimatedCompletionTime: new Date(
          Date.now() + 5 * 60 * 1000,
        ).toISOString(),
        createdAt: new Date().toISOString(),
      },
      message:
        'Swap request created successfully. Points have been locked and will be processed shortly. (DEMO MODE)',
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get swap history' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  getSwaps(
    @UserId() userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('status') status?: string,
  ) {
    let swaps = DUMMY_SWAPS.filter((s) => s.userId === userId);

    // Apply filters
    if (status) {
      swaps = swaps.filter((s) => s.status === status);
    }

    // Pagination
    const total = swaps.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = swaps.slice(startIndex, endIndex);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: data.map((swap) => ({
        id: swap.id,
        pointsAmount: swap.pointsAmount,
        tokenAmount: swap.tokenAmount,
        exchangeRate: swap.exchangeRate,
        walletAddress: swap.walletAddress.substring(0, 6) + '...' + swap.walletAddress.slice(-6),
        status: swap.status,
        blockchainTxHash: swap.blockchainTxHash,
        confirmations: swap.confirmations,
        minimumConfirmations: swap.minimumConfirmations,
        completedAt: swap.completedAt,
        createdAt: swap.createdAt,
      })),
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

  @Get('limits')
  @ApiOperation({ summary: 'Get user swap limits' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  getSwapLimits(@UserId() userId: string) {
    const limits = DUMMY_SWAP_LIMITS[userId] || DUMMY_SWAP_LIMITS['user-001'];

    return {
      success: true,
      data: limits,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get swap details' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  getSwap(@UserId() userId: string, @Param('id') id: string) {
    const swap = DUMMY_SWAPS.find((s) => s.id === id && s.userId === userId);

    if (!swap) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Swap not found',
        },
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      data: {
        ...swap,
        pointTransaction: swap.status === 'COMPLETED' ? {
          id: `trans-${swap.id}`,
          type: 'SWAP',
          amount: -swap.pointsAmount,
          balanceAfter: 9000,
        } : null,
        blockchainConfirmations: swap.confirmations || 15,
        updatedAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };
  }
}
