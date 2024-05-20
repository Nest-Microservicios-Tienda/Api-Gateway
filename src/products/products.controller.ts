import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dtos/pagination-dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly ProductsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDTO: CreateProductDto) {
    return this.ProductsClient.send(
      { cmd: 'create_Product' },
      createProductDTO,
    );
  }

  @Get()
  findAllProduct(@Query() paginationDto: PaginationDto) {
    return this.ProductsClient.send({ cmd: 'findall_Product' }, paginationDto);
  }

  @Get(':id')
  findProductsById(@Param('id') id: string) {
    try {
      const product = this.ProductsClient.send(
        { cmd: 'findById_Product' },
        { id },
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.ProductsClient.send({ cmd: 'delete_Product' }, { id });
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateBodyDTO: UpdateProductDto,
  ) {
    return this.ProductsClient.send(
      { cmd: 'update_Product' },
      {
        id,
        ...updateBodyDTO,
      },
    ).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
