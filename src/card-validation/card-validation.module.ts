import { Module } from '@nestjs/common';
import { CardValidationController } from './card-validation.controller';
import { CardValidationService } from './card-validation.service';

@Module({
  controllers: [CardValidationController],
  providers: [CardValidationService],
})
export class CardValidationModule {}
