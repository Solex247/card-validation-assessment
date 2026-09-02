import { Module } from '@nestjs/common';
import { CardValidationModule } from './card-validation/card-validation.module';

@Module({
  imports: [CardValidationModule],
})
export class AppModule {}