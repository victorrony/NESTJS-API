import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty({ message: 'Id is required' })
  id: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number && max decimal precision 2' },
  )
  @IsPositive({ message: 'Price must be a positive number' })
  product_unit_price: number;

  @IsNumber({}, { message: 'Price must be a number ' })
  @IsPositive({ message: 'Price must be a positive number' })
  product_quantity: number;
}
