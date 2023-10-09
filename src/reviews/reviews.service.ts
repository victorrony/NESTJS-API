import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductsService,
  ) {}
  async create(
    createReviewDto: CreateReviewDto,
    currentUser: UserEntity,
  ): Promise<ReviewEntity> {
    const product = await this.productService.findOne(
      +createReviewDto.productId,
    );
    
    let review = await this.findOneByUserAndProduct(
      currentUser.id,
      createReviewDto.productId,
    );

    if (!review) {
      review = this.reviewRepository.create(createReviewDto);
      review.user = currentUser;
      review.products = product;
    } else {
      review.comment = createReviewDto.comment;
      review.ratings = createReviewDto.ratings;
    }
    return await this.reviewRepository.save(review);
  }

  async findAll(): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find();
  }

  async findAllByProduct(id: number) {
    const product = await this.productService.findOne(id);
    return await this.reviewRepository.find({
      where: { products: { id } },
      relations: {
        user: true,
        products: {
          category: true,
        },
      },
    });
  }
  async findOne(id: number): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: {
        user: true,
        products: {
          category: true,
        },
      },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    return await this.reviewRepository.remove(review);
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepository.findOne({
      where: {
        user: { id: userId },
        products: { id: productId },
      },
      relations: {
        user: true,
        products: {
          category: true,
        },
      },
    });
  }
}
