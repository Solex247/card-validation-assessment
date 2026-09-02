import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CardValidationService } from './card-validation.service';
import { ValidateCardDto } from './dto/validate-card.dto';

@Controller('card')
export class CardValidationController {
  constructor(private readonly cardValidationService: CardValidationService) {}

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  validate(@Body() dto: ValidateCardDto) {
    const isValid = this.cardValidationService.validate(dto.cardNumber);
    return { cardNumber: dto.cardNumber, valid: isValid };
  }
}
