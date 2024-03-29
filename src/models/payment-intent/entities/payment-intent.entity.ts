import { ID } from "@nestjs/graphql";
import { FilterableField, FilterableRelation } from "@ptc-org/nestjs-query-graphql";
import { Column, Index, JoinColumn, ManyToOne, OneToOne, Unique } from "typeorm";
import { Entity, ObjectType } from "../../../common/decorators";
import { Authorize } from "../../../common/decorators/graphql/authorize.decorator";
import { Id } from "../../../common/types/id.type";
import { BaseEntity } from "../../base.entity";
import { PaymentMethodEntity } from "../../payment-method/entities/payment-method.entity";
import { PriceEntity } from "../../price/entities/price.entity";
import { PaymentIntentStatus } from "../enum/payment-intent-status.enum";

@Authorize()
@FilterableRelation("paymentMethod", () => PaymentMethodEntity)
@FilterableRelation("price", () => PriceEntity, { nullable: true })
@ObjectType()
@Unique("UNQ_payment_intent_client_secret", ["clientSecret"])
@Index("INX_payment_intent_payment_method", ["paymentMethod"])
@Entity()
export class PaymentIntentEntity extends BaseEntity {
  @FilterableField()
  @Column()
  intentId!: string;

  @FilterableField()
  @Column()
  clientSecret!: string;

  @FilterableField(() => PaymentIntentStatus)
  @Column({
    type: "enum",
    enum: PaymentIntentStatus,
  })
  status!: PaymentIntentStatus;

  @FilterableField(() => ID)
  @Column()
  paymentMethodId!: Id;

  @ManyToOne(() => PaymentMethodEntity, {
    eager: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  paymentMethod!: PaymentMethodEntity;

  @FilterableField(() => ID, { nullable: true })
  @Column({ nullable: true })
  priceId!: Id;

  @OneToOne(() => PriceEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  price!: PriceEntity;
}
