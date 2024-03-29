import { ID } from "@nestjs/graphql";
import { SortDirection } from "@ptc-org/nestjs-query-core";
import { FilterableField, FilterableRelation, FilterableUnPagedRelation, QueryOptions } from "@ptc-org/nestjs-query-graphql";
import { Column, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Entity, ObjectType } from "../../../common/decorators";
import { Id } from "../../../common/types/id.type";
import { AddressEntity } from "../../address/entities/address.entity";
import { BaseEntity } from "../../base.entity";
import { DeliveryMethodEntity } from "../../delivery-method/entities/delivery-method.entity";
import { OrderItemEntity } from "../../order-item/entities/order-item.entity";
import { PaymentIntentEntity } from "../../payment-intent/entities/payment-intent.entity";
import { PaymentMethodEntity } from "../../payment-method/entities/payment-method.entity";
import { PriceEntity } from "../../price/entities/price.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderHistoryEntity } from "./order-history.entity";

@QueryOptions({ filterDepth: 5 })
@FilterableRelation("user", () => UserEntity)
@FilterableRelation("paymentMethod", () => PaymentMethodEntity)
@FilterableRelation("deliveryMethod", () => DeliveryMethodEntity)
@FilterableRelation("deliveryAddress", () => AddressEntity)
@FilterableRelation("subtotalPrice", () => PriceEntity)
@FilterableRelation("deliveryPrice", () => PriceEntity)
@FilterableRelation("taxPrice", () => PriceEntity)
@FilterableRelation("totalPrice", () => PriceEntity)
@FilterableRelation("paymentIntent", () => PaymentIntentEntity, { nullable: true })
@FilterableUnPagedRelation("orderItems", () => OrderItemEntity)
@FilterableUnPagedRelation("orderHistories", () => OrderHistoryEntity, { defaultSort: [{ field: "createdAt", direction: SortDirection.ASC }] })
@ObjectType()
@Index("INX_order_index", ["user"])
@Index("INX_order_status", ["status"])
@Index("INX_order_deliveryMethod", ["deliveryMethod"])
@Index("INX_order_deliveryAddress", ["deliveryAddress"])
@Entity()
export class OrderEntity extends BaseEntity {
  @FilterableField(() => ID)
  @Column()
  userId!: Id;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @FilterableField(() => OrderStatus)
  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status!: OrderStatus;

  @FilterableField(() => ID)
  @Column()
  paymentMethodId!: Id;

  @ManyToOne(() => PaymentMethodEntity)
  paymentMethod!: PaymentMethodEntity;

  @FilterableField(() => ID)
  @Column()
  deliveryMethodId!: Id;

  @ManyToOne(() => DeliveryMethodEntity)
  deliveryMethod!: DeliveryMethodEntity;

  @FilterableField(() => ID)
  @Column()
  deliveryAddressId!: Id;

  @ManyToOne(() => AddressEntity)
  deliveryAddress!: AddressEntity;

  @FilterableField(() => ID)
  @Column()
  subtotalPriceId!: Id;

  @OneToOne(() => PriceEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  subtotalPrice!: PriceEntity;

  @FilterableField(() => ID)
  @Column()
  deliveryPriceId!: Id;

  @OneToOne(() => PriceEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  deliveryPrice!: PriceEntity;

  @FilterableField(() => ID)
  @Column()
  taxPriceId!: Id;

  @OneToOne(() => PriceEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  taxPrice!: PriceEntity;

  @FilterableField(() => ID)
  @Column()
  totalPriceId!: Id;

  @OneToOne(() => PriceEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  totalPrice!: PriceEntity;

  @FilterableField(() => ID, { nullable: true })
  @Column({ nullable: true })
  paymentIntentId!: Id;

  @ManyToOne(() => PaymentIntentEntity, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  paymentIntent!: PaymentIntentEntity;

  @OneToMany(() => OrderItemEntity, orderItems => orderItems.order, { cascade: true })
  orderItems!: OrderItemEntity[];

  @OneToMany(() => OrderHistoryEntity, orderHistory => orderHistory.order, {
    eager: true,
    cascade: true,
  })
  orderHistories: OrderHistoryEntity[];
}
