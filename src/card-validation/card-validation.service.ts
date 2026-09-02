import { Injectable } from '@nestjs/common';
import { isValidLuhn } from './luhn.util';

@Injectable()
export class CardValidationService {
  validate(cardNumber: string): boolean {
    return isValidLuhn(cardNumber);
  }
}
