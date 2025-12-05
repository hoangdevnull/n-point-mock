import { IsNumber, IsString, IsEnum, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum EarnAction {
  DAILY_LOGIN = 'DAILY_LOGIN',
  COMPLETE_PROFILE = 'COMPLETE_PROFILE',
  FIRST_GENERATION = 'FIRST_GENERATION',
  SHARE_CONTENT = 'SHARE_CONTENT',
  REFERRAL = 'REFERRAL',
  WATCH_AD = 'WATCH_AD',
  COMPLETE_TASK = 'COMPLETE_TASK',
  ACHIEVEMENT = 'ACHIEVEMENT',
  BONUS = 'BONUS',
}

export class EarnPointsDto {
  @ApiProperty({
    enum: EarnAction,
    description: 'Type of action that earns points',
    example: EarnAction.DAILY_LOGIN,
  })
  @IsEnum(EarnAction)
  action: EarnAction;

  @ApiProperty({
    description: 'Optional custom amount (defaults based on action)',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  amount?: number;

  @ApiProperty({
    description: 'Additional metadata about the action',
    required: false,
    example: { taskId: 'task-001', difficulty: 'medium' },
  })
  @IsOptional()
  metadata?: any;
}
