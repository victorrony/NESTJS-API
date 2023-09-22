import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number & max decimal precission 2' },
  )
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @IsNotEmpty({ message: 'Stock is required' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @Min(0, { message: 'Stock must be greater than 0' })
  stock: number;

  @IsNotEmpty({ message: 'Image is required' })
  @IsArray({ message: 'Image must be an array format' })
  image: string[];

  @IsNotEmpty({ message: 'Category is required' })
  @IsNumber({}, { message: 'Category must be a number' })
  categoryId: number;
}
