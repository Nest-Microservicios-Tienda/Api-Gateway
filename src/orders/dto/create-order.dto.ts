import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatusList } from '../../../../orders-ms/src/enums/order-enum';
import { OrderStatus } from '../enums/order-enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAumont: number;

  @IsNumber()
  @IsPositive()
  totalItem: number;

  @IsEnum(OrderStatusList, {
    message: `Possibles status values are ${OrderStatusList}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsOptional()
  @IsBoolean()
  paid: boolean = false;
}
