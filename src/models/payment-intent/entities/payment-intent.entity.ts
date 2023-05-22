import { FilterableField } from "@nestjs-query/query-graphql";
import { ID } from "@nestjs/graphql";
import { Column, Index, ManyToOne, OneToOne, Unique } from "typeorm";
import { Entity, ObjectType } from "../../../common/decorators";
import { Authorize } from "../../../common/decorators/graphql/authorize.decorator";
import { FilterableRelation } from "../../../common/decorators/graphql/relation.decorator";
import { Id } from "../../../common/types/id.type";
import { BaseEntity } from "../../base.entity";
import { PaymentMethodEntity } from "../../payment-method/entities/payment-method.entity";
import { PriceEntity } from "../../price/entities/price.entity";

@Authorize()
@FilterableRelation("paymentMethod", () => PaymentMethodEntity)
@FilterableRelation("price", () => PaymentMethodEntity)
@ObjectType()
@Unique("UNQ_payment_intent_client_secret", ["clientSecret"])
@Index("INX_payment_intent_payment_method", ["paymentMethod"])
@Entity()
export class PaymentIntentEntity extends BaseEntity {
  @FilterableField()
  @Column()
  clientSecret!: string;

  @FilterableField(() => ID)
  @Column()
  paymentMethodId!: Id;

  @ManyToOne(() => PaymentMethodEntity, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  paymentMethod!: PaymentMethodEntity;

  @FilterableField(() => ID)
  @Column()
  priceId!: Id;

  @OneToOne(() => PriceEntity, {
    eager: true,
    cascade: true,
  })
  price!: PriceEntity;
}
