import { Module } from "@nestjs/common";
import { SortDirection } from "@ptc-org/nestjs-query-core";
import { NestjsQueryGraphQLModule, PagingStrategies } from "@ptc-org/nestjs-query-graphql";
import { NestjsQueryTypeOrmModule } from "@ptc-org/nestjs-query-typeorm";
import { AccessGuard } from "../../providers/security/casl/access.guard";
import { Actions } from "../../providers/security/casl/actions.enum";
import { CheckAbility } from "../../providers/security/casl/decorators/check-ability";
import { CartModule } from "../cart/cart.module";
import { DeliveryMethodModule } from "../delivery-method/delivery-method.module";
import { OrderItemModule } from "../order-item/order-item.module";
import { PaymentIntentModule } from "../payment-intent/payment-intent.module";
import { PaymentMethodModule } from "../payment-method/payment-method.module";
import { ProductVariantModule } from "../product-variant/product-variant.module";
import { WarehouseItemModule } from "../warehouse-item/warehouse-item.module";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { OrderHistoryEntity } from "./entities/order-history.entity";
import { OrderEntity } from "./entities/order.entity";
import { OrderHook } from "./hooks/order.hook";
import { PaymentIntentUpdateListener } from "./listenters/payment-intent-update.listener";
import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        CartModule,
        PaymentMethodModule,
        DeliveryMethodModule,
        WarehouseItemModule,
        OrderItemModule,
        ProductVariantModule,
        PaymentIntentModule,
        NestjsQueryTypeOrmModule.forFeature([OrderEntity, OrderHistoryEntity]),
      ],
      services: [OrderService],
      resolvers: [
        {
          DTOClass: OrderEntity,
          EntityClass: OrderEntity,
          CreateDTOClass: CreateOrderInput,
          UpdateDTOClass: UpdateOrderInput,
          ServiceClass: OrderService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          guards: [AccessGuard],
          read: {
            decorators: [CheckAbility(Actions.READ, OrderEntity)],
            defaultSort: [{ field: "createdAt", direction: SortDirection.DESC }],
          },
          create: {
            decorators: [CheckAbility(Actions.CREATE, OrderEntity)],
            many: { disabled: true },
          },
          update: {
            decorators: [CheckAbility(Actions.UPDATE, OrderEntity, OrderHook)],
            many: { disabled: true },
          },
          delete: {
            decorators: [CheckAbility(Actions.DELETE, OrderEntity, OrderHook)],
            many: { disabled: true },
          },
        },
      ],
    }),
  ],
  providers: [OrderResolver, OrderService, OrderHook, PaymentIntentUpdateListener],
  exports: [OrderResolver, OrderService],
})
export class OrderModule {}
