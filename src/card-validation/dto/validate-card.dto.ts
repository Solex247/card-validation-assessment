import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ValidateCardDto {
  @IsNotEmpty({ message: 'cardNumber is required' })
  @IsString({ message: 'cardNumber must be a string' })
  @Matches(/^\d{8,19}$/, {
    message: 'cardNumber must contain only digits (8-19 characters)',
  })
  cardNumber!: string;
}
