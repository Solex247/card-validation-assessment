import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ValidateCardDto {
  @Matches(/^\d{8,19}$/, {
    message: 'cardNumber must contain only digits (8-19 characters)',
  })
  @IsString({ message: 'cardNumber must be a string' })
  @IsNotEmpty({ message: 'cardNumber is required' })
  cardNumber!: string;
}
