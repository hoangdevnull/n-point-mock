import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { UserId } from '../common/decorators/user-id.decorator';
import {
  DUMMY_PACKAGES,
  DUMMY_PURCHASES,
} from '../common/data/dummy-data';

@ApiTags('Purchases')
@ApiSecurity('api-key')
@Controller('purchases')
@UseGuards(ApiKeyGuard)
export class PurchasesController {
  @Get('packages')
  @ApiOperation({ summary: 'List available purchase packages' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean })
  getPackages(@Query('featured') featured?: boolean) {
    let packages = DUMMY_PACKAGES;

    if (featured !== undefined) {
      packages = packages.filter((pkg) => pkg.isFeatured === featured);
    }

    return {
      success: true,
      data: packages,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('packages/:id')
  @ApiOperation({ summary: 'Get package details' })
  getPackage(@Param('id') id: string) {
    const pkg = DUMMY_PACKAGES.find((p) => p.id === id);

    if (!pkg) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Package not found',
        },
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      data: pkg,
      timestamp: new Date().toISOString(),
    };
  }

  // Hidden for now - will be enabled in future updates
  // @Post('stripe/checkout')
  // @ApiOperation({ summary: 'Create Stripe checkout session' })
  // @ApiHeader({
  //   name: 'X-User-Id',
  //   description: 'User ID (optional, defaults to user-001)',
  //   required: false,
  // })
  // createStripeCheckout(
  //   @UserId() userId: string,
  //   @Body() body: { packageId: string; successUrl: string; cancelUrl: string },
  // ) {
  //   const pkg = DUMMY_PACKAGES.find((p) => p.id === body.packageId);

  //   if (!pkg) {
  //     return {
  //       success: false,
  //       error: {
  //         code: 'NOT_FOUND',
  //         message: 'Package not found',
  //       },
  //       timestamp: new Date().toISOString(),
  //     };
  //   }

  //   // Mock Stripe checkout session
  //   const sessionId = `cs_test_${Math.random().toString(36).substring(7)}`;
  //   const purchaseId = `purchase-${Date.now()}`;

  //   return {
  //     success: true,
  //     data: {
  //       sessionId,
  //       checkoutUrl: `https://checkout.stripe.com/c/pay/${sessionId}`,
  //       purchaseId,
  //       expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  //     },
  //     message: 'Checkout session created successfully (DEMO MODE)',
  //     timestamp: new Date().toISOString(),
  //   };
  // }

  // Hidden for now - will be enabled in future updates
  // @Post('crypto/initiate')
  // @ApiOperation({ summary: 'Initiate crypto payment' })
  // @ApiHeader({
  //   name: 'X-User-Id',
  //   description: 'User ID (optional, defaults to user-001)',
  //   required: false,
  // })
  // initiateCryptoPayment(
  //   @UserId() userId: string,
  //   @Body() body: { packageId: string; cryptoCurrency: string; network: string },
  // ) {
  //   const pkg = DUMMY_PACKAGES.find((p) => p.id === body.packageId);

  //   if (!pkg) {
  //     return {
  //       success: false,
  //       error: {
  //         code: 'NOT_FOUND',
  //         message: 'Package not found',
  //       },
  //       timestamp: new Date().toISOString(),
  //     };
  //   }

  //   const crypto = pkg.pricing.crypto.currencies.find(
  //     (c) => c.currency === body.cryptoCurrency,
  //   );

  //   if (!crypto) {
  //     return {
  //       success: false,
  //       error: {
  //         code: 'UNSUPPORTED_CURRENCY',
  //         message: 'Cryptocurrency not supported for this package',
  //       },
  //       timestamp: new Date().toISOString(),
  //     };
  //   }

  //   // Mock crypto payment
  //   const purchaseId = `purchase-${Date.now()}`;
  //   const paymentAddress = `0x${Math.random().toString(16).substring(2, 42)}`;

  //   return {
  //     success: true,
  //     data: {
  //       purchaseId,
  //       paymentAddress,
  //       amount: crypto.amount,
  //       currency: crypto.currency,
  //       network: body.network,
  //       qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  //       expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  //       status: 'PENDING',
  //       minimumConfirmations: 12,
  //     },
  //     message: `Send exactly ${crypto.amount} ${crypto.currency} to the payment address (DEMO MODE)`,
  //     timestamp: new Date().toISOString(),
  //   };
  // }

  @Get('crypto/:id/status')
  @ApiOperation({ summary: 'Check crypto payment status' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  getCryptoPaymentStatus(@UserId() userId: string, @Param('id') id: string) {
    // Mock status check
    const purchase = DUMMY_PURCHASES.find(
      (p) => p.id === id && p.paymentMethod === 'CRYPTO',
    );

    if (purchase) {
      return {
        success: true,
        data: {
          purchaseId: purchase.id,
          status: purchase.paymentStatus,
          paymentAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
          expectedAmount: purchase.cryptoAmount,
          receivedAmount: purchase.cryptoAmount,
          currency: purchase.cryptoCurrency,
          transactionHash: purchase.cryptoTxHash,
          confirmations: purchase.confirmations || 12,
          minimumConfirmations: purchase.minimumConfirmations || 12,
          estimatedCompletionTime:
            purchase.paymentStatus === 'PROCESSING'
              ? new Date(Date.now() + 5 * 60 * 1000).toISOString()
              : null,
          createdAt: purchase.createdAt,
          updatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };
    }

    // Mock response for non-existent purchase
    return {
      success: true,
      data: {
        purchaseId: id,
        status: 'PENDING',
        paymentAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        expectedAmount: '0.005',
        receivedAmount: '0.000',
        currency: 'ETH',
        transactionHash: null,
        confirmations: 0,
        minimumConfirmations: 12,
        estimatedCompletionTime: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('history')
  @ApiOperation({ summary: 'Get purchase history' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'paymentMethod', required: false, type: String })
  getPurchaseHistory(
    @UserId() userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('status') status?: string,
    @Query('paymentMethod') paymentMethod?: string,
  ) {
    let purchases = DUMMY_PURCHASES.filter((p) => p.userId === userId);

    // Apply filters
    if (status) {
      purchases = purchases.filter((p) => p.paymentStatus === status);
    }
    if (paymentMethod) {
      purchases = purchases.filter((p) => p.paymentMethod === paymentMethod);
    }

    // Pagination
    const total = purchases.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = purchases.slice(startIndex, endIndex);

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

  @Get(':id')
  @ApiOperation({ summary: 'Get purchase details' })
  @ApiHeader({
    name: 'X-User-Id',
    description: 'User ID (optional, defaults to user-001)',
    required: false,
  })
  getPurchase(@UserId() userId: string, @Param('id') id: string) {
    const purchase = DUMMY_PURCHASES.find(
      (p) => p.id === id && p.userId === userId,
    );

    if (!purchase) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Purchase not found',
        },
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      data: {
        ...purchase,
        pointTransaction: purchase.paymentStatus === 'COMPLETED' ? {
          id: `trans-${purchase.id}`,
          amount: purchase.pointsAmount,
          balanceAfter: 10000 + purchase.pointsAmount,
        } : null,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
