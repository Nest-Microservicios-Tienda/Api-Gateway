import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enums/order-enum';

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
  pay: boolean = false;
}
