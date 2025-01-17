import { Expose, Transform, Type } from 'class-transformer';

export class ProductsDto {
  @Expose()
  totalProducts: number;

  @Expose()
  limit: number;
  
  @Expose()
  @Type(() => ProductList)
  products: ProductList[];
}

export class ProductList {
  @Expose({ name: 'product_id' })
  id: number;

  @Expose({ name: 'product_title' })
  title: string;

  @Expose({ name: 'product_description' })
  description: string;

  @Expose({ name: 'product_price' })
  price: number;

  @Expose({ name: 'product_stock' })
  stock: number;

  @Expose({ name: 'product_image' })
  @Transform(({ value }) => value.toString().split(','))
  image: string[];

  @Transform(({ obj }) => {
    return {
      id: obj.category_id,
      title: obj.category_title,
    };
  })
  @Expose()
  category: any;

  @Expose({ name: 'reviewCount' })
  review: number;

  @Expose({ name: 'avgRating' })
  Rating: number;
}
